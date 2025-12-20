export function normalizeUrl(url: string): string {
    if (/^https?:\/\//.test(url)) {
        return url
    }
    return `https://${url}`
}

export function isUrl(query: string): boolean {
    return /^https?:\/\//.test(query) || /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/.test(query)
}

export function openUrl(url: string): void {
    window.open(normalizeUrl(url), '_blank')
}
