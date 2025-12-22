/**
 * 统一的日志工具
 * 生产环境自动禁用 console.log，但保留 console.error 和 console.warn
 */
export const logger = {
    log: (...args: unknown[]) => {
        if (import.meta.env.DEV) {
            console.log(...args)
        }
    },
    error: (...args: unknown[]) => {
        console.error(...args)
    },
    warn: (...args: unknown[]) => {
        console.warn(...args)
    },
    info: (...args: unknown[]) => {
        if (import.meta.env.DEV) {
            console.info(...args)
        }
    },
}

