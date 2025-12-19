import { ref } from 'vue'
import type { Bookmark } from '../types'

const STORAGE_KEY = 'simple-home-bookmarks'

export function useBookmarks() {
    const bookmarks = ref<Bookmark[]>(loadBookmarks())

    function loadBookmarks(): Bookmark[] {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (stored) {
                return JSON.parse(stored)
            }
        } catch (error) {
            console.error('Failed to load bookmarks:', error)
        }
        // 默认书签
        return [
            { id: '1', title: 'Vue 3 文档', url: 'https://cn.vuejs.org' },
            { id: '2', title: 'TypeScript 文档', url: 'https://www.typescriptlang.org' },
            { id: '3', title: 'Tailwind CSS', url: 'https://tailwindcss.com' },
        ]
    }

    function saveBookmarks() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks.value))
        } catch (error) {
            console.error('Failed to save bookmarks:', error)
        }
    }

    return {
        bookmarks,
    }
}
