<template>
    <aside class="sidebar">
        <nav class="sidebar__nav">
            <SidebarNode
                v-for="item in items"
                :key="item.label"
                :item="item"
                :level="1"
                parent-key=""
                :is-active="isActive"
                :is-open="isOpen"
                :on-toggle="toggle"
                :on-navigate="navigate"
            />
        </nav>
    </aside>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SidebarNode from './SidebarNode.vue'
import type { NavItem } from './types'

const props = defineProps<{
    items?: NavItem[]
}>()

const router = useRouter()
const route = useRoute()
const expanded = ref<Set<string>>(new Set())

const defaultItems: NavItem[] = [
    { label: '主页', to: '/home' },
    {
        label: '二级菜单',
        children: [
            { label: '子页面 A', to: '/home1' },
            {
                label: '三级菜单',
                children: [
                    { label: '子页面 B-1', to: '/home2' },
                    { label: '子页面 B-2', to: '/home3' },
                ],
            },
        ],
    },
]

const items = computed(() => (props.items?.length ? props.items : defaultItems))

const isActive = (item: NavItem): boolean => {
    if (item.children?.length) return item.children.some(isActive)
    return !!item.to && !item.external && route.path === item.to
}

const isOpen = (key: string) => expanded.value.has(key)

const toggle = (key: string) => {
    const next = new Set(expanded.value)
    if (next.has(key)) {
        next.delete(key)
    } else {
        next.add(key)
    }
    expanded.value = next
}

const navigate = (item: NavItem) => {
    if (!item.to) return
    if (item.external) {
        window.open(item.to, '_blank', 'noopener')
    } else {
        router.push(item.to)
    }
}
</script>

<style scoped lang="less">
.sidebar {
    width: 240px;
    height: calc(100vh - 48px);
    background: var(--sidebar);
    color: var(--sidebar-foreground);
    border-right: 1px solid var(--sidebar-border);
    padding: 12px;
}

.sidebar__nav {
    display: flex;
    flex-direction: column;
}
</style>
