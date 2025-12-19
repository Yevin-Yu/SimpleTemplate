import { ref, computed } from 'vue'
import type { SearchHistoryItem, Bookmark } from '../types'

export function useSearch(history: SearchHistoryItem[], bookmarks: Bookmark[]) {
    const searchQuery = ref('')
    const showSuggestions = ref(false)

    const filteredHistory = computed(() => {
        if (!searchQuery.value) return []
        const query = searchQuery.value.toLowerCase()
        return history.filter(item => item.query.toLowerCase().includes(query))
    })

    const filteredBookmarks = computed(() => {
        if (!searchQuery.value) return []
        const query = searchQuery.value.toLowerCase()
        return bookmarks.filter(
            item => item.title.toLowerCase().includes(query) || item.url.toLowerCase().includes(query)
        )
    })

    function onSearchInput() {
        showSuggestions.value = searchQuery.value.length > 0
    }

    function clearSearch() {
        searchQuery.value = ''
        showSuggestions.value = false
    }

    function handleSearch(onHistoryAdd?: (item: SearchHistoryItem) => void) {
        const query = searchQuery.value.trim()
        if (!query) return

        const isUrl = /^https?:\/\//.test(query) || /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/.test(query)
        
        if (isUrl) {
            const finalUrl = /^https?:\/\//.test(query) ? query : `https://${query}`
            window.open(finalUrl, '_blank')
        }

        showSuggestions.value = false
    }

    function selectSuggestion(query: string, onHistoryAdd?: (item: SearchHistoryItem) => void) {
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
    }
}
