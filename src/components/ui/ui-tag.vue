<template>
    <!-- ui-tag：纯展示标签（语义为文本标记），始终渲染为 <span> -->
    <span class="ui-tag" :class="variantClass" :title="title">
        <slot />
    </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * Tag（行内标签）
 *
 * 典型用法：
 * - 文档/说明里的行内“token”展示（语义上是文本标签）
 *
 * Props
 * - variant: 视觉样式（neutral/soft/station/danger）。除 neutral 外，其它 variant 仅改变文字/边框色，便于在不同背景下保持一致。
 * - title: 原生 title（hover 提示）
 */

export type UiTagVariant = 'neutral' | 'soft' | 'station' | 'danger'

const props = withDefaults(
    defineProps<{
        variant?: UiTagVariant
        title?: string
    }>(),
    {
        variant: 'neutral',
        title: undefined,
    }
)

/**
 * 统一生成 variant class，避免模板里拼字符串，便于未来扩展（例如 size / tone）。
 */
const variantClass = computed(() => `ui-tag-${props.variant}`)
</script>

<style scoped>
.ui-tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    height: 24px;
    padding: 0 8px;
    /* border-radius: 6px; */
    border: 1px solid var(--primary);
    background: var(--card);
    color: var(--primary);
    font-size: 13px;
    font-weight: 400;
    line-height: 24px;
    white-space: nowrap;
    vertical-align: baseline;
    box-shadow: var(--shadow-xs);
    transition:
        color 120ms ease,
        border-color 120ms ease;
}

.ui-tag-soft {
    color: var(--muted-foreground);
    border-color: var(--muted-foreground);
}

/* CrafterStation 主题：使用 muted / accent / destructive 这组主题色变量 */
.ui-tag-station {
    color: var(--accent);
    border-color: var(--accent);
}

.ui-tag-danger {
    color: var(--destructive);
    border-color: var(--destructive);
}
</style>
