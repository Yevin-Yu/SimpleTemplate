import { defineStore } from 'pinia'
import { STORAGE_KEYS, safeGetItem, safeSetItem } from '@/shared'

export type Theme = 'default' | 'dark'

const THEMES: readonly Theme[] = ['default', 'dark'] as const

export function applyTheme(theme: Theme) {
    const html = document.documentElement
    THEMES.forEach(t => html.classList.remove(t))
    html.classList.add(theme)
}

function getSavedTheme(): Theme {
    const saved = safeGetItem(STORAGE_KEYS.THEME)
    if (saved && THEMES.includes(saved as Theme)) return saved as Theme
    return 'default'
}

export const useThemeStore = defineStore('theme', {
    state: () => ({
        currentTheme: getSavedTheme(),
        themes: THEMES,
    }),
    getters: {
        isDark: (state): boolean => state.currentTheme === 'dark',
    },
    actions: {
        setTheme(theme: Theme) {
            if (!THEMES.includes(theme)) {
                console.warn(`未知主题: ${theme}`)
                return
            }
            this.currentTheme = theme
            applyTheme(theme)
            safeSetItem(STORAGE_KEYS.THEME, theme)
        },
        toggleTheme() {
            const currentIndex = THEMES.indexOf(this.currentTheme)
            const nextIndex = (currentIndex + 1) % THEMES.length
            const nextTheme = THEMES[nextIndex]
            if (nextTheme) {
                this.setTheme(nextTheme)
            }
        },
    },
})
