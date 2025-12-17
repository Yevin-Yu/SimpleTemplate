<template>
    <div class="ui-card" :class="[`ui-card-${variant}`]">
        <slot />
    </div>
</template>

<script setup lang="ts">
/**
 * Card（基础卡片容器）
 *
 * Props
 * - variant: 视觉样式（default/light）
 *
 * Slots
 * - default: 卡片内容
 */
export type UiCardVariant = 'default' | 'light'

withDefaults(
    defineProps<{
        variant?: UiCardVariant
    }>(),
    {
        variant: 'default',
    }
)
</script>

<style scoped lang="less">
.ui-card {
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
}

.ui-card-light {
    border: 1px solid var(--border);
    box-shadow: var(--shadow-xs);
}
</style>
