import { ref, computed, unref, type MaybeRef } from 'vue'
import type { SearchHistoryItem, Bookmark, SearchSuggestion } from '../types'

export function useSearch(history: MaybeRef<SearchHistoryItem[]>, bookmarks: MaybeRef<Bookmark[]>) {
    const searchQuery = ref('')
    const showSuggestions = ref(false)

    function calculateScore(text: string, query: string): number {
        const lowerText = text.toLowerCase()
        const lowerQuery = query.toLowerCase()

        if (lowerText === lowerQuery) return 100
        if (lowerText.startsWith(lowerQuery)) return 80
        if (lowerText.includes(lowerQuery)) return 60
        return 0
    }

    const suggestions = computed<SearchSuggestion[]>(() => {
        const query = searchQuery.value.trim()
        if (!query) return []

        const lowerQuery = query.toLowerCase()
        const results: SearchSuggestion[] = []
        const currentHistory = unref(history)
        const currentBookmarks = unref(bookmarks)

        currentHistory.forEach((item) => {
            const lowerQueryText = item.query.toLowerCase()
            if (lowerQueryText.includes(lowerQuery)) {
                results.push({
                    id: item.id,
                    type: 'history',
                    title: item.query,
                    query: item.query,
                    score: calculateScore(item.query, query),
                })
            }
        })

        currentBookmarks.forEach((item) => {
            const lowerTitle = item.title.toLowerCase()
            const lowerUrl = item.url.toLowerCase()
            const titleMatch = lowerTitle.includes(lowerQuery)
            const urlMatch = lowerUrl.includes(lowerQuery)

            if (titleMatch || urlMatch) {
                const titleScore = titleMatch ? calculateScore(item.title, query) : 0
                const urlScore = urlMatch ? calculateScore(item.url, query) : 0
                const score = Math.max(titleScore, urlScore) + (titleMatch ? 5 : 0)

                results.push({
                    id: item.id,
                    type: 'bookmark',
                    title: item.title,
                    url: item.url,
                    score,
                })
            }
        })

        return results.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score
            return a.type === 'history' ? -1 : 1
        })
    })

    function updateSuggestionsVisibility() {
        showSuggestions.value = searchQuery.value.trim().length > 0
    }

    function clearSearch() {
        searchQuery.value = ''
        showSuggestions.value = false
    }

    return {
        searchQuery,
        showSuggestions,
        suggestions,
        updateSuggestionsVisibility,
        clearSearch,
    }
}
