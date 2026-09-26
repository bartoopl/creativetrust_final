"use client";

import { useEffect, useLayoutEffect, useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree, type ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createSpring, stepSpring, type Spring } from '@/lib/spring';
import type { SceneConfig } from '@/lib/scenes3d';

/** Max tilt towards the pointer (radians) — a hint of depth, not a spin. */
const TILT = THREE.MathUtils.degToRad(4);
/** Intros play ~1.6× faster than authored (≈2 s). */
const INTRO_SPEED = 1.6;

export interface SceneInput {
    /** 0–1 scroll progress through the scene, written by the parent without re-rendering. */
    progress: { current: number };
    /** Pointer position over the section in -1…1 (null when outside). */
    pointer: { current: { x: number; y: number } | null };
    /** Target hovered in the page (panel step / chip), mirrored onto the 3D piece. */
    pageHover: { current: string | null };
}

interface Props extends SceneInput {
    scene: SceneConfig;
    active: boolean;
    onTargetHover: (node: string | null) => void;
}

interface Rig {
    mixer: THREE.AnimationMixer;
    camera: THREE.OrthographicCamera;
    /** Vertical half-extent authored in Blender; the horizontal extent follows the canvas aspect. */
    ymag: number;
    /** Tilt pivot: centre of the model (without its ground shadow). */
    pivot: THREE.Vector3;
    /** Ground shadow baked in Blender; fades in as the intro lands. */
    shadow: THREE.MeshBasicMaterial | null;
    intro: THREE.AnimationAction | null;
    scroll: THREE.AnimationAction | null;
    idle: THREE.AnimationAction[];
    hover: Record<string, THREE.AnimationAction | null>;
}

type LoadedGltf = { scene: THREE.Group; animations: THREE.AnimationClip[]; cameras: THREE.Camera[] };

function createRig(gltf: LoadedGltf, config: SceneConfig): Rig {
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

    // Show the baked shadow as-is: unlit, blended, never occluding, never a hover target.
    let shadow: THREE.MeshBasicMaterial | null = null;
    const ground = gltf.scene.getObjectByName('ground_shadow') as THREE.Mesh | undefined;
    if (ground) {
        const baked = ground.material as THREE.MeshStandardMaterial;
        shadow = new THREE.MeshBasicMaterial({ map: baked.map, transparent: true, depthWrite: false, opacity: 0 });
        ground.material = shadow;
        ground.renderOrder = -1;
        ground.raycast = () => {};
    }

    const box = new THREE.Box3();
    gltf.scene.traverse((o) => {
        if ((o as THREE.Mesh).isMesh && o !== ground) box.expandByObject(o);
    });

    return {
        mixer,
        camera,
        ymag: camera.top,
        pivot: box.getCenter(new THREE.Vector3()),
        shadow,
        intro: clip(config.intro),
        scroll: clip(config.scroll),
        idle: config.idle.map(clip).filter((a): a is THREE.AnimationAction => a !== null),
        hover: Object.fromEntries(config.targets.map((t) => [t.node, clip(`hover_${t.node}`)])),
    };
}

function Model({ scene: config, progress, pointer, pageHover, onTargetHover }: Omit<Props, 'active'>) {
    const gltf = useLoader(GLTFLoader, config.model);
    const set = useThree((s) => s.set);
    const size = useThree((s) => s.size);
    const tiltGroup = useRef<THREE.Group>(null);
    const offsetGroup = useRef<THREE.Group>(null);

    // three.js objects are mutable by nature; they live in one ref ("rig") rather than in memoised
    // values, so updating them every frame doesn't fight React's immutability rules.
    const rig = useRef<Rig | null>(null);
    useLayoutEffect(() => {
        rig.current = createRig(gltf, config);
        // Pivot the tilt around the model's centre, not the world origin.
        tiltGroup.current?.position.copy(rig.current.pivot);
        offsetGroup.current?.position.copy(rig.current.pivot).negate();
    }, [gltf, config]);

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

    // Springs: scroll → scroll clip, hover → per-target lift, pointer → tilt (independent X/Y, per Apple).
    const springs = useRef({
        progress: createSpring(0),
        tiltX: createSpring(0),
        tiltY: createSpring(0),
        hover: {} as Record<string, Spring>,
    });
    const introDone = useRef(false);
    const sceneHover = useRef<string | null>(null);

    useEffect(() => {
        if (!rig.current) return;
        const { mixer, intro, scroll, idle, hover } = rig.current;
        introDone.current = false;
        // Scroll and hover clips are driven by setting their time; they animate different nodes
        // than the intro (see blender/lib/ct3d.py), so all of them can run from the start.
        for (const action of [scroll, ...Object.values(hover)]) {
            if (!action) continue;
            action.play();
            action.paused = true;
        }

        const finishIntro = () => {
            introDone.current = true;
            intro?.stop(); // rest pose == end of the intro
            idle.forEach((a) => a.play());
        };
        if (!intro) {
            finishIntro();
            return () => mixer.stopAllAction();
        }
        intro.setLoop(THREE.LoopOnce, 1);
        intro.clampWhenFinished = true;
        intro.timeScale = INTRO_SPEED;
        intro.play();
        const onFinished = (e: { action: THREE.AnimationAction }) => {
            if (e.action === intro) finishIntro();
        };
        mixer.addEventListener('finished', onFinished);
        return () => {
            mixer.removeEventListener('finished', onFinished);
            mixer.stopAllAction();
        };
    }, [gltf, config]);

    useFrame((_, dt) => {
        if (!rig.current) return;
        const s = springs.current;
        const { mixer, scroll, hover, intro, shadow } = rig.current;

        // Scroll drives its clip through a spring, so wheel steps don't stutter.
        s.progress.target = THREE.MathUtils.clamp(progress.current, 0, 1);
        stepSpring(s.progress, dt, 0.4, 1);
        if (scroll) scroll.time = s.progress.value * scroll.getClip().duration;

        // Hover: whichever of the 3D scene or the page points at a target lifts it.
        const hovered = sceneHover.current ?? pageHover.current;
        for (const [node, action] of Object.entries(hover)) {
            const spring = (s.hover[node] ??= createSpring(0));
            spring.target = hovered === node ? 1 : 0;
            stepSpring(spring, dt, 0.3, 1);
            if (action) action.time = THREE.MathUtils.clamp(spring.value, 0, 1) * action.getClip().duration;
        }

        // Tilt towards the pointer; eases home when it leaves.
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

        // The shadow settles in as the intro lands; earlier it would show footprints of pieces
        // still in the air.
        if (shadow) {
            const t = introDone.current || !intro ? 1 : intro.time / intro.getClip().duration;
            shadow.opacity = THREE.MathUtils.smoothstep(t, 0.72, 1);
        }
    });

    const targetOf = (object: THREE.Object3D | null): string | null => {
        for (let o = object; o; o = o.parent) {
            if (config.targets.some((t) => t.node === o.name)) return o.name;
        }
        return null;
    };
    const setSceneHover = (node: string | null) => {
        if (sceneHover.current === node) return;
        sceneHover.current = node;
        onTargetHover(node);
    };

    return (
        <group ref={tiltGroup}>
            <group ref={offsetGroup}>
                <primitive
                    object={gltf.scene}
                    onPointerMove={(e: ThreeEvent<PointerEvent>) => setSceneHover(targetOf(e.object))}
                    onPointerOut={() => setSceneHover(null)}
                />
            </group>
        </group>
    );
}

export default function Scene3DCanvas({ active, ...props }: Props) {
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
            <Model {...props} />
        </Canvas>
    );
}
