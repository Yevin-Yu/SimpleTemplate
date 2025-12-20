import { ref } from 'vue'
import { safeGetItem, safeSetItem } from '@/shared/storage'
import { STORAGE_KEYS } from '@/shared/storageKeys'
import { MAX_SEARCH_HISTORY } from '../constants'
import type { SearchHistoryItem } from '../types'

export function useSearchHistory() {
    const searchHistory = ref<SearchHistoryItem[]>(loadHistory())

    function loadHistory(): SearchHistoryItem[] {
        const stored = safeGetItem(STORAGE_KEYS.SEARCH_HISTORY)
        if (!stored) return []

        try {
            return JSON.parse(stored)
        } catch {
            return []
        }
    }

    function saveHistory() {
        safeSetItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(searchHistory.value))
    }

    function addHistory(query: string) {
        const trimmedQuery = query.trim()
        if (!trimmedQuery) return

        const lowerQuery = trimmedQuery.toLowerCase()
        const filtered = searchHistory.value.filter(item => item.query.toLowerCase() !== lowerQuery).slice(0, MAX_SEARCH_HISTORY - 1)

        searchHistory.value = [
            {
                id: Date.now().toString(),
                query: trimmedQuery,
                timestamp: Date.now(),
            },
            ...filtered,
        ]

        saveHistory()
    }

    return {
        searchHistory,
        addHistory,
    }
}
