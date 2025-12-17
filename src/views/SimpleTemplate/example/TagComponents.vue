<template>
    <div class="tag-components-container h-full w-full p-6 overflow-auto">
        <div class="max-w-6xl mx-auto">
            <h1 class="h-title text-3xl font-bold mb-2">标签组件</h1>
            <p class="text-sm text-[var(--muted-foreground)] mb-6">
                这里聚焦展示 <ui-tag-button>ui-tag-button</ui-tag-button> 的常用能力与推荐用法，适用于文档/说明中的行内 token 或轻量交互标签。
            </p>

            <!-- =========================
                模块：基础展示（默认非交互）
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">基础展示（推荐默认）</h2>
                    <p class="text-gray-600 mt-1">
                        默认 <ui-tag-button>clickable=false</ui-tag-button>，渲染为 <ui-tag-button>&lt;span&gt;</ui-tag-button>，语义上是“标签/标记”，而不是按钮。
                    </p>
                </div>

                <div class="flex flex-wrap items-center gap-3 mb-4">
                    <ui-tag-button>variant</ui-tag-button>
                    <ui-tag-button>size</ui-tag-button>
                    <ui-tag-button>nativeType="submit"</ui-tag-button>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeBasic" />
            </ui-card>

            <!-- =========================
                模块：可点击标签（clickable + click）
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="flex items-start justify-between gap-4 mb-4">
                    <div>
                        <h2 class="h-title text-2xl font-semibold">可点击标签</h2>
                        <p class="text-gray-600 mt-1">
                            当你确实需要交互时，设置 <ui-tag-button>clickable=true</ui-tag-button>，组件会渲染为原生 <ui-tag-button>&lt;button&gt;</ui-tag-button>。
                        </p>
                    </div>
                </div>

                <div class="flex flex-wrap items-center gap-3 mb-4">
                    <ui-tag-button clickable aria-label="筛选：全部" @click="onTagClick('全部')">全部</ui-tag-button>
                    <ui-tag-button clickable aria-label="筛选：进行中" @click="onTagClick('进行中')">进行中</ui-tag-button>
                    <ui-tag-button clickable aria-label="筛选：已完成" @click="onTagClick('已完成')">已完成</ui-tag-button>
                    <ui-tag-button clickable disabled aria-label="禁用标签（不触发）" @click="onTagClick('禁用')">禁用</ui-tag-button>
                </div>

                <div class="text-sm text-[var(--muted-foreground)] mb-4">
                    最近一次点击：<span class="font-medium text-[var(--foreground)]">{{ lastClickText }}</span>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeClickable" />
            </ui-card>

            <!-- =========================
                模块：视觉样式（variant）
            ========================== -->
            <ui-card class="p-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">视觉样式</h2>
                    <p class="text-gray-600 mt-1">通过 <ui-tag-button>variant</ui-tag-button> 调整背景层级（neutral / soft）。</p>
                </div>

                <div class="flex flex-wrap items-center gap-3 mb-4">
                    <ui-tag-button variant="neutral">neutral</ui-tag-button>
                    <ui-tag-button variant="soft">soft</ui-tag-button>
                    <ui-tag-button clickable variant="neutral" aria-label="点击 neutral" @click="onTagClick('neutral')">可点击 neutral</ui-tag-button>
                    <ui-tag-button clickable variant="soft" aria-label="点击 soft" @click="onTagClick('soft')">可点击 soft</ui-tag-button>
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
 * - 讲清楚 ui-tag-button 的定位：默认用于“行内展示标签”，需要交互时才开启 clickable
 * - 每个示例块：展示效果 + 一句话说明 + 可复制代码
 */
import { ref } from 'vue'
import uiCard from '@/components/ui/ui-card.vue'
import uiCodeBlock from '@/components/ui/ui-code-block.vue'
import UiTagButton from '@/components/ui/ui-tag-button.vue'

const lastClickText = ref('无')

const onTagClick = (label: string) => {
    lastClickText.value = `${label}（${new Date().toLocaleTimeString()}）`
}

// =========================
// 代码示例（保持最小、可直接复制）
// =========================
const codeBasic = `<template>
    <p>
        默认是行内标签：<ui-tag-button>variant</ui-tag-button>
    </p>
<\/template>`

const codeClickable = `<template>
    <ui-tag-button clickable aria-label="筛选：进行中" @click="onClick('进行中')">
        进行中
    </ui-tag-button>
    <ui-tag-button clickable disabled aria-label="禁用（不触发）" @click="onClick('禁用')">
        禁用
    </ui-tag-button>
<\/template>

<script setup lang="ts">
const onClick = (label: string) => console.log('tag clicked:', label)
<\/script>`

const codeVariant = `<template>
    <ui-tag-button variant="neutral">neutral</ui-tag-button>
    <ui-tag-button variant="soft">soft</ui-tag-button>
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


