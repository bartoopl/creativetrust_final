# 3D scenes

Isometric scenes shown beside page headlines, built in Blender entirely from code.

| Scene | Page | Scroll does | Hover targets |
| --- | --- | --- | --- |
| `hero-pipeline` | `/` | token travels 01 → 05 | the five delivery steps (mirrored with the hero panel) |
| `ecommerce-layers` | `/uslugi/e-commerce` | the stack comes apart, channels slide out of the API | storefront, API, commerce, web, app, marketplace |
| `automation-flow` | `/uslugi/marketing-automation` | a data packet travels the flow | the six automations (mirrored with the legend) |

- `lib/ct3d.py` is the shared toolkit and the contract with the site: palette, geometry,
  the `root → _slide → _lift` hierarchy, clips, baked ground shadow, camera, export.
- `<scene>/build.py` builds one scene and is its source of truth. `<scene>/<scene>.blend` is
  the last build's output: open it to look around, but carry any change back into `build.py`.
- The site reads `public/models/<scene>.glb` and `<scene>-poster.webp`, configured in
  `src/lib/scenes3d.ts` and rendered by `src/components/scene3d/Scene3D.tsx`.

## Rebuild

```bash
npm run model:all            # or model:hero / model:ecommerce / model:automation
npm test                     # scripts/scene-models.test.mjs checks every model's contract
```

Needs Blender 5.2+ (`BLENDER=/path/to/blender` to override the macOS default) and `cwebp`.

## Contract

- Hover targets are plates (`ct3d.framed_plate`): `<node>` (intro) → `<node>_slide` (scroll) →
  `<node>_lift` (hover), plus `<node>_accent`. Hover clips move only `_lift`/`_accent`, so all
  clips can run at once; the test enforces it.
- Clips: `assemble` (intro, played once), one `scroll_*` clip (time follows scroll through a
  spring), `hover_<node>`, optional `idle_*` loops (start after the intro).
- Rest pose = assembled, un-scrolled. Camera: orthographic isometric, 6:5 frame.
- Colours only from `PALETTE` (the site's design tokens); the test fails on anything else.
- Budget: < 400 KB gzipped per model (currently 116–165 KB).

`lib/fonts/JetBrainsMono-Medium.ttf` (SIL OFL 1.1, see `lib/fonts/OFL.txt`) is used for labels.
