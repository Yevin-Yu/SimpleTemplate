<template>
    <div class="suggestions">
        <div v-if="history.length > 0" class="suggestion-group">
            <div class="suggestion-title">搜索记录</div>
            <div
                v-for="item in history.slice(0, 5)"
                :key="item.id"
                class="suggestion-item"
                @click="$emit('select-history', item.query)"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{{ item.query }}</span>
            </div>
        </div>
        <div v-if="bookmarks.length > 0" class="suggestion-group">
            <div class="suggestion-title">书签</div>
            <div
                v-for="item in bookmarks.slice(0, 5)"
                :key="item.id"
                class="suggestion-item"
                @click="$emit('select-bookmark', item.url)"
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
import type { SearchHistoryItem, Bookmark } from '../types'

interface Props {
    history: SearchHistoryItem[]
    bookmarks: Bookmark[]
}

defineProps<Props>()

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
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 0;
    box-shadow: var(--shadow-lg);
    overflow: hidden;
    z-index: 100;
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
