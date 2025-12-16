export interface QuickAccessSite {
    id: string
    title: string
    url: string
    icon: string
    color: string
}

export interface Bookmark {
    id: string
    title: string
    url: string
}

export interface SearchHistoryItem {
    id: string
    query: string
    timestamp: number
}
