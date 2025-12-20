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
                @contextmenu.prevent="handleContextMenu($event, link)"
            >
                <div class="link-icon" :style="{ backgroundColor: link.color }">
                    {{ link.icon }}
                </div>
                <span class="link-title">{{ link.title }}</span>
            </button>
        </div>
        <ui-context-menu ref="contextMenuRef" />
        <BookmarkDialog
            v-model="showDialog"
            :link="editingLink"
            :category="category"
            @save="handleSave"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UiContextMenu from '@/components/ui/ui-context-menu.vue'
import { EditIcon, TrashIcon, PlusIcon } from '@/components/icons'
import type { CategoryLink, CategoryKey } from '../types'
import BookmarkDialog from './BookmarkDialog.vue'

interface Props {
    title: string
    category: CategoryKey
    links: CategoryLink[]
    theme: 'light' | 'dark'
}

const props = defineProps<Props>()

const emit = defineEmits<{
    'open-url': [url: string]
    'update-links': [category: CategoryKey, links: CategoryLink[]]
}>()

const contextMenuRef = ref<InstanceType<typeof UiContextMenu>>()
const showDialog = ref(false)
const editingLink = ref<CategoryLink | null>(null)

function handleContextMenu(e: MouseEvent, link: CategoryLink) {
    contextMenuRef.value?.openWithEvent(e, [
        {
            key: 'edit',
            label: '修改',
            icon: EditIcon,
            onSelect: () => {
                editingLink.value = link
                showDialog.value = true
            },
        },
        {
            key: 'delete',
            label: '删除',
            icon: TrashIcon,
            variant: 'danger',
            onSelect: () => {
                emit('update-links', props.category, props.links.filter(l => l.id !== link.id))
            },
        },
        { type: 'divider' },
        {
            key: 'add',
            label: '新增',
            icon: PlusIcon,
            onSelect: () => {
                editingLink.value = null
                showDialog.value = true
            },
        },
    ])
}

function handleSave(link: CategoryLink) {
    const isEdit = !!editingLink.value
    const newLinks = isEdit
        ? props.links.map(l => (l.id === link.id ? link : l))
        : [...props.links, link]

    emit('update-links', props.category, newLinks)
    showDialog.value = false
    editingLink.value = null
}
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
