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

export function getDownloadUrl(viewUrl: string): string {
    // Converts https://drive.google.com/file/d/ID/view?usp=drivesdk
    // to https://drive.google.com/uc?export=download&id=ID
    const match = viewUrl.match(/\/d\/(.+?)\//);
    if (match && match[1]) {
        return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
    return viewUrl;
}
