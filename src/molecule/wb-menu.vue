<template>
    <nav class="wb-menu" tabindex="0" role="menu">
        <ul>
            <wb-menu-item
                v-for="item in items"
                :key="item.key"
                :item="item"
                :depth="0"
                :active="active"
                :collapsed="collapsed"
                :expanded-keys="expandedKeys"
                @select="onSelect"
                @toggle="onToggle"
            />
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import WbMenuItem from './wb-menu-item.vue'

interface MenuItem {
    key: string | number
    label: string
    icon?: string
    disabled?: boolean
    children?: MenuItem[]
}

const props = defineProps({
    items: { type: Array as () => MenuItem[], default: () => [] },
    mode: { type: String as () => 'vertical' | 'horizontal', default: 'vertical' },
    collapsed: { type: Boolean, default: false },
    modelValue: { type: [String, Number], default: null },
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number | null): void
    (e: 'select', item: MenuItem): void
    (e: 'toggle', item: MenuItem): void
}>()

const items = props.items as MenuItem[]
const collapsed = props.collapsed as boolean

const active = ref<string | number | null>(props.modelValue ?? items[0]?.key ?? null)
const expandedKeys = ref<Set<string | number>>(new Set())

watch(
    () => props.modelValue,
    v => {
        if (v !== undefined && v !== null) active.value = v
    }
)

watch(
    () => props.items,
    (newItems: MenuItem[]) => {
        if (!newItems.find(i => i.key === active.value)) {
            active.value = newItems[0]?.key ?? null
            emit('update:modelValue', active.value)
        }
    }
)

function onSelect(item: MenuItem) {
    if (item.disabled) return
    active.value = item.key
    emit('update:modelValue', item.key)
    emit('select', item)
}

function onToggle(item: MenuItem) {
    if (item.disabled || !item.children?.length) return
    if (expandedKeys.value.has(item.key)) {
        expandedKeys.value.delete(item.key)
    } else {
        expandedKeys.value.add(item.key)
    }
    emit('toggle', item)
}

onMounted(() => {
    if (active.value == null && props.items.length) {
        active.value = props.items[0]?.key ?? null
        emit('update:modelValue', active.value)
    }
})
</script>

<style scoped lang="less">
.wb-menu {
    background: var(--theme-aside-bg-color);
    color: var(--white-text-color);
    width: 100%;
    border-radius: 6px;
    padding: 12px;
    user-select: none;
    outline: none;
}

.wb-menu ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.wb-menu ul > .wb-menu-item {
    padding: 0px;
}
</style>
