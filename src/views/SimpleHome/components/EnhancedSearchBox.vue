<template>
    <div class="enhanced-search-section">
        <div class="search-box-wrapper" ref="wrapperRef">
            <div class="search-box">
                <SearchIcon :size="20" class="search-icon" />
                <input
                    ref="inputRef"
                    v-model="searchQuery"
                    type="text"
                    class="search-input"
                    :placeholder="`Search ${currentEngine.name}...`"
                    @keyup.enter="handleSearch"
                    @input="updateSuggestionsVisibility"
                    @focus="updateSuggestionsVisibility"
                />
                <button v-if="searchQuery" class="clear-button" @click="clearSearch">
                    <XIcon :size="16" />
                </button>
                <div class="search-engines">
                    <ui-button
                        v-for="engine in engines"
                        :key="engine.id"
                        variant="blank"
                        size="small"
                        :class="{ active: currentEngine.id === engine.id }"
                        @click="selectEngine(engine.id)"
                        :title="engine.name"
                    >
                        <template #icon>
                            <component :is="engine.icon" :size="16" />
                        </template>
                    </ui-button>
                </div>
            </div>
            <SearchSuggestions
                v-if="showSuggestions && suggestions.length > 0"
                :suggestions="suggestions"
                @select-history="selectSuggestion"
                @select-bookmark="handleBookmarkClick"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { SearchIcon, XIcon } from '@/components/icons'
import UiButton from '@/components/ui/ui-button.vue'
import { SEARCH_ENGINES, DEFAULT_SEARCH_ENGINE, ENGINE_SHORTCUT_KEYS } from '../constants'
import { isUrl, normalizeUrl } from '../utils/url'
import { useSearch } from '../composables/useSearch'
import type { SearchHistoryItem, Bookmark, SearchEngine } from '../types'
import SearchSuggestions from './SearchSuggestions.vue'

interface Props {
    history: SearchHistoryItem[]
    bookmarks: Bookmark[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
    search: [query: string]
    'select-history': [query: string]
}>()

const engines = SEARCH_ENGINES
const currentEngine = ref<SearchEngine>(
    engines.find(e => e.id === DEFAULT_SEARCH_ENGINE) ?? engines[0]!
)

const wrapperRef = ref<HTMLElement>()
const inputRef = ref<HTMLInputElement>()

const { searchQuery, showSuggestions, suggestions, updateSuggestionsVisibility, clearSearch } = useSearch(
    computed(() => props.history),
    computed(() => props.bookmarks)
)

function selectEngine(engineId: string) {
    const engine = engines.find(e => e.id === engineId)
    if (engine) {
        currentEngine.value = engine
    }
}

function performSearch(query: string) {
    const url = isUrl(query) ? normalizeUrl(query) : `${currentEngine.value.url}${encodeURIComponent(query)}`
    window.open(url, '_blank')
    showSuggestions.value = false
    emit('search', query)
}

function handleSearch() {
    const query = searchQuery.value.trim()
    if (!query) return
    performSearch(query)
}

function selectSuggestion(query: string) {
    searchQuery.value = query
    performSearch(query)
    emit('select-history', query)
}

function handleBookmarkClick(url: string) {
    window.open(url, '_blank')
}

function handleClickOutside(e: MouseEvent) {
    const target = e.target as HTMLElement
    if (wrapperRef.value && !wrapperRef.value.contains(target)) {
        showSuggestions.value = false
    }
}

function handleKeydown(e: KeyboardEvent) {
    const target = e.target as HTMLElement
    const isInputFocused = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'

    if (isInputFocused) {
        if (e.key === 'Escape' && target === inputRef.value) {
            e.preventDefault()
            clearSearch()
            inputRef.value?.blur()
        }
        return
    }

    switch (e.key) {
        case '/':
            e.preventDefault()
            inputRef.value?.focus()
            break
        case 'Escape':
            e.preventDefault()
            clearSearch()
            inputRef.value?.blur()
            break
        default:
            if (ENGINE_SHORTCUT_KEYS.includes(e.key as typeof ENGINE_SHORTCUT_KEYS[number])) {
                const index = parseInt(e.key) - 1
                const engine = engines[index]
                if (engine) {
                    e.preventDefault()
                    selectEngine(engine.id)
                }
            }
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped lang="less">
.enhanced-search-section {
    display: flex;
    justify-content: center;
    margin: 40px 0 60px;
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
    padding: 14px 16px;
    box-shadow: var(--shadow-md);
    transition: all 0.3s ease;
    margin-bottom: 12px;
    gap: 8px;

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
    border-radius: 0;
    transition: all 0.2s ease;

    &:hover {
        background: var(--muted);
        color: var(--foreground);
    }
}

.search-engines {
    display: flex;
    gap: 4px;
    align-items: center;
    flex-shrink: 0;
    margin-left: auto;
    padding-left: 8px;
    border-left: 1px solid var(--border);
}

.search-engines :deep(.ui-button) {
    width: 24px;
    height: 24px;
    min-width: 24px;
    padding: 0;

    &.active {
        background-color: var(--primary);
        color: var(--primary-foreground);

        :deep(svg) {
            opacity: 1;
        }
    }

    :deep(svg) {
        width: 14px;
        height: 14px;
        opacity: 0.8;
        transition: opacity 0.2s ease;
    }

    &:hover :deep(svg) {
        opacity: 1;
    }
}
</style>
