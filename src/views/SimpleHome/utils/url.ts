export function normalizeUrl(url: string): string {
    if (/^https?:\/\//.test(url)) {
        return url
    }
    return `https://${url}`
}

export function openUrl(url: string): void {
    window.open(normalizeUrl(url), '_blank')
}
