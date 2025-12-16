<template>
    <div class="history-section">
        <div v-if="history.length > 0" class="history-list">
            <div
                v-for="item in history"
                :key="item.id"
                class="history-item"
                @click="$emit('select-history', item.query)"
            >
                <svg class="history-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span class="history-query">{{ item.query }}</span>
                <span class="history-time">{{ formatTime(item.timestamp) }}</span>
                <button class="history-delete" @click.stop="$emit('delete-history', item.id)">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        </div>
        <div v-else class="empty-state">
            <p>还没有搜索记录</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { SearchHistoryItem } from '../types'

interface Props {
    history: SearchHistoryItem[]
    formatTime: (timestamp: number) => string
}

const props = defineProps<Props>()

const emit = defineEmits<{
    'select-history': [query: string]
    'delete-history': [id: string]
}>()
</script>

<style scoped lang="less">
.history-section {
    margin-bottom: 48px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.history-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
}

.history-item {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: var(--shadow-xs);
    position: relative;

    &:hover {
        transform: translateX(4px);
        box-shadow: var(--shadow-sm);
        border-color: var(--primary);

        .history-delete {
            opacity: 1;
        }
    }
}

.history-icon {
    color: var(--muted-foreground);
    flex-shrink: 0;
    width: 14px;
    height: 14px;
}

.history-query {
    flex: 1;
    color: var(--foreground);
    font-size: 13px;
}

.history-time {
    font-size: 11px;
    color: var(--muted-foreground);
    margin-left: auto;
}

.history-delete {
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: none;
    background: transparent;
    cursor: pointer;
    color: var(--muted-foreground);
    border-radius: 4px;
    transition: all 0.2s ease;
    margin-left: 6px;

    &:hover {
        background: var(--destructive);
        color: var(--destructive-foreground);
    }

    svg {
        width: 12px;
        height: 12px;
    }
}

.empty-state {
    padding: 40px 20px;
    text-align: center;
    color: var(--muted-foreground);
    background: var(--card);
    border: 1px dashed var(--border);
    border-radius: 8px;
}
</style>

