<template>
    <div class="bookmarks-section">
        <div v-if="bookmarks.length > 0" class="bookmarks-grid">
            <div v-for="bookmark in bookmarks" :key="bookmark.id" class="bookmark-item" @click="$emit('open-url', bookmark.url)">
                <div class="bookmark-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                </div>
                <div class="bookmark-content">
                    <div class="bookmark-title">{{ bookmark.title }}</div>
                    <div class="bookmark-url">{{ bookmark.url }}</div>
                </div>
            </div>
        </div>
        <div v-else class="empty-state">
            <p>还没有书签</p>
            <ui-button type="blank" @click="$emit('add-bookmark')" class="add-bookmark-btn">
                <template #icon>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </template>
                添加书签
            </ui-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import uiButton from '@/components/ui/ui-button.vue'
import type { Bookmark } from '../types'

interface Props {
    bookmarks: Bookmark[]
}

defineProps<Props>()

defineEmits<{
    'add-bookmark': []
    'open-url': [url: string]
}>()
</script>

<style scoped lang="less">
.bookmarks-section {
    margin-bottom: 48px;
    display: flex;
    justify-content: center;
}

.bookmarks-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
}

.bookmark-item {
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
    }
}

.bookmark-icon {
    color: var(--primary);
    flex-shrink: 0;
    width: 16px;
    height: 16px;
}

.bookmark-content {
    flex: 1;
    min-width: 0;
}

.bookmark-title {
    font-size: 13px;
    font-weight: 500;
    color: var(--foreground);
    margin-bottom: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.bookmark-url {
    font-size: 11px;
    color: var(--muted-foreground);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.empty-state {
    padding: 40px 20px;
    text-align: center;
    color: var(--muted-foreground);
    background: var(--card);
    border: 1px dashed var(--border);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
}

.add-bookmark-btn {
    margin-top: 8px;
}

@media (max-width: 768px) {
    .bookmarks-grid {
        grid-template-columns: 1fr;
    }
}
</style>
