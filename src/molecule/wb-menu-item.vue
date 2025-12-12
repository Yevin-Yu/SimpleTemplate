<template>
    <li class="wb-menu-item" :class="{ active: item.key === active }">
        <div class="wb-menu-item-content" @click="handleClick">
            <span class="wb-menu-icon" v-if="item.icon || $slots['icon-' + item.key]">
                <slot :name="'icon-' + item.key">{{ item.icon }}</slot>
            </span>
            <span class="wb-menu-label" v-if="!collapsed">{{ item.label }}</span>
            <span class="wb-menu-arrow" v-if="hasChildren && !collapsed" @click.stop="handleToggle" :class="{ expanded: isExpanded }"> ▶ </span>
        </div>
        <transition name="slide">
            <ul v-if="hasChildren && isExpanded && !collapsed" class="wb-submenu">
                <wb-menu-item
                    v-for="child in item.children"
                    :key="child.key"
                    :item="child"
                    :depth="depth + 1"
                    :active="active"
                    :collapsed="collapsed"
                    :expanded-keys="expandedKeys"
                    @select="$emit('select', $event)"
                    @toggle="$emit('toggle', $event)"
                />
            </ul>
        </transition>
    </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface MenuItem {
    key: string | number
    label: string
    icon?: string
    disabled?: boolean
    children?: MenuItem[]
}

const props = defineProps<{
    item: MenuItem
    depth: number
    active: string | number | null
    collapsed: boolean
    expandedKeys: Set<string | number>
}>()

const emit = defineEmits<{
    (e: 'select', item: MenuItem): void
    (e: 'toggle', item: MenuItem): void
}>()

const hasChildren = computed(() => props.item.children && props.item.children.length > 0)
const isExpanded = computed(() => props.expandedKeys.has(props.item.key))

function handleClick() {
    if (props.item.disabled) return
    if (hasChildren.value) {
        emit('toggle', props.item)
    } else {
        emit('select', props.item)
    }
}

function handleToggle() {
    emit('toggle', props.item)
}
</script>

<style scoped lang="less">
.wb-menu-item {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding-left: 12px;
}

.wb-menu-item-content {
    margin: 2px 0;
    display: flex;
    align-items: center;
    padding: 12px 16px;
    gap: 10px;
    min-height: 40px;
    transition: all 0.2s ease;
    border-radius: 2px;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.wb-menu-item-content:hover {
    box-shadow: var(--wb-menu-item-shadow);
}

.wb-menu-item.active .wb-menu-item-content {
    color: var(--theme-text-color);
    box-shadow: var(--wb-menu-item-shadow-active);
}

.wb-menu-icon {
    width: 20px;
    height: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: transform 0.3s ease;
}

.wb-menu-item-content:hover .wb-menu-icon {
    transform: scale(1.2);
}

.wb-menu-label {
    font-size: 14px;
    flex: 1;
    text-align: left;
}

.wb-menu-arrow {
    font-size: 10px;
    margin-left: auto;
    opacity: 0.7;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
}

.wb-menu-arrow.expanded {
    transform: rotate(90deg);
}

.wb-submenu {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    max-height: 500px;
    overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
    max-height: 0;
    opacity: 0;
    transform: translateY(-10px);
}
</style>
