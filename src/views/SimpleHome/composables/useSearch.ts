import { ref, computed } from 'vue'
import type { SearchHistoryItem, Bookmark } from '../types'

export function useSearch(history: SearchHistoryItem[], bookmarks: Bookmark[]) {
    const searchQuery = ref('')
    const showSuggestions = ref(false)

    const filteredHistory = computed(() => {
        if (!searchQuery.value) return []
        return history.filter(item =>
            item.query.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
    })

    const filteredBookmarks = computed(() => {
        if (!searchQuery.value) return []
        return bookmarks.filter(item =>
            item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            item.url.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
    })

    const onSearchInput = () => {
        showSuggestions.value = searchQuery.value.length > 0
    }

    const clearSearch = () => {
        searchQuery.value = ''
        showSuggestions.value = false
    }

    const isUrl = (str: string): boolean => {
        try {
            new URL(str)
            return true
        } catch {
            return /^https?:\/\//.test(str) || /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/.test(str)
        }
    }

    const openUrl = (url: string) => {
        let finalUrl = url
        if (!/^https?:\/\//.test(url)) {
            finalUrl = `https://${url}`
        }
        window.open(finalUrl, '_blank')
    }

    const performSearch = (query: string, onHistoryAdd?: (item: SearchHistoryItem) => void) => {
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`
        window.open(searchUrl, '_blank')
        
        if (onHistoryAdd) {
            const newHistoryItem: SearchHistoryItem = {
                id: Date.now().toString(),
                query,
                timestamp: Date.now(),
            }
            onHistoryAdd(newHistoryItem)
        }
    }

    const handleSearch = (onHistoryAdd?: (item: SearchHistoryItem) => void) => {
        if (!searchQuery.value.trim()) return

        const query = searchQuery.value.trim()
        
        if (isUrl(query)) {
            openUrl(query)
        } else {
            performSearch(query, onHistoryAdd)
        }
        
        showSuggestions.value = false
    }

    const selectSuggestion = (query: string, onHistoryAdd?: (item: SearchHistoryItem) => void) => {
        searchQuery.value = query
        showSuggestions.value = false
        handleSearch(onHistoryAdd)
    }

    return {
        searchQuery,
        showSuggestions,
        filteredHistory,
        filteredBookmarks,
        onSearchInput,
        clearSearch,
        handleSearch,
        selectSuggestion,
        openUrl,
    }
}

