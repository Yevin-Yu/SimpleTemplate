<template>
    <div class="ui-select-wrapper" :class="{ 'is-open': isOpen, 'is-disabled': disabled }" ref="wrapperRef">
        <div class="ui-select-trigger" @click="toggleDropdown" :class="{ 'is-focused': isOpen }">
            <div class="select-value">
                <template v-if="selectedOption">
                    <slot name="selected" :option="selectedOption">
                        <span class="value-text">{{ getOptionLabel(selectedOption) }}</span>
                    </slot>
                </template>
                <span v-else class="placeholder">{{ placeholder }}</span>
            </div>
            <div class="select-icon" :class="{ 'is-open': isOpen }">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline class="chevron-up" points="18 15 12 9 6 15"></polyline>
                    <polyline class="chevron-down" points="6 9 12 15 18 9"></polyline>
                </svg>
            </div>
        </div>
        <!-- 隐藏的测量元素 -->
        <div ref="measureRef" class="ui-select-dropdown measure-dropdown" style="position: absolute; visibility: hidden; pointer-events: none">
            <div class="select-options">
                <div v-for="option in options" :key="getOptionValue(option)" class="select-option">
                    <slot name="option" :option="option" :selected="false">
                        <span>{{ getOptionLabel(option) }}</span>
                    </slot>
                </div>
            </div>
        </div>
        <Transition name="dropdown">
            <div
                v-if="isOpen"
                ref="dropdownRef"
                class="ui-select-dropdown"
                :style="{ ...dropdownStyle, '--dropdown-height': `${actualHeight || 200}px` }"
            >
                <div class="select-options">
                    <div
                        v-for="(option, index) in options"
                        :key="getOptionValue(option)"
                        class="select-option"
                        :class="{ 'is-selected': isSelected(option), 'is-hovered': hoveredIndex === index }"
                        @click="selectOption(option)"
                        @mouseenter="hoveredIndex = index"
                    >
                        <slot name="option" :option="option" :selected="isSelected(option)">
                            <span>{{ getOptionLabel(option) }}</span>
                        </slot>
                    </div>
                    <div v-if="options.length === 0" class="select-empty">
                        <slot name="empty">暂无选项</slot>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
/**
 * Select（下拉选择器）
 *
 * Props
 * - modelValue: 当前选中的 value（配合 v-model）
 * - options: 选项数组（支持 string/number 或对象）
 * - optionLabel: 对象选项的 label 字段名 / 或自定义取 label 的函数
 * - optionValue: 对象选项的 value 字段名 / 或自定义取 value 的函数
 * - placeholder: 未选择时占位文本
 * - disabled: 禁用
 *
 * Slots
 * - selected: 自定义已选中展示（slot props: { option }）
 * - option: 自定义下拉项展示（slot props: { option, selected }）
 * - empty: options 为空时的占位内容
 *
 * Emits
 * - update:modelValue: v-model 标准事件
 * - change: 选中变化（业务监听用）
 *
 * 交互
 * - Click：开合/选择
 * - Keyboard：Enter/Space/↑/↓/Esc 支持
 */
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'

export type UiSelectOption = Record<string, unknown> | string | number

interface Props {
    modelValue?: string | number | null
    options: readonly UiSelectOption[]
    optionLabel?: string | ((option: UiSelectOption) => string)
    optionValue?: string | ((option: UiSelectOption) => string | number)
    placeholder?: string
    disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: null,
    placeholder: '请选择',
    disabled: false,
})

const emit = defineEmits<{
    'update:modelValue': [value: string | number | null]
    change: [value: string | number | null]
}>()

const wrapperRef = ref<HTMLElement>()
const isOpen = ref(false)
const hoveredIndex = ref<number | null>(null)
const dropdownStyle = ref<Record<string, string>>({})
const dropdownRef = ref<HTMLElement>()
const measureRef = ref<HTMLElement>()
const actualHeight = ref<number>(0)

