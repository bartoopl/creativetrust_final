/**
 * The site's 3D scenes (built in blender/<id>/build.py, see blender/lib/ct3d.py) and how the
 * page drives them. Plain data with no imports: used by the Scene3D component and by the model
 * contract tests (scripts/scene-models.test.mjs).
 */

export interface SceneTarget {
    /** Root node name in the GLB; its hover clip is `hover_<node>`. */
    node: string;
    /** Label shown next to the scene (panel step or chip) that mirrors the hover. */
    label: string;
}

export interface SceneConfig {
    id: string;
    model: string;
    poster: string;
    /** Clip played once on load. */
    intro: string;
    /** Clip whose time follows scroll progress through the scene. */
    scroll: string;
    /** Loops that start once the intro has finished. */
    idle: string[];
    targets: SceneTarget[];
}

export const scenes = {
    'hero-pipeline': {
        id: 'hero-pipeline',
        model: '/models/hero-pipeline.glb',
        poster: '/models/hero-pipeline-poster.webp',
        intro: 'assemble',
        scroll: 'scroll_progress',
        idle: ['idle_token'],
        targets: [
            { node: 'module_goal', label: 'Cel biznesowy' },
            { node: 'module_research', label: 'Research z AI' },
            { node: 'module_prototype', label: 'Prototyp' },
            { node: 'module_deploy', label: 'Wdrożenie' },
            { node: 'module_optimize', label: 'Optymalizacja' },
        ],
    },
    'ecommerce-layers': {
        id: 'ecommerce-layers',
        model: '/models/ecommerce-layers.glb',
        poster: '/models/ecommerce-layers-poster.webp',
        intro: 'assemble',
        scroll: 'scroll_explode',
        idle: [],
        targets: [
            { node: 'layer_storefront', label: 'Storefront' },
            { node: 'layer_api', label: 'API' },
            { node: 'layer_commerce', label: 'Commerce core' },
            { node: 'channel_web', label: 'Web' },
            { node: 'channel_app', label: 'Aplikacja' },
            { node: 'channel_marketplace', label: 'Marketplace' },
        ],
    },
    'automation-flow': {
        id: 'automation-flow',
        model: '/models/automation-flow.glb',
        poster: '/models/automation-flow-poster.webp',
        intro: 'assemble',
        scroll: 'scroll_flow',
        idle: ['idle_packet'],
        targets: [
            { node: 'node_trigger', label: 'behavioral triggers' },
            { node: 'node_score', label: 'lead scoring' },
            { node: 'node_email', label: 'email nurturing' },
            { node: 'node_content', label: 'AI content' },
            { node: 'node_personalize', label: 'real-time personalization' },
            { node: 'node_crm', label: 'CRM sync' },
        ],
    },
} satisfies Record<string, SceneConfig>;

export type SceneId = keyof typeof scenes;
