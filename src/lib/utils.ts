export function normalizeText(text: string): string {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

export function fuzzySearch(query: string, items: any[], keys: string[]) {
    const normalizedQuery = normalizeText(query);
    if (!normalizedQuery) return items;

    return items.filter((item) => {
        return keys.some((key) => {
            const value = item[key];
            if (!value) return false;
            return normalizeText(String(value)).includes(normalizedQuery);
        });
    });
}
