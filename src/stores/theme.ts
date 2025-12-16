import { defineStore } from 'pinia'

export type Theme = 'default' | 'dark'

const THEME_STORAGE_KEY = 'simple-app-theme'

const themes: Theme[] = ['default', 'dark']

/**
 * 获取主题对应的 CSS 类名
 */
function getThemeClass(theme: Theme): string {
    return `${theme}`
}

/**
 * 应用主题到文档根元素
 */
export function applyTheme(theme: Theme) {
    const html = document.documentElement
    // 移除所有主题类
    themes.forEach(t => html.classList.remove(getThemeClass(t)))
    // 添加当前主题类
    html.classList.add(getThemeClass(theme))
}

/**
 * 从 localStorage 读取保存的主题，如果没有则返回默认主题
 */
function getSavedTheme(): Theme {
    try {
        const saved = localStorage.getItem(THEME_STORAGE_KEY)
        if (saved && themes.includes(saved as Theme)) {
            return saved as Theme
        }
    } catch (error) {
        console.error('Failed to load saved theme:', error)
    }
    return 'default'
}

export const useThemeStore = defineStore('theme', {
    state: () => {
        const savedTheme = getSavedTheme()

        return {
            currentTheme: savedTheme as Theme,
            themes: themes as readonly Theme[],
        }
    },
    getters: {
        /**
         * 是否为暗色主题
         */
        isDark: (state): boolean => {
            return state.currentTheme === 'dark'
        },
    },
    actions: {
        /**
         * 设置主题
         */
        setTheme(theme: Theme) {
            if (!themes.includes(theme)) {
                console.warn(`未知主题: ${theme}`)
                return
            }
            this.currentTheme = theme
            applyTheme(theme)
            // 保存到 localStorage
            try {
                localStorage.setItem(THEME_STORAGE_KEY, theme)
            } catch (error) {
                console.error('Failed to save theme:', error)
            }
        },
        /**
         * 切换主题
         */
        toggleTheme() {
            const currentIndex = themes.indexOf(this.currentTheme)
            const nextIndex = (currentIndex + 1) % themes.length
            const nextTheme = themes[nextIndex]
            if (nextTheme) {
                this.setTheme(nextTheme)
            }
        },
    },
})

