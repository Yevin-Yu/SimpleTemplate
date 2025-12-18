<template>
    <div
        class="ui-input-wrapper"
        :class="[
            `ui-input-wrapper-size-${size}`,
            {
                'is-disabled': disabled,
                'has-error': error,
                'has-prefix': $slots.prefix,
                'has-suffix': $slots.suffix || showClear,
            },
        ]"
    >
        <span v-if="$slots.prefix" class="input-prefix" aria-hidden="true">
            <slot name="prefix" />
        </span>
        <input
            ref="inputRef"
            :id="inputId"
            :name="name"
            :value="modelValue"
            :type="type"
            :placeholder="placeholder"
            :disabled="disabled"
            :readonly="readonly"
            :maxlength="maxlength"
            :autocomplete="autocomplete"
            class="ui-input"
            :class="[`ui-input-size-${size}`, { 'has-prefix': $slots.prefix, 'has-suffix': $slots.suffix || showClear }]"
            :aria-invalid="error ? 'true' : undefined"
            :aria-describedby="error ? errorId : undefined"
            @input="handleInput"
            @focus="emit('focus', $event)"
            @blur="emit('blur', $event)"
            @keydown="handleKeydown"
        />
        <span v-if="showClear" class="input-suffix input-clear" @click.stop="handleClear" :title="clearText" aria-label="清除">
            <XIcon :size="16" />
        </span>
        <span v-else-if="$slots.suffix" class="input-suffix" aria-hidden="true">
            <slot name="suffix" />
        </span>
    </div>
    <transition name="input-error">
        <div v-if="error" :id="errorId" class="input-error" role="alert">{{ error }}</div>
    </transition>
</template>

<script setup lang="ts">
/**
 * Input（输入框）
 *
 * Props
 * - modelValue: 当前值（配合 v-model）
 * - id: 输入框 ID（用于关联 label，如果不提供则自动生成）
 * - name: 输入框 name 属性（用于表单提交和自动填充）
 * - type: 输入类型（text/password/email/number/tel/url/search）
 * - size: 尺寸（small: 32px / medium: 36px / large: 42px）
 * - placeholder: 占位文本
 * - disabled: 禁用
 * - readonly: 只读
 * - maxlength: 最大长度
 * - autocomplete: 自动完成（on/off）
 * - clearable: 是否显示清除按钮（有值且非 disabled/readonly 时显示）
 * - clearText: 清除按钮提示文本
 * - error: 错误信息（显示时会改变输入框样式，并通过 aria-describedby 关联）
 *
 * Slots
 * - prefix: 前置内容（图标等）
 * - suffix: 后置内容（图标等，与 clearable 互斥）
 *
 * Emits
 * - update:modelValue: v-model 标准事件
 * - focus: 获得焦点
 * - blur: 失去焦点
 * - clear: 点击清除按钮
 * - enter: 按下 Enter 键
 */

import { ref, computed } from 'vue'
import { XIcon } from '@/components/icons'

export type UiInputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
export type UiInputSize = 'small' | 'medium' | 'large'

interface Props {
    modelValue?: string | number
    id?: string
    name?: string
    type?: UiInputType
    size?: UiInputSize
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    maxlength?: number
    autocomplete?: string
    clearable?: boolean
    clearText?: string
    error?: string
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    type: 'text',
    size: 'medium',
    placeholder: '',
    disabled: false,
    readonly: false,
    autocomplete: 'off',
    clearable: false,
    clearText: '清除',
})

const emit = defineEmits<{
    'update:modelValue': [value: string | number]
    focus: [event: FocusEvent]
    blur: [event: FocusEvent]
    clear: []
    enter: [event: KeyboardEvent]
}>()

const inputRef = ref<HTMLInputElement>()

/** 自动生成的唯一 ID（如果没有提供 id prop，只在组件初始化时生成一次） */
const autoId = ref(`ui-input-${Math.random().toString(36).substring(2, 9)}`)

/** 输入框 ID */
const inputId = computed(() => props.id || autoId.value)

/** 错误信息元素的 ID */
const errorId = computed(() => `${inputId.value}-error`)

