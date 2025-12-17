<template>
    <!--
        说明：
        - 默认是“非交互标签”，用 <span> 避免把纯展示内容误标成可点击按钮（更符合可访问性语义）
        - 当 clickable=true 时，渲染为原生 <button>，提供键盘/aria 的默认能力
    -->
    <component
        :is="clickable ? 'button' : 'span'"
        class="ui-tag-button"
        :class="[`ui-tag-button-${variant}`, { 'is-clickable': clickable, 'is-disabled': disabled }]"
        :type="clickable ? 'button' : undefined"
        :disabled="clickable ? disabled : undefined"
        :title="title"
        :aria-label="clickable ? ariaLabel : undefined"
        @click="onClick"
    >
        <slot />
    </component>
</template>

<script setup lang="ts">
/**
 * TagButton（行内标签 / 标签按钮）
 *
 * 典型用法：
 * - 文档/说明里的行内“token”展示：默认 clickable=false（语义上是文本标签）
 * - 需要交互（例如：点击筛选/复制/跳转）：设置 clickable=true 并监听 click
 *
 * Props
 * - variant: 视觉样式（neutral/soft）
 * - clickable: 是否可点击；true 时渲染为 <button> 并启用 aria-label
 * - disabled: 禁用态（仅在 clickable=true 时生效）
 * - title: 原生 title（hover 提示）
 * - ariaLabel: 可访问性标签（仅 clickable=true 时使用）
 *
 * Emits
 * - click: 用户点击（disabled 时不会触发）
 */

export type UiTagButtonVariant = 'neutral' | 'soft'

const props = withDefaults(
    defineProps<{
        variant?: UiTagButtonVariant
        clickable?: boolean
        disabled?: boolean
        title?: string
        ariaLabel?: string
    }>(),
    {
        variant: 'neutral',
        clickable: false,
        disabled: false,
        title: undefined,
        ariaLabel: undefined,
    }
)

const emit = defineEmits<{
    click: [event: MouseEvent]
}>()

const onClick = (event: MouseEvent) => {
    // 非交互标签：不对 click 做任何处理，避免误触发（例如包裹在可点击区域内）
    if (!props.clickable) return
    if (props.disabled) return
    emit('click', event)
}
</script>

<style scoped>
.ui-tag-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    height: 24px;
    padding: 0 8px;
    /* border-radius: 6px; */
    border: 1px solid var(--border);
    background: var(--card);
    color: var(--primary);
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 500;
    line-height: 24px;
    white-space: nowrap;
    vertical-align: baseline;
    box-shadow: var(--shadow-xs);
}

.ui-tag-button-soft {
    background: var(--muted);
    color: var(--muted-foreground);
}

.ui-tag-button.is-clickable {
    cursor: pointer;
    user-select: none;
}

.ui-tag-button.is-clickable:hover {
    background: var(--accent);
    color: var(--accent-foreground);
}

.ui-tag-button.is-disabled {
    opacity: 0.7;
    cursor: not-allowed;
}
</style>


