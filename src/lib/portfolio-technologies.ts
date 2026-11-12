/**
 * Technology filter options for the portfolio grid: only technologies at least
 * one listed project uses, most used first. Pure, import-free.
 */
export interface TechnologyRef {
    _id: string;
    title: string;
    slug: { current: string };
}

export function technologyFilters(projects: Array<{ technologies?: TechnologyRef[] | null }>): { id: string; title: string; slug: string }[] {
    const counts = new Map<string, { technology: TechnologyRef; count: number }>();
    for (const project of projects) {
        for (const technology of project.technologies ?? []) {
            const entry = counts.get(technology.slug.current) ?? { technology, count: 0 };
            entry.count += 1;
            counts.set(technology.slug.current, entry);
        }
    }
    return [...counts.values()]
        .sort((a, b) => b.count - a.count || a.technology.title.localeCompare(b.technology.title, 'pl'))
        .map(({ technology }) => ({ id: technology._id, title: technology.title, slug: technology.slug.current }));
}
