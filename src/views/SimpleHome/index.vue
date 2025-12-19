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
                @search="handleSearchAdd"
                @select-history="handleHistorySelect"
            />
        </div>
        
        <div class="categories-container">
            <div class="categories-grid">
                <CategoryCard
                    title="开发"
                    :links="CATEGORY_LINKS.development"
                    theme="light"
                    @open-url="openUrl"
                >
                    <template #icon>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="16 18 22 12 16 6" />
                            <polyline points="8 6 2 12 8 18" />
                        </svg>
                    </template>
                </CategoryCard>
                
                <CategoryCard
                    title="社交"
                    :links="CATEGORY_LINKS.social"
                    theme="light"
                    @open-url="openUrl"
                >
                    <template #icon>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </template>
                </CategoryCard>
                
                <CategoryCard
                    title="媒体"
                    :links="CATEGORY_LINKS.media"
                    theme="light"
                    @open-url="openUrl"
                >
                    <template #icon>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="23 7 16 12 23 17 23 7" />
                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                        </svg>
                    </template>
                </CategoryCard>
                
                <CategoryCard
                    title="生产力"
                    :links="CATEGORY_LINKS.productivity"
                    theme="light"
                    @open-url="openUrl"
                >
                    <template #icon>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        </svg>
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
import { CATEGORY_LINKS } from './constants'
import { openUrl } from './utils/url'
import HeaderInfo from './components/HeaderInfo.vue'
import EnhancedSearchBox from './components/EnhancedSearchBox.vue'
import CategoryCard from './components/CategoryCard.vue'
import FooterInfo from './components/FooterInfo.vue'

const { bookmarks } = useBookmarks()
const { searchHistory, addHistory } = useSearchHistory()

function handleSearchAdd(query: string) {
    addHistory(query)
}

function handleHistorySelect(query: string) {
    addHistory(query)
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
    z-index: 10;
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