const selectedOption = computed(() => {
    if (props.modelValue === null || props.modelValue === undefined) return null
    return props.options.find(option => getOptionValue(option) === props.modelValue) || null
})

const getOptionLabel = (option: UiSelectOption): string => {
    if (typeof props.optionLabel === 'function') {
        return props.optionLabel(option)
    }
    if (typeof props.optionLabel === 'string') {
        const record = option as Record<string, unknown>
        return (record[props.optionLabel] as string) || String(option)
    }
    return String(option)
}

const getOptionValue = (option: UiSelectOption): string | number => {
    if (typeof props.optionValue === 'function') {
        return props.optionValue(option)
    }
    if (typeof props.optionValue === 'string') {
        const record = option as Record<string, unknown>
        return (record[props.optionValue] as string | number) ?? option
    }
    return option as string | number
}

const isSelected = (option: UiSelectOption): boolean => {
    return getOptionValue(option) === props.modelValue
}

const calculateHeight = (): number => {
    if (measureRef.value) {
        return Math.min(measureRef.value.scrollHeight, 200)
    }
    // 预估高度：每个选项38px（34px高度+2px上下margin）+ 容器padding 16px
    return Math.min(props.options.length * 38 + 16, 200)
}

const toggleDropdown = () => {
    if (props.disabled) return

    if (!isOpen.value) {
        actualHeight.value = calculateHeight()
    }

    isOpen.value = !isOpen.value

    if (isOpen.value) {
        nextTick(() => {
            updateDropdownPosition()
            requestAnimationFrame(() => {
                const realHeight = calculateHeight()
                if (Math.abs(actualHeight.value - realHeight) > 2) {
                    actualHeight.value = realHeight
                    dropdownRef.value?.style.setProperty('--dropdown-height', `${realHeight}px`)
                }
            })
        })
    }
}

const selectOption = (option: UiSelectOption) => {
    const value = getOptionValue(option)
    // 立即关闭下拉框，避免选中时样式变化导致闪烁
    isOpen.value = false
    hoveredIndex.value = null
    // 立即触发事件，不延迟
    emit('update:modelValue', value)
    emit('change', value)
}

const updateDropdownPosition = () => {
    if (!wrapperRef.value) return

    const rect = wrapperRef.value.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const dropdownHeight = actualHeight.value || 200

    // 判断下方空间是否足够
    const spaceBelow = viewportHeight - rect.bottom
    const spaceAbove = rect.top

    if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
        dropdownStyle.value = {
            bottom: `${rect.height + 8}px`,
            top: 'auto',
        }
    } else {
        dropdownStyle.value = {
            top: `${rect.height + 8}px`,
            bottom: 'auto',
        }
    }
}

const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.value && !wrapperRef.value.contains(event.target as Node)) {
        isOpen.value = false
        hoveredIndex.value = null
    }
}

const handleKeydown = (event: KeyboardEvent) => {
    if (props.disabled) return

    if (!isOpen.value) {
        if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(event.key)) {
            event.preventDefault()
            isOpen.value = true
            nextTick(updateDropdownPosition)
        }
        return
    }

    switch (event.key) {
        case 'Escape':
            event.preventDefault()
            isOpen.value = false
            hoveredIndex.value = null
            break
        case 'ArrowDown':
            event.preventDefault()
            hoveredIndex.value = hoveredIndex.value === null ? 0 : Math.min(hoveredIndex.value + 1, props.options.length - 1)
            break
        case 'ArrowUp':
            event.preventDefault()
            hoveredIndex.value = hoveredIndex.value === null ? props.options.length - 1 : Math.max(hoveredIndex.value - 1, 0)
            break
        case 'Enter':
            event.preventDefault()
            if (hoveredIndex.value !== null) {
                const option = props.options[hoveredIndex.value]
                if (option !== undefined) {
                    selectOption(option)
                }
            }
            break
    }
}

