<template>
    <div class="tag-components-container h-full w-full p-6 overflow-auto">
        <div class="max-w-6xl mx-auto">
            <h1 class="h-title text-3xl font-bold mb-2">标签组件</h1>
            <p class="text-sm text-[var(--muted-foreground)] mb-6">
                这里聚焦展示 <ui-tag>ui-tag</ui-tag> 的常用能力与推荐用法，适用于文档/说明中的行内 token 展示。
            </p>

            <!-- =========================
                模块：基础展示（默认非交互）
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">基础展示（推荐默认）</h2>
                    <p class="text-gray-600 mt-1">默认渲染为 <ui-tag>&lt;span&gt;</ui-tag>，语义上是“标签/标记”，而不是按钮。</p>
                </div>

                <div class="flex flex-wrap items-center gap-3 mb-4">
                    <ui-tag>variant</ui-tag>
                    <ui-tag>size</ui-tag>
                    <ui-tag>nativeType="submit"</ui-tag>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeBasic" />
            </ui-card>

            <!-- 说明：ui-tag 是纯展示标签；需要交互请使用 ui-button 或其它交互组件 -->

            <!-- =========================
                模块：视觉样式（variant）
            ========================== -->
            <ui-card class="p-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">视觉样式</h2>
                    <p class="text-gray-600 mt-1">通过 <ui-tag>variant</ui-tag> 调整视觉风格（neutral / soft / station / danger）。</p>
                </div>

                <div class="flex flex-wrap items-center gap-3 mb-4">
                    <ui-tag variant="neutral">neutral</ui-tag>
                    <ui-tag variant="soft">soft</ui-tag>
                    <ui-tag variant="station">station</ui-tag>
                    <ui-tag variant="danger">danger</ui-tag>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeVariant" />
            </ui-card>
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * TagComponents
 *
 * 页面目标：
 * - 讲清楚 ui-tag 的定位：用于“行内展示标签”（纯展示，不提供交互）
 * - 每个示例块：展示效果 + 一句话说明 + 可复制代码
 */
import uiCard from '@/components/ui/ui-card.vue'
import uiCodeBlock from '@/components/ui/ui-code-block.vue'
import UiTag from '@/components/ui/ui-tag.vue'

// =========================
// 代码示例（保持最小、可直接复制）
// =========================
const codeBasic = `<template>
    <p>
        默认是行内标签：<ui-tag>variant</ui-tag>
    </p>
<\/template>`

const codeVariant = `<template>
    <ui-tag variant="neutral">neutral</ui-tag>
    <ui-tag variant="soft">soft</ui-tag>
    <ui-tag variant="station">station</ui-tag>
    <ui-tag variant="danger">danger</ui-tag>
<\/template>`
</script>

<style scoped lang="less">
.tag-components-container {
    background-color: var(--background);
}

.h-title {
    color: var(--foreground);
}
</style>
