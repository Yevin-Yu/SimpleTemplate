<template>
    <div class="category-card" :class="[`category-card-${theme}`]">
        <div class="category-header">
            <div class="category-icon">
                <slot name="icon" />
            </div>
            <h3 class="category-title">{{ title }}</h3>
        </div>
        <div class="category-links">
            <button
                v-for="link in links"
                :key="link.id"
                class="category-link"
                @click="$emit('open-url', link.url)"
            >
                <div class="link-icon" :style="{ backgroundColor: link.color }">
                    {{ link.icon }}
                </div>
                <span class="link-title">{{ link.title }}</span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { CategoryLink } from '../types'

interface Props {
    title: string
    links: CategoryLink[]
    theme: 'light' | 'dark'
}

defineProps<Props>()

defineEmits<{
    'open-url': [url: string]
}>()
</script>

<style scoped lang="less">
.category-card {
    padding: 20px;
    border-radius: 0;
    box-shadow: var(--shadow-md);
}

.category-card-light {
    background: var(--card);
    border: 1px solid var(--border);
}

.category-card-dark {
    background: color-mix(in srgb, var(--muted) 85%, var(--card) 15%);
    border: 1px solid var(--border);
    
    .category-link {
        &:hover {
            background: color-mix(in srgb, var(--muted) 60%, var(--card) 40%);
        }
    }
}

.category-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    
    .category-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        color: var(--foreground);
    }
    
    .category-title {
        font-size: 16px;
        font-weight: 600;
        color: var(--foreground);
        margin: 0;
    }
}

.category-links {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 6px;
}

.category-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 6px 4px;
    border: none;
    background: transparent;
    border-radius: 0;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        background: var(--muted);
        transform: translateY(-2px);
    }
    
    .link-icon {
        width: 32px;
        height: 32px;
        border-radius: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 600;
        color: white;
        box-shadow: var(--shadow-xs);
        flex-shrink: 0;
    }
    
    .link-title {
        font-size: 11px;
        color: var(--foreground);
        text-align: center;
        line-height: 1.2;
        word-break: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
}
</style>
