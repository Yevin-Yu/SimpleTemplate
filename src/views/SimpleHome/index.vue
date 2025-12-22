<template>
    <div class="simple-home">
        <div class="diagonal-background"></div>

        <div class="header-wrapper">
            <HeaderInfo />
        </div>

        <div class="search-container">
            <EnhancedSearchBox
                :history="searchHistory"
                :bookmarks="bookmarks"
                @search="handleSearch"
                @select-history="handleSearch"
                @clear-history="handleClearHistory"
            />
        </div>

        <div class="categories-container">
            <div class="categories-grid">
                <CategoryCard
                    v-for="cat in categories"
                    :key="cat.category"
                    :title="cat.title"
                    :category="cat.category"
                    :links="categoryLinks[cat.category]"
                    theme="light"
                    @open-url="openUrl"
                    @update-links="handleUpdateLinks"
                >
                    <template #icon>
                        <CategoryIcon :category="cat.category" />
                    </template>
                </CategoryCard>
            </div>
        </div>

        <div class="footer-wrapper">
            <FooterInfo />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useBookmarks } from './composables/useBookmarks'
import { useSearchHistory } from './composables/useSearchHistory'
import { CATEGORIES } from './constants'
import { openUrl } from './utils/url'
import HeaderInfo from './components/HeaderInfo.vue'
import EnhancedSearchBox from './components/EnhancedSearchBox.vue'
import CategoryCard from './components/CategoryCard.vue'
import CategoryIcon from './components/CategoryIcon.vue'
import FooterInfo from './components/FooterInfo.vue'
import type { CategoryKey, CategoryLink } from './types'

const { categoryLinks, bookmarks, updateCategoryLinks } = useBookmarks()
const { searchHistory, addHistory, clearHistory } = useSearchHistory()

const categories = CATEGORIES

function handleSearch(query: string) {
    addHistory(query)
}

function handleClearHistory() {
    clearHistory()
}

function handleUpdateLinks(category: CategoryKey, links: CategoryLink[]) {
    updateCategoryLinks(category, links)
}
</script>

<style scoped lang="less">
.simple-home {
    position: relative;
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 40px;
}

.diagonal-background {
    position: fixed;
    top: 48px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--background);
        clip-path: polygon(0 0, 0 100%, 50% 100%);
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background: color-mix(in srgb, var(--muted) 90%, var(--card) 10%);
        clip-path: polygon(0 0, 50% 100%, 100% 100%, 100% 0);
    }
}

.search-container {
    position: relative;
    z-index: 99;
    padding: 0 32px;
    flex-shrink: 0;
}

.categories-container {
    position: relative;
    z-index: 10;
    padding: 0 32px 40px;
    margin-top: 20px;
    flex: 1;
}

.categories-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    max-width: 1200px;
    margin: 0 auto;
}

.header-wrapper,
.footer-wrapper {
    position: relative;
    z-index: 10;
    flex-shrink: 0;
}

@media (max-width: 768px) {
    .categories-grid {
        grid-template-columns: 1fr;
    }

    .search-container,
    .categories-container {
        padding: 0 16px;
    }

    .header-wrapper :deep(.header-info),
    .footer-wrapper :deep(.footer-info) {
        padding: 16px;
    }
}
</style>
