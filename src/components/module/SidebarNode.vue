<template>
    <div class="sidebar__item-wrapper">
        <ui-button class="sidebar__item mt-2" :class="{
            'is-active': isActive(item),
            'is-disabled': item.disabled,
        }" :type="isActive(item) ? 'primary' : 'default'" @click="handleClick">
            <span v-if="item.icon" class="sidebar__item-icon">
                <component :is="item.icon" :size="18" />
            </span>
            <span class="sidebar__item-text">{{ item.label }}</span>
            <span v-if="hasChildren" class="sidebar__item-caret">{{ open ? '▾' : '▸' }}</span>
        </ui-button>

        <div v-if="hasChildren && open" class="sidebar__subnav pl-4">
            <SidebarNode v-for="child in item.children" :key="`${keyPath}/${child.label}`" :item="child"
                :level="level + 1" :parent-key="keyPath" :is-active="isActive" :is-open="isOpen" :on-toggle="onToggle"
                :on-navigate="onNavigate" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import uiButton from '@/components/ui/ui-button.vue'
import type { NavItem } from './types'

defineOptions({ name: 'SidebarNode' })

const props = withDefaults(
    defineProps<{
        item: NavItem
        level?: number
        parentKey?: string
        isActive: (item: NavItem) => boolean
        isOpen: (key: string) => boolean
        onToggle: (key: string) => void
        onNavigate: (item: NavItem) => void
    }>(),
    {
        level: 1,
        parentKey: '',
    }
)

const keyPath = computed(() => `${props.parentKey ?? ''}/${props.item.label}`)
const open = computed(() => props.isOpen(keyPath.value))
const hasChildren = computed(() => !!props.item.children?.length)

const handleClick = () => {
    if (props.item.disabled) return
    if (hasChildren.value) {
        props.onToggle(keyPath.value)
        return
    }
    props.onNavigate(props.item)
}
</script>

<style scoped lang="less"></style>
