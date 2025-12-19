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

export interface CategoryLink {
    id: string
    title: string
    url: string
    icon: string
    color: string
}

export interface SearchEngine {
    id: string
    name: string
    url: string
    icon: any
}

export interface Shortcut {
    key: string
    label: string
}
