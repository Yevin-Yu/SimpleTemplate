import { ref } from 'vue'
import type { SearchHistoryItem } from '../types'

const STORAGE_KEY = 'simple-home-search-history'
const MAX_HISTORY = 20

export function useSearchHistory() {
    const searchHistory = ref<SearchHistoryItem[]>(loadHistory())

    function loadHistory(): SearchHistoryItem[] {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (stored) {
                return JSON.parse(stored)
            }
        } catch (error) {
            console.error('Failed to load search history:', error)
        }
        // 默认历史记录
        return [
            { id: '1', query: 'Vue 3 教程', timestamp: Date.now() - 3600000 },
            { id: '2', query: 'TypeScript 类型', timestamp: Date.now() - 7200000 },
            { id: '3', query: 'CSS 动画', timestamp: Date.now() - 86400000 },
        ]
    }

    function saveHistory() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(searchHistory.value))
        } catch (error) {
            console.error('Failed to save search history:', error)
        }
    }

    function addHistory(query: string) {
        // 去除重复：移除已存在的相同查询
        searchHistory.value = searchHistory.value.filter(item => item.query.toLowerCase() !== query.toLowerCase())

        const newHistoryItem: SearchHistoryItem = {
            id: Date.now().toString(),
            query,
            timestamp: Date.now(),
        }
        searchHistory.value.unshift(newHistoryItem)

        // 限制历史记录数量
        if (searchHistory.value.length > MAX_HISTORY) {
            searchHistory.value = searchHistory.value.slice(0, MAX_HISTORY)
        }

        saveHistory()
    }

    return {
        searchHistory,
        addHistory,
    }
}
