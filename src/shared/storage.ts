/**
 * localStorage 的安全访问封装：
 * - SSR/无 window 环境下不报错（返回 undefined）
 * - 捕获异常（浏览器隐私模式/容量/禁用存储等）
 */

export function safeGetItem(key: string): string | undefined {
    try {
        if (typeof window === 'undefined') return undefined
        return window.localStorage.getItem(key) ?? undefined
    } catch (error) {
        console.error(`[storage] Failed to read key "${key}"`, error)
        return undefined
    }
}

export function safeSetItem(key: string, value: string): void {
    try {
        if (typeof window === 'undefined') return
        window.localStorage.setItem(key, value)
    } catch (error) {
        console.error(`[storage] Failed to write key "${key}"`, error)
    }
}
