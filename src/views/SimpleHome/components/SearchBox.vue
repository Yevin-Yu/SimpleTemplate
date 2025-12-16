<template>
    <div class="search-section">
        <div class="search-box-wrapper" ref="wrapperRef">
            <div class="search-box">
                <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
                <input
                    v-model="searchQuery"
                    type="text"
                    class="search-input"
                    placeholder="搜索或输入网址"
                    @keyup.enter="handleSearch"
                    @input="onSearchInput"
                    @focus="showSuggestions = true"
                />
                <button v-if="searchQuery" class="clear-button" @click="clearSearch">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <!-- 搜索建议 -->
            <SearchSuggestions
                v-if="showSuggestions && (filteredHistory.length > 0 || filteredBookmarks.length > 0)"
                :history="filteredHistory"
                :bookmarks="filteredBookmarks"
                @select-history="selectSuggestion"
                @select-bookmark="openUrl"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useSearch } from '../composables/useSearch'
import type { SearchHistoryItem, Bookmark } from '../types'
import SearchSuggestions from './SearchSuggestions.vue'

interface Props {
    history: SearchHistoryItem[]
    bookmarks: Bookmark[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
    (e: 'search', query: string): void
    (e: 'select-history', query: string): void
}>()

const wrapperRef = ref<HTMLElement>()
const {
    searchQuery,
    showSuggestions,
    filteredHistory,
    filteredBookmarks,
    onSearchInput,
    clearSearch,
    handleSearch: performSearch,
    selectSuggestion: selectSuggestionBase,
    openUrl,
} = useSearch(props.history, props.bookmarks)

const handleSearch = () => {
    performSearch(item => {
        emit('search', item.query)
    })
}

const selectSuggestion = (query: string) => {
    selectSuggestionBase(query, item => {
        emit('select-history', item.query)
    })
}

const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (wrapperRef.value && !wrapperRef.value.contains(target)) {
        showSuggestions.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped lang="less">
.search-section {
    margin-bottom: 60px;
    margin-top: 80px;
    display: flex;
    justify-content: center;
}

.search-box-wrapper {
    position: relative;
    width: 100%;
    max-width: 600px;
}

.search-box {
    position: relative;
    display: flex;
    align-items: center;
    background: var(--card);
    border: 2px solid var(--border);
    border-radius: 0;
    padding: 12px 16px;
    box-shadow: var(--shadow-md);
    transition: all 0.3s ease;

    &:focus-within {
        border-color: var(--primary);
        box-shadow: var(--shadow-lg);
    }
}

.search-icon {
    color: var(--muted-foreground);
    margin-right: 12px;
    flex-shrink: 0;
}

.search-input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 16px;
    color: var(--foreground);
    font-family: var(--font-sans);

    &::placeholder {
        color: var(--muted-foreground);
    }
}

.clear-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border: none;
    background: transparent;
    cursor: pointer;
    color: var(--muted-foreground);
    border-radius: 50%;
    transition: all 0.2s ease;

    &:hover {
        background: var(--muted);
        color: var(--foreground);
    }
}
</style>
