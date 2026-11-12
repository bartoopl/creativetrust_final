/**
 * URL slug from a Polish or English title: "Łódź – sklep" → "lodz-sklep".
 * NFD strips most diacritics; "ł" has no decomposition, so it is mapped by hand.
 */
export function slugify(input: string, maxLength = 96): string {
    return input
        .replace(/ł/g, 'l')
        .replace(/Ł/g, 'L')
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, maxLength)
        .replace(/-+$/g, '');
}
