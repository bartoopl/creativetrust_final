"use client";

import { useEffect, useLayoutEffect, useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree, type ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createSpring, stepSpring, type Spring } from '@/lib/spring';

export const MODEL_URL = '/models/hero-pipeline.glb';
export const MODULES = ['module_goal', 'module_research', 'module_prototype', 'module_deploy', 'module_optimize'] as const;
export type ModuleName = (typeof MODULES)[number];

/** Max tilt towards the pointer (radians) — a hint of depth, not a spin. */
const TILT = THREE.MathUtils.degToRad(4);
/** The intro plays in ~2 s rather than the clip's 3.2 s authored length. */
const INTRO_SPEED = 1.6;

export interface SceneInput {
    /** 0–1 scroll progress through the hero, written by the parent without re-rendering. */
    progress: { current: number };
    /** Pointer position over the hero in -1…1 (null when outside). */
    pointer: { current: { x: number; y: number } | null };
    /** Module hovered in the step panel (DOM), mirrored onto the 3D module. */
    panelHover: { current: ModuleName | null };
}

interface Props extends SceneInput {
    active: boolean;
    onModuleHover: (module: ModuleName | null) => void;
}

interface Rig {
    mixer: THREE.AnimationMixer;
    camera: THREE.OrthographicCamera;
    /** Vertical half-extent authored in Blender; the horizontal extent follows the canvas aspect. */
    ymag: number;
    /** Ground shadow baked in Blender; fades in as the modules land. */
    shadow: THREE.MeshBasicMaterial | null;
    actions: {
        assemble: THREE.AnimationAction | null;
        scroll: THREE.AnimationAction | null;
        idle: THREE.AnimationAction | null;
        hover: Record<ModuleName, THREE.AnimationAction | null>;
    };
}

function createRig(gltf: { scene: THREE.Group; animations: THREE.AnimationClip[]; cameras: THREE.Camera[] }): Rig {
    const mixer = new THREE.AnimationMixer(gltf.scene);
    const clip = (name: string) => {
        const found = gltf.animations.find((c) => c.name === name);
        return found ? mixer.clipAction(found) : null;
    };
    // Detach the authored camera from the model, keeping its world placement: otherwise the tilt
    // group would rotate the camera along with the scene and the tilt would be invisible.
    const camera = gltf.cameras[0] as THREE.OrthographicCamera & { manual?: boolean };
    gltf.scene.updateMatrixWorld(true);
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    camera.matrixWorld.decompose(position, quaternion, new THREE.Vector3());
    camera.removeFromParent();
    camera.position.copy(position);
    camera.quaternion.copy(quaternion);
    camera.manual = true; // R3F must not reset the frustum to pixel units on resize

    // Show the baked shadow as-is: unlit, blended, never occluding.
    let shadow: THREE.MeshBasicMaterial | null = null;
    const ground = gltf.scene.getObjectByName('ground_shadow') as THREE.Mesh | undefined;
    if (ground) {
        const baked = ground.material as THREE.MeshStandardMaterial;
        shadow = new THREE.MeshBasicMaterial({ map: baked.map, transparent: true, depthWrite: false, opacity: 0 });
        ground.material = shadow;
        ground.renderOrder = -1;
        ground.raycast = () => {}; // not a hover target
    }
    return {
        mixer,
        camera,
        ymag: camera.top,
        shadow,
        actions: {
            assemble: clip('assemble'),
            scroll: clip('scroll_progress'),
            idle: clip('idle_token'),
            hover: Object.fromEntries(MODULES.map((m) => [m, clip(`hover_${m}`)])) as Record<ModuleName, THREE.AnimationAction | null>,
        },
    };
}

