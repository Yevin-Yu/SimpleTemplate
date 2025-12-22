import { safeGetItem, safeSetItem } from '@/shared/storage'
import { STORAGE_KEYS } from '@/shared/storageKeys'
import { toast, logger } from '@/shared'
import type { CategoryLink, SearchHistoryItem, CategoryKey } from '../types'

export interface ConfigData {
    categoryLinks: Record<CategoryKey, CategoryLink[]>
    searchHistory: SearchHistoryItem[]
    version: string
    exportTime: number
}

const CONFIG_VERSION = '1.0.0'

function safeJsonParse<T>(str: string | undefined, defaultValue: T): T {
    if (!str) return defaultValue
    try {
        return JSON.parse(str) as T
    } catch {
        return defaultValue
    }
}

export function useConfigImportExport() {
    function exportConfig(): void {
        try {
            const categoryLinksStr = safeGetItem(STORAGE_KEYS.CATEGORY_LINKS)
            const searchHistoryStr = safeGetItem(STORAGE_KEYS.SEARCH_HISTORY)

            const config: ConfigData = {
                categoryLinks: safeJsonParse(categoryLinksStr, {}),
                searchHistory: safeJsonParse(searchHistoryStr, []),
                version: CONFIG_VERSION,
                exportTime: Date.now(),
            }

            const jsonStr = JSON.stringify(config, null, 2)
            const blob = new Blob([jsonStr], { type: 'application/json' })
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `simple-home-config-${new Date().toISOString().split('T')[0]}.json`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(url)
        } catch (error) {
            logger.error('[ConfigExport] Failed to export config:', error)
            throw new Error('导出配置失败')
        }
    }

    function importConfig(file: File): Promise<void> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = (e) => {
                try {
                    const text = e.target?.result as string
                    const config: ConfigData = JSON.parse(text)

                    if (!config.version || !config.categoryLinks || !config.searchHistory) {
                        throw new Error('配置文件格式无效')
                    }

                    safeSetItem(STORAGE_KEYS.CATEGORY_LINKS, JSON.stringify(config.categoryLinks))
                    safeSetItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(config.searchHistory))

                    resolve()
                } catch (error) {
                    logger.error('[ConfigImport] Failed to import config:', error)
                    reject(new Error('导入配置失败：文件格式不正确'))
                }
            }

            reader.onerror = () => {
                reject(new Error('读取文件失败'))
            }

            reader.readAsText(file)
        })
    }

    function handleImportClick(): void {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = '.json'
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0]
            if (!file) {
                input.remove()
                return
            }

            try {
                await importConfig(file)
                toast.success('配置导入成功，页面即将刷新')
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            } catch (error) {
                toast.error(error instanceof Error ? error.message : '导入配置失败')
            } finally {
                input.remove()
            }
        }
        input.click()
    }

    return {
        exportConfig,
        importConfig,
        handleImportClick,
    }
}

