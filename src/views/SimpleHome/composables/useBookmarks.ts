import { ref, computed } from 'vue'
import { safeGetItem, safeSetItem } from '@/shared/storage'
import { STORAGE_KEYS } from '@/shared/storageKeys'
import { CATEGORY_LINKS as DEFAULT_CATEGORY_LINKS } from '../constants'
import type { Bookmark, CategoryLink, CategoryKey } from '../types'

/**
 * 类型守卫：检查对象是否为有效的 CategoryLink
 */
function isValidCategoryLink(item: unknown): item is CategoryLink {
    if (typeof item !== 'object' || item === null) {
        return false
    }

    const requiredFields: (keyof CategoryLink)[] = ['id', 'title', 'url', 'icon', 'color']
    return requiredFields.every(field => field in item)
}

function loadCategoryLinks(): Record<CategoryKey, CategoryLink[]> {
    const stored = safeGetItem(STORAGE_KEYS.CATEGORY_LINKS)
    if (!stored) {
        return { ...DEFAULT_CATEGORY_LINKS }
    }

    try {
        const parsed = JSON.parse(stored)
        const result: Record<CategoryKey, CategoryLink[]> = { ...DEFAULT_CATEGORY_LINKS }

        ;(Object.keys(DEFAULT_CATEGORY_LINKS) as CategoryKey[]).forEach(key => {
            const storedLinks = parsed[key]
            if (Array.isArray(storedLinks)) {
                result[key] = storedLinks.filter(isValidCategoryLink)
            }
        })

        return result
    } catch {
        return { ...DEFAULT_CATEGORY_LINKS }
    }
}

export function useBookmarks() {
    const categoryLinks = ref<Record<CategoryKey, CategoryLink[]>>(loadCategoryLinks())

    function saveCategoryLinks() {
        safeSetItem(STORAGE_KEYS.CATEGORY_LINKS, JSON.stringify(categoryLinks.value))
    }

    function updateCategoryLinks(category: CategoryKey, links: CategoryLink[]) {
        categoryLinks.value[category] = links
        saveCategoryLinks()
    }

    const bookmarks = computed<Bookmark[]>(() => {
        return Object.values(categoryLinks.value).flatMap(links =>
            links.map(link => ({
                id: link.id,
                title: link.title,
                url: link.url,
            }))
        )
    })

    return {
        categoryLinks,
        bookmarks,
        updateCategoryLinks,
    }
}
