import Scene3D from './Scene3D';
import { scenes, type SceneId } from '@/lib/scenes3d';
import type { Locale } from '@/lib/i18n';

/**
 * Desktop hero visual for service pages: the 3D scene plus a legend naming its pieces. The
 * legend chips mirror the scene — hovering a chip lifts its piece, hovering a piece highlights
 * its chip — and carry the meaning for everyone the decorative scene doesn't reach.
 */
export default function SceneWithLegend({ id, label, locale = 'pl' }: { id: SceneId; label: string; locale?: Locale }) {
    const scene = scenes[id];
    return (
        <div className="hidden flex-col gap-4 lg:flex">
            <Scene3D id={id} />
            <ul className="flex flex-wrap justify-center gap-2" aria-label={label} style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {scene.targets.map((t) => (
                    <li key={t.node} data-scene-target={t.node} className="ct-pill ct-scene-chip">
                        {locale === 'en' ? t.labelEn ?? t.label : t.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}
