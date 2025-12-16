<template>
    <div class="quick-access-section">
        <div class="quick-access-grid">
            <div v-for="(site, index) in sites" :key="site.id" class="quick-access-item"
                :class="{ 'dragging': draggedIndex === index, 'drag-over': dragOverIndex === index }" draggable="true"
                @dragstart="handleDragStart(index, $event)" @dragend="handleDragEnd"
                @dragover.prevent="handleDragOver(index, $event)" @dragenter.prevent="handleDragEnter(index)"
                @dragleave="handleDragLeave" @drop.prevent="handleDrop(index, $event)"
                @click="$emit('open-url', site.url)">
                <div class="site-icon" :style="{ backgroundColor: site.color }">
                    {{ site.icon }}
                </div>
                <div class="site-title">{{ site.title }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { QuickAccessSite } from '../types'

interface Props {
    sites: QuickAccessSite[]
}

defineProps<Props>()

const emit = defineEmits<{
    'open-url': [url: string]
    'reorder': [fromIndex: number, toIndex: number]
}>()

const draggedIndex = ref<number | null>(null)
const dragOverIndex = ref<number | null>(null)

const handleDragStart = (index: number, event: DragEvent) => {
    draggedIndex.value = index
    if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('text/html', index.toString())
    }
}

const handleDragEnd = () => {
    draggedIndex.value = null
    dragOverIndex.value = null
}

const handleDragOver = (index: number, event: DragEvent) => {
    if (draggedIndex.value === null || draggedIndex.value === index) return
    if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move'
    }
    dragOverIndex.value = index
}

const handleDragEnter = (index: number) => {
    if (draggedIndex.value !== null && draggedIndex.value !== index) {
        dragOverIndex.value = index
    }
}

const handleDragLeave = () => {
    // 延迟清除，避免在子元素间移动时闪烁
    setTimeout(() => {
        if (dragOverIndex.value !== null) {
            dragOverIndex.value = null
        }
    }, 50)
}

const handleDrop = (toIndex: number, event: DragEvent) => {
    event.preventDefault()
    if (draggedIndex.value === null || draggedIndex.value === toIndex) {
        dragOverIndex.value = null
        return
    }

    emit('reorder', draggedIndex.value, toIndex)
    draggedIndex.value = null
    dragOverIndex.value = null
}
</script>

<style scoped lang="less">
.quick-access-section {
    margin-bottom: 48px;
    display: flex;
    justify-content: center;
}

.quick-access-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 24px;
}

.quick-access-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: 0;
    cursor: grab;
    transition: all 0.2s ease;
    box-shadow: none;
    position: relative;

    &:active {
        cursor: grabbing;
    }

    &:hover {
        transform: translateY(-4px);
    }

    &.dragging {
        opacity: 0.5;
        cursor: grabbing;
    }

    &.drag-over {
        transform: scale(1.05);
    }

}

.site-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: 600;
    color: white;
    box-shadow: var(--shadow-xs);

    &.add-icon {
        background: var(--muted);
        color: var(--muted-foreground);
        font-size: 32px;
    }
}

.site-title {
    font-size: 13px;
    color: var(--foreground);
    text-align: center;
    word-break: break-word;
}


@media (max-width: 768px) {
    .quick-access-grid {
        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
        gap: 12px;
    }
}
</style>
