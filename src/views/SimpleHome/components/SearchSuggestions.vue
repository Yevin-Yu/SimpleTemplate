<template>
    <div class="suggestions">
        <div v-if="historySuggestions.length > 0" class="suggestion-group">
            <div class="suggestion-title">搜索记录</div>
            <div
                v-for="item in historySuggestions"
                :key="item.id"
                class="suggestion-item"
                @click="$emit('select-history', item.query!)"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{{ item.title }}</span>
            </div>
        </div>
        <div v-if="bookmarkSuggestions.length > 0" class="suggestion-group">
            <div class="suggestion-title">书签</div>
            <div
                v-for="item in bookmarkSuggestions"
                :key="item.id"
                class="suggestion-item"
                @click="$emit('select-bookmark', item.url!)"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                <span>{{ item.title }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MAX_SUGGESTIONS_PER_GROUP } from '../constants'
import type { SearchSuggestion } from '../types'

interface Props {
    suggestions: SearchSuggestion[]
}

const props = defineProps<Props>()

const historySuggestions = computed(() => {
    return props.suggestions
        .filter(item => item.type === 'history')
        .slice(0, MAX_SUGGESTIONS_PER_GROUP)
})

const bookmarkSuggestions = computed(() => {
    return props.suggestions
        .filter(item => item.type === 'bookmark')
        .slice(0, MAX_SUGGESTIONS_PER_GROUP)
})

defineEmits<{
    'select-history': [query: string]
    'select-bookmark': [url: string]
}>()
</script>

<style scoped lang="less">
.suggestions {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    right: 0;
    max-height: 400px;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 0;
    box-shadow: var(--shadow-lg);
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 100;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: var(--muted);
        border-radius: 3px;

        &:hover {
            background: var(--muted-foreground);
        }
    }
}

.suggestion-group {
    padding: 8px 0;
}

.suggestion-title {
    padding: 8px 16px;
    font-size: 12px;
    font-weight: 600;
    color: var(--muted-foreground);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.suggestion-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 16px;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
        background: var(--muted);
    }

    svg {
        color: var(--muted-foreground);
        flex-shrink: 0;
    }

    span {
        flex: 1;
        color: var(--foreground);
    }
}
</style>