const showClear = computed(() => {
    if (!props.clearable || props.disabled || props.readonly) return false
    const value = props.modelValue
    return value !== '' && value !== null && value !== undefined
})

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
}

const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        emit('enter', event)
    }
}

const handleClear = (event: MouseEvent) => {
    if (props.disabled || props.readonly) return
    event.preventDefault()
    event.stopPropagation()
    const hadFocus = document.activeElement === inputRef.value
    emit('update:modelValue', '')
    emit('clear')
    if (hadFocus && inputRef.value) {
        setTimeout(() => {
            if (document.activeElement !== inputRef.value && inputRef.value) {
                inputRef.value.focus({ preventScroll: true })
            }
        }, 0)
    }
}

defineExpose({
    focus: () => inputRef.value?.focus(),
    blur: () => inputRef.value?.blur(),
    select: () => inputRef.value?.select(),
})
</script>

<style scoped>
.ui-input-wrapper {
    position: relative;
    display: inline-flex;
    align-items: center;
    width: 100%;
}

.ui-input {
    width: 100%;
    border: 1px solid var(--border);
    background-color: var(--card);
    color: var(--foreground);
    font-family: var(--font-sans);
    box-shadow: var(--shadow-xs);
    transition: box-shadow 0.2s ease;
    box-sizing: border-box;
    outline: none;
}

.ui-input-size-small {
    height: 32px;
    padding: 0 12px;
    font-size: 14px;
    line-height: 32px;
}

.ui-input-size-medium {
    height: 36px;
    padding: 0 12px;
    font-size: 14px;
    line-height: 36px;
}

.ui-input-size-large {
    height: 42px;
    padding: 0 14px;
    font-size: 14px;
    line-height: 42px;
}

.ui-input.has-prefix {
    padding-left: 36px;
}

.ui-input-size-large.has-prefix {
    padding-left: 40px;
}

.ui-input.has-suffix {
    padding-right: 36px;
}

.ui-input-size-large.has-suffix {
    padding-right: 40px;
}

.ui-input::placeholder {
    color: var(--muted-foreground);
}

.ui-input:focus:not(:disabled):not(:read-only) {
    box-shadow: var(--shadow-xs);
    outline: 2px solid var(--primary);
    outline-offset: 0;
}

.ui-input:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    background-color: var(--muted);
}

.ui-input:read-only {
    cursor: default;
    background-color: var(--muted);
}

.input-prefix,
.input-suffix {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--muted-foreground);
    z-index: 1;
}

.input-prefix {
    left: 12px;
    pointer-events: none;
}

.ui-input-wrapper-size-large .input-prefix {
    left: 14px;
}

.input-suffix {
    right: 12px;
}

.ui-input-wrapper-size-large .input-suffix {
    right: 14px;
}

.input-clear {
    cursor: pointer;
    pointer-events: auto;
    transition: color 0.2s ease;
}

.input-clear:hover {
    color: var(--foreground);
}

.ui-input-wrapper.has-error .ui-input {
    border-color: var(--destructive);
}

.ui-input-wrapper.has-error .ui-input:focus {
    box-shadow: var(--shadow-xs);
    outline: none;
}

.ui-input-wrapper.is-disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.input-error {
    margin-top: 8px;
    font-size: 12px;
    color: var(--destructive);
    line-height: 1.4;
}

/* 错误信息过渡动画 */
.input-error-enter-active {
    transition:
        opacity 0.2s ease,
        max-height 0.3s ease,
        margin-top 0.3s ease;
    overflow: hidden;
}

.input-error-leave-active {
    transition:
        opacity 0.15s ease,
        max-height 0.25s ease,
        margin-top 0.25s ease;
    overflow: hidden;
}

.input-error-enter-from {
    opacity: 0;
    max-height: 0;
    margin-top: 0;
}

.input-error-enter-to {
    opacity: 1;
    max-height: 100px;
}

.input-error-leave-from {
    opacity: 1;
    max-height: 100px;
}

.input-error-leave-to {
    opacity: 0;
    max-height: 0;
    margin-top: 0;
}
</style>
