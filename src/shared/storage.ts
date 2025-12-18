/**
 * localStorage 安全访问封装
 * 处理 SSR 环境和浏览器存储异常（隐私模式/容量限制等）
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

export function safeRemoveItem(key: string): void {
    try {
        if (typeof window === 'undefined') return
        window.localStorage.removeItem(key)
    } catch (error) {
        console.error(`[storage] Failed to remove key "${key}"`, error)
    }
}