watch(isOpen, newValue => {
    if (newValue) {
        document.addEventListener('click', handleClickOutside)
        window.addEventListener('resize', updateDropdownPosition)
    } else {
        document.removeEventListener('click', handleClickOutside)
        window.removeEventListener('resize', updateDropdownPosition)
    }
})

onMounted(() => {
    wrapperRef.value?.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    window.removeEventListener('resize', updateDropdownPosition)
    wrapperRef.value?.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped lang="less">
.ui-select-wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
    min-width: 120px;
}

.ui-select-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 12px;
    height: 34px;
    line-height: 34px;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-xs);
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: var(--font-sans);
    color: var(--foreground);

    &:hover:not(.is-disabled) {
        background-color: var(--accent);
    }
}

.select-value {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
}

.value-text {
    color: var(--foreground);
}

.placeholder {
    color: var(--muted-foreground);
}

.select-icon {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 8px;
    color: var(--muted-foreground);

    .chevron-up {
        opacity: 0;
        transition: opacity 0.2s ease;
    }

    .chevron-down {
        opacity: 1;
        transition: opacity 0.2s ease;
    }

    &.is-open {
        .chevron-up {
            opacity: 1;
        }

        .chevron-down {
            opacity: 0;
        }
    }
}

.ui-select-dropdown {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: var(--card);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-xs);
    max-height: 200px;
    overflow-y: auto;
    margin-top: 8px;
    padding: 4px;
    box-sizing: border-box;
}

.select-options {
    padding: 4px 0;
}

.select-option {
    padding: 0 12px;
    height: 34px;
    margin: 2px 0;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition:
        background-color 0.2s ease,
        color 0.2s ease;
    color: var(--foreground);
    font-weight: 400;
    box-sizing: border-box;

    &:hover,
    &.is-hovered {
        background-color: var(--accent);
    }

    &.is-selected {
        background-color: var(--primary);
        color: var(--primary-foreground);
        font-weight: 500;
    }
}

.select-empty {
    padding: 12px;
    text-align: center;
    color: var(--muted-foreground);
    font-size: 14px;
}

.measure-dropdown {
    position: absolute;
    visibility: hidden;
    pointer-events: none;
    top: 0;
    left: 0;
    right: 0;
    max-height: none !important;
    overflow: visible;
    z-index: -1;
}

.ui-select-wrapper.is-disabled {
    opacity: 0.6;
    cursor: not-allowed;

    .ui-select-trigger {
        cursor: not-allowed;
        background-color: var(--muted);

        &:hover {
            background-color: var(--muted);
            border-color: var(--border);
        }
    }
}

/* 下拉动画 */
.dropdown-enter-active {
    transition:
        opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1),
        transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
        max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1),
        padding 0.35s cubic-bezier(0.4, 0, 0.2, 1),
        margin 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
}

.dropdown-leave-active {
    transition:
        opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        padding 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        margin 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
}

.dropdown-enter-from {
    opacity: 0;
    transform: translateY(-10px);
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
}

.dropdown-enter-to {
    opacity: 1;
    transform: translateY(0);
    max-height: var(--dropdown-height, 200px);
    padding-top: 4px;
    padding-bottom: 4px;
}

.dropdown-leave-from {
    opacity: 1;
    transform: translateY(0);
    max-height: var(--dropdown-height, 200px);
    padding-top: 4px;
    padding-bottom: 4px;
}

.dropdown-leave-to {
    opacity: 0;
    transform: translateY(0);
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
}

/* 滚动条样式 */
.ui-select-dropdown::-webkit-scrollbar {
    width: 6px;
}

.ui-select-dropdown::-webkit-scrollbar-track {
    background: var(--muted);
}

.ui-select-dropdown::-webkit-scrollbar-thumb {
    background: var(--muted-foreground);
    border-radius: var(--radius, 0px);

    &:hover {
        background: var(--foreground);
    }
}
</style>
