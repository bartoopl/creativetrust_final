# Hero pipeline (3D)

Isometric scene beside the homepage headline: five modules for the five delivery steps in the
hero panel, on a rail with a violet progress token.

- `build.py` builds the whole scene from code (geometry, materials, animation clips, baked
  ground shadow, camera) and is the source of truth.
- `hero-pipeline.blend` is the result of the last build. Open it to look around or tweak, but
  anything not carried back into `build.py` is lost on the next build.
- The site reads `public/models/hero-pipeline.glb`; `public/models/hero-pipeline-poster.webp`
  is the static fallback (reduced motion, data saver, no WebGL).

## Rebuild

```bash
npm run model:hero   # Blender 5.2+ at /Applications/Blender.app, cwebp on PATH
npm test             # scripts/hero-model.test.mjs checks the model contract
```

## Contract with the site (`src/components/hero/HeroPipelineScene.tsx`)

| In the GLB | Used for |
| --- | --- |
| `module_goal`, `module_research`, `module_prototype`, `module_deploy`, `module_optimize` | hover targets; mirrored with `data-pipeline-step` in the hero panel |
| `<module>_accent` | violet frame raised by the hover clip |
| `ground_shadow` | baked shadow, shown unlit, fades in at the end of the intro |
| `hero_camera` | the site's camera (orthographic, 6:5 frame) |
| clip `assemble` | intro, played once on load |
| clip `scroll_progress` | token 01 → 05, time driven by scroll through a spring |
| clips `hover_<module>` | time driven by a critically damped spring on hover |
| clip `idle_token` | subtle loop after the intro |

The rest pose (no clip playing) is the assembled scene. Keep names, clip names and the 6:5
render resolution when changing the scene. Colours come from the site's design tokens (see
`PALETTE` in `build.py`), and the test fails on colours outside them.

`fonts/JetBrainsMono-Medium.ttf` (SIL OFL 1.1, see `fonts/OFL.txt`) is used for the step numbers.
