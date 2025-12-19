<template>
    <div
        class="ui-input-wrapper"
        :class="[
            `ui-input-wrapper-size-${size}`,
            {
                'is-disabled': disabled,
                'has-error': error,
                'has-prefix': $slots.prefix,
                'has-suffix': hasSuffix,
            },
        ]"
        :style="wrapperStyle"
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
            :class="[`ui-input-size-${size}`, { 'has-prefix': $slots.prefix, 'has-suffix': hasSuffix }]"
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
import { ref, computed, useAttrs, useSlots, nextTick } from 'vue'
import { XIcon } from '@/components/icons'
import type { StyleValue } from 'vue'

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

const attrs = useAttrs()
const slots = useSlots()
const inputRef = ref<HTMLInputElement>()

const autoId = ref(`ui-input-${Math.random().toString(36).substring(2, 9)}`)

const wrapperStyle = computed(() => attrs.style as StyleValue | undefined)
const inputId = computed(() => props.id || autoId.value)
const errorId = computed(() => `${inputId.value}-error`)

const showClear = computed(() => {
    if (!props.clearable || props.disabled || props.readonly) return false
    const value = props.modelValue
    return value !== '' && value !== null && value !== undefined
})

const hasSuffix = computed(() => !!(slots.suffix || showClear.value))

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

    if (hadFocus) {
        nextTick(() => {
            inputRef.value?.focus({ preventScroll: true })
        })
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

.ui-input:disabled,
.ui-input:read-only {
    background-color: var(--muted);
    cursor: not-allowed;
}

.ui-input:read-only {
    cursor: default;
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

.input-error-enter-active,
.input-error-leave-active {
    transition:
        opacity 0.2s ease,
        max-height 0.3s ease,
        margin-top 0.3s ease;
    overflow: hidden;
}

.input-error-leave-active {
    transition-duration: 0.15s, 0.25s, 0.25s;
}

.input-error-enter-from,
.input-error-leave-to {
    opacity: 0;
    max-height: 0;
    margin-top: 0;
}

.input-error-enter-to,
.input-error-leave-from {
    opacity: 1;
    max-height: 100px;
}
</style>
