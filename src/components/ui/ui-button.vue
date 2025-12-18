<template>
    <button
        class="ui-button gap-2"
        :class="[`ui-button-${variant}`, `ui-button-size-${size}`, { 'only-icon': !$slots.default }, { 'is-disabled': disabled }]"
        :type="nativeType"
        :disabled="disabled"
        @click="onClick"
    >
        <span class="icon" v-if="$slots.icon" aria-hidden="true">
            <slot name="icon" />
        </span>
        <span class="content" v-if="$slots.default">
            <slot />
        </span>
    </button>
</template>
<script setup lang="ts">
/**
 * Button（基础按钮）
 *
 * Props
 * - variant: 视觉样式（default/primary/blank/station/danger）
 * - size: 尺寸（small/medium）
 * - disabled: 禁用（会透传到原生 disabled，并阻止 click emit）
 * - nativeType: 原生 button type（button/submit/reset）
 *
 * Slots
 * - default: 文案
 * - icon: 左侧图标（无文案时会自动变为仅图标按钮）
 *
 * Emits
 * - click: 用户点击（disabled 时不会触发）
 */

export type UiButtonVariant = 'default' | 'primary' | 'blank' | 'station' | 'danger'
export type UiButtonSize = 'small' | 'medium' | 'large'
export type UiButtonNativeType = 'button' | 'submit' | 'reset'

const props = withDefaults(
    defineProps<{
        variant?: UiButtonVariant
        size?: UiButtonSize
        disabled?: boolean
        nativeType?: UiButtonNativeType
    }>(),
    {
        variant: 'default',
        size: 'medium',
        disabled: false,
        nativeType: 'button',
    }
)

const emit = defineEmits<{
    click: [event: MouseEvent]
}>()

const onClick = (event: MouseEvent) => {
    if (props.disabled) return
    emit('click', event)
}
</script>
<style scoped>
.ui-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0px 10px;
    cursor: pointer;
    border: 1px solid transparent;
    color: var(--foreground);
    line-height: 32px;
    font-family: var(--font-sans);
    vertical-align: middle;
}

.ui-button-default {
    background-color: var(--white);
    box-shadow: var(--shadow-xs);
    border: 1px solid var(--border);

    &:hover {
        background-color: var(--accent);
    }
}

.ui-button-primary {
    background-color: var(--primary);
    box-shadow: var(--shadow-xs);
    color: var(--primary-foreground);

    &:hover {
        background-color: var(--primary);
        filter: brightness(0.9);
    }
}

.ui-button-station {
    background-color: var(--accent);
    box-shadow: var(--shadow-xs);
    color: var(--foreground);
    border: 1px solid color-mix(in srgb, var(--accent) 70%, var(--border));

    &:hover {
        background-color: var(--accent);
        filter: brightness(0.9);
    }
}

.ui-button-danger {
    background-color: var(--destructive);
    box-shadow: var(--shadow-xs);
    color: var(--destructive-foreground);

    &:hover {
        background-color: var(--destructive);
        filter: brightness(0.9);
    }
}

.ui-button-blank {
    background-color: transparent;

    &:hover {
        background-color: var(--accent);
    }
}

.ui-button-size-small {
    padding: 0 8px;
    line-height: 28px;
    height: 28px;
}

.ui-button-size-medium {
    padding: 0 10px;
    line-height: 32px;
    height: 32px;
}

.ui-button-size-large {
    padding: 0 14px;
    line-height: 42px;
    height: 42px;
}

.ui-button.only-icon {
    padding: 8px;
}

.ui-button.is-disabled {
    background-color: var(--muted);
    cursor: not-allowed;
    opacity: 0.8;
}

.icon {
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
