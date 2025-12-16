import { ref } from 'vue'
import type { QuickAccessSite } from '../types'

const STORAGE_KEY = 'simple-home-quick-access'

export function useQuickAccess() {
    const quickAccessSites = ref<QuickAccessSite[]>(loadSites())

    function loadSites(): QuickAccessSite[] {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (stored) {
                return JSON.parse(stored)
            }
        } catch (error) {
            console.error('Failed to load quick access sites:', error)
        }
        // 默认快捷方式
        return [
            { id: '1', title: 'GitHub', url: 'https://github.com', icon: 'G', color: '#24292e' },
            { id: '2', title: 'Google', url: 'https://www.google.com', icon: 'G', color: '#4285f4' },
            { id: '3', title: 'YouTube', url: 'https://www.youtube.com', icon: 'Y', color: '#ff0000' },
            { id: '4', title: 'Twitter', url: 'https://twitter.com', icon: 'T', color: '#1da1f2' },
            { id: '5', title: 'Vue.js', url: 'https://vuejs.org', icon: 'V', color: '#4fc08d' },
            { id: '6', title: 'MDN', url: 'https://developer.mozilla.org', icon: 'M', color: '#000000' },
        ]
    }

    function saveSites() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(quickAccessSites.value))
        } catch (error) {
            console.error('Failed to save quick access sites:', error)
        }
    }

    function reorder(fromIndex: number, toIndex: number) {
        const sites = quickAccessSites.value
        const [removed] = sites.splice(fromIndex, 1)
        sites.splice(toIndex, 0, removed)
        saveSites()
    }

    return {
        quickAccessSites,
        reorder,
    }
}
