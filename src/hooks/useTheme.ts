import { ref, onMounted } from 'vue'

export type Theme = 'default' | 'red'

const THEME_STORAGE_KEY = 'app-theme'

const themes: Theme[] = ['default', 'red']

/**
 * 获取主题对应的 CSS 类名
 */
function getThemeClass(theme: Theme): string {
    return `theme-${theme}`
}

/**
 * 应用主题到文档根元素
 */
function applyTheme(theme: Theme) {
    const html = document.documentElement
    // 移除所有主题类
    themes.forEach(t => html.classList.remove(getThemeClass(t)))
    // 添加当前主题类
    html.classList.add(getThemeClass(theme))
    // 保存到 localStorage
    localStorage.setItem(THEME_STORAGE_KEY, theme)
}

/**
 * 从 localStorage 读取保存的主题，如果没有则返回默认主题
 */
function getSavedTheme(): Theme {
    const saved = localStorage.getItem(THEME_STORAGE_KEY)
    return (saved as Theme) || 'default'
}

/**
 * 主题组合式函数
 */
export function useTheme() {
    const currentTheme = ref<Theme>(getSavedTheme())

    const setTheme = (theme: Theme) => {
        if (!themes.includes(theme)) {
            console.warn(`未知主题: ${theme}`)
            return
        }
        applyTheme(theme)
        currentTheme.value = theme
    }

    const toggleTheme = () => {
        const nextIndex = (themes.indexOf(currentTheme.value) + 1) % themes.length
        const nextTheme = themes[nextIndex]
        if (nextTheme) {
            setTheme(nextTheme)
        }
    }

    // 初始化时应用保存的主题
    onMounted(() => {
        applyTheme(currentTheme.value)
    })

    return {
        currentTheme,
        themes,
        setTheme,
        toggleTheme,
    }
}