function Pipeline({ progress, pointer, panelHover, onModuleHover }: Omit<Props, 'active'>) {
    const gltf = useLoader(GLTFLoader, MODEL_URL);
    const set = useThree((s) => s.set);
    const size = useThree((s) => s.size);
    const tiltGroup = useRef<THREE.Group>(null);

    // three.js objects are mutable by nature; they live in one ref ("rig") rather than in memoised
    // values, so updating them every frame doesn't fight React's immutability rules.
    const rig = useRef<Rig | null>(null);
    useLayoutEffect(() => {
        rig.current = createRig(gltf);
    }, [gltf]);

    // Frame the scene with the camera authored in Blender, keeping its vertical extent on resize.
    useLayoutEffect(() => {
        if (!rig.current) return;
        const { camera, ymag } = rig.current;
        const aspect = size.width / Math.max(1, size.height);
        camera.left = -ymag * aspect;
        camera.right = ymag * aspect;
        camera.top = ymag;
        camera.bottom = -ymag;
        camera.updateProjectionMatrix();
        set({ camera });
    }, [gltf, size.width, size.height, set]);

    // Springs: scroll → token, hover → per-module lift, pointer → tilt (independent X/Y, per Apple).
    const springs = useRef({
        progress: createSpring(0),
        tiltX: createSpring(0),
        tiltY: createSpring(0),
        hover: Object.fromEntries(MODULES.map((m) => [m, createSpring(0)])) as Record<ModuleName, Spring>,
    });
    const introDone = useRef(false);
    const sceneHover = useRef<ModuleName | null>(null);

    useEffect(() => {
        if (!rig.current) return;
        const { mixer, actions } = rig.current;
        const { assemble, scroll, idle, hover } = actions;
        introDone.current = false;
        if (scroll) {
            scroll.play();
            scroll.paused = true;
        }

        const finishIntro = () => {
            introDone.current = true;
            assemble?.stop(); // rest pose == assembled pose
            idle?.play();
            // Hover clips join only now: blended with the intro they would halve its motion.
            for (const action of Object.values(hover)) {
                if (!action) continue;
                action.play();
                action.paused = true;
            }
        };

        if (!assemble) {
            finishIntro();
            return () => mixer.stopAllAction();
        }
        assemble.setLoop(THREE.LoopOnce, 1);
        assemble.clampWhenFinished = true;
        assemble.timeScale = INTRO_SPEED;
        assemble.play();
        const onFinished = (e: { action: THREE.AnimationAction }) => {
            if (e.action === assemble) finishIntro();
        };
        mixer.addEventListener('finished', onFinished);
        return () => {
            mixer.removeEventListener('finished', onFinished);
            mixer.stopAllAction();
        };
    }, [gltf]);

    useFrame((_, dt) => {
        if (!rig.current) return;
        const s = springs.current;
        const { mixer, actions } = rig.current;

        // Scroll drives the token along the rail, smoothed so wheel steps don't stutter.
        s.progress.target = THREE.MathUtils.clamp(progress.current, 0, 1);
        stepSpring(s.progress, dt, 0.4, 1);
        if (actions.scroll) actions.scroll.time = s.progress.value * actions.scroll.getClip().duration;

        // Hover: whichever of the 3D scene or the step panel points at a module lifts it.
        if (introDone.current) {
            const hovered = sceneHover.current ?? panelHover.current;
            for (const m of MODULES) {
                const spring = s.hover[m];
                spring.target = hovered === m ? 1 : 0;
                stepSpring(spring, dt, 0.3, 1);
                const action = actions.hover[m];
                if (action) action.time = THREE.MathUtils.clamp(spring.value, 0, 1) * action.getClip().duration;
            }
        }

        // Tilt towards the pointer; eases home when it leaves the hero.
        const p = pointer.current;
        s.tiltX.target = p ? -p.y * TILT : 0;
        s.tiltY.target = p ? p.x * TILT : 0;
        stepSpring(s.tiltX, dt, 0.6, 1);
        stepSpring(s.tiltY, dt, 0.6, 1);
        if (tiltGroup.current) {
            tiltGroup.current.rotation.x = s.tiltX.value;
            tiltGroup.current.rotation.y = s.tiltY.value;
        }

        mixer.update(dt);

        // The shadow settles in as the last modules land; earlier it would show footprints of
        // modules still in the air.
        if (rig.current.shadow) {
            const intro = actions.assemble;
            const t = introDone.current || !intro ? 1 : intro.time / intro.getClip().duration;
            rig.current.shadow.opacity = THREE.MathUtils.smoothstep(t, 0.72, 1);
        }
    });

    const moduleOf = (object: THREE.Object3D | null): ModuleName | null => {
        for (let o = object; o; o = o.parent) {
            if ((MODULES as readonly string[]).includes(o.name)) return o.name as ModuleName;
        }
        return null;
    };
    const setSceneHover = (module: ModuleName | null) => {
        if (sceneHover.current === module) return;
        sceneHover.current = module;
        onModuleHover(module);
    };

    // Pivot the tilt around the scene's centre (Blender camera target), not the world origin.
    const pivot: [number, number, number] = [0, 0.05, 0.08];
    return (
        <group ref={tiltGroup} position={pivot}>
            <group position={[-pivot[0], -pivot[1], -pivot[2]]}>
                <primitive
                    object={gltf.scene}
                    onPointerMove={(e: ThreeEvent<PointerEvent>) => setSceneHover(moduleOf(e.object))}
                    onPointerOut={() => setSceneHover(null)}
                />
            </group>
        </group>
    );
}

export default function HeroPipelineScene({ active, ...props }: Props) {
    return (
        <Canvas
            orthographic
            flat
            dpr={[1, 1.5]}
            frameloop={active ? 'always' : 'never'}
            gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
            style={{ position: 'absolute', inset: 0 }}
        >
            <hemisphereLight args={['#ffffff', '#d9dce1', 1.15]} />
            {/* Key and fill match the Blender lights (Z-up → Y-up), so the canvas agrees with the poster. */}
            <directionalLight position={[-1.2, 3.6, 0.8]} intensity={2.3} />
            <directionalLight position={[2.8, 1.6, 2.6]} intensity={0.45} />
            <Pipeline {...props} />
        </Canvas>
    );
}

useLoader.preload(GLTFLoader, MODEL_URL);
