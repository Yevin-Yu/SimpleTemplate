<template>
    <label
        class="ui-switch"
        :class="switchClasses"
        role="switch"
        :aria-checked="checked"
        :aria-disabled="disabled"
        tabindex="0"
        @click.prevent="handleToggle"
        @keydown.space.prevent="handleToggle"
        @keydown.enter.prevent="handleToggle"
    >
        <input class="ui-switch__input" type="checkbox" :checked="checked" :disabled="disabled" @change="handleChange" />
        <span class="ui-switch__track">
            <span class="ui-switch__thumb">
                <slot name="thumb-on" v-if="checked"></slot>
                <slot name="thumb-off" v-else></slot>
            </span>
        </span>
    </label>
</template>
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
    defineProps<{
        modelValue?: boolean
        disabled?: boolean
    }>(),
    {
        modelValue: false,
        disabled: false,
    }
)

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'change', value: boolean): void
}>()

const checked = computed(() => props.modelValue ?? false)
const switchClasses = computed(() => [{ 'is-checked': checked.value, 'is-disabled': props.disabled }])

const emitChange = (next: boolean) => {
    emit('update:modelValue', next)
    emit('change', next)
}

const handleToggle = () => {
    if (props.disabled) return
    emitChange(!checked.value)
}

const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement | null
    if (!target || props.disabled) return
    emitChange(target.checked)
}
</script>
<style scoped lang="less">
.ui-switch {
    --switch-height: 18.5px;
    --switch-width: 32px;
    --switch-thumb-size: 14px;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    user-select: none;
}

.ui-switch__input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
}

.ui-switch__track {
    width: var(--switch-width);
    height: var(--switch-height);
    background: var(--input);
    border: 1px solid var(--border);
    border-radius: var(--switch-height);
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    padding: 0;
    transition:
        background-color 0.2s ease,
        border-color 0.2s ease;
    box-shadow: var(--shadow-xs);
}

.ui-switch__thumb {
    width: var(--switch-thumb-size);
    height: var(--switch-thumb-size);
    border-radius: 50%;
    background: var(--card);
    position: absolute;
    top: 50%;
    left: 1px;
    transform: translate(0, -50%);
    display: grid;
    place-items: center;
    transition: all 0.2s ease;
}

/* 确保插槽图标固定尺寸且居中 */
.ui-switch__thumb > :deep(*) {
    width: 12px;
    height: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.ui-switch.is-checked .ui-switch__track {
    background: var(--primary);
}

.ui-switch.is-checked .ui-switch__thumb {
    transform: translate(calc(var(--switch-width) - var(--switch-thumb-size) - 4px), -50%);
}

.ui-switch:focus-visible .ui-switch__track {
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--ring) 60%, transparent);
}

.ui-switch.is-disabled {
    cursor: not-allowed;
    opacity: 0.5;
}
</style>
