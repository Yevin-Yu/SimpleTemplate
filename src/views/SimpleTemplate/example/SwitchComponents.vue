<template>
    <div class="switch-components-container h-full w-full p-6 overflow-auto">
        <div class="max-w-6xl mx-auto">
            <h1 class="h-title text-3xl font-bold mb-2">开关组件</h1>
            <p class="text-sm text-[var(--muted-foreground)] mb-6">
                这里聚焦展示 <ui-tag>ui-switch</ui-tag> 的常用能力与推荐用法（v-model、禁用态、自定义 thumb 图标）。
            </p>

            <!-- =========================
                模块：基础用法（v-model）
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">基础用法</h2>
                    <p class="text-gray-600 mt-1">使用 <ui-tag>v-model</ui-tag> 绑定布尔值。</p>
                </div>

                <div class="flex items-center gap-4 mb-4">
                    <div class="flex items-center gap-2">
                        <ui-switch v-model="value1" />
                        <span class="text-sm text-[var(--foreground)]">基础开关</span>
                    </div>
                    <div class="text-sm text-[var(--muted-foreground)]">状态：{{ value1 ? '开启' : '关闭' }}</div>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeBasic" />
            </ui-card>

            <!-- =========================
                模块：自定义 thumb 图标
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">自定义图标</h2>
                    <p class="text-gray-600 mt-1">使用 <ui-tag>#thumb-on</ui-tag> / <ui-tag>#thumb-off</ui-tag> 自定义 thumb 内容。</p>
                </div>

                <div class="flex items-center gap-4 mb-4">
                    <div class="flex items-center gap-2">
                        <ui-switch v-model="value2">
                            <template #thumb-on>
                                <SwitchOnIcon />
                            </template>
                            <template #thumb-off>
                                <SwitchOffIcon />
                            </template>
                        </ui-switch>
                        <span class="text-sm text-[var(--foreground)]">带图标</span>
                    </div>
                    <div class="text-sm text-[var(--muted-foreground)]">状态：{{ value2 ? '开启' : '关闭' }}</div>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeSlots" />
            </ui-card>

            <!-- =========================
                模块：禁用态（disabled）
            ========================== -->
            <ui-card class="p-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">禁用状态</h2>
                    <p class="text-gray-600 mt-1">使用 <ui-tag>disabled</ui-tag> 禁用交互。</p>
                </div>

                <div class="flex flex-wrap items-center gap-6 mb-4">
                    <div class="flex items-center gap-2">
                        <ui-switch v-model="valueDisabledOff" disabled />
                        <span class="text-sm text-[var(--foreground)]">禁用（关闭）</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <ui-switch :model-value="true" disabled />
                        <span class="text-sm text-[var(--foreground)]">禁用（开启）</span>
                    </div>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeDisabled" />
            </ui-card>
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * SwitchComponents
 *
 * 页面目标：
 * - 覆盖 ui-switch 的核心能力：v-model / slots / disabled
 * - 示例中 ui-tag 仅用于说明文字里的 token
 */
import { ref } from 'vue'
import uiCard from '@/components/ui/ui-card.vue'
import uiSwitch from '@/components/ui/ui-switch.vue'
import uiCodeBlock from '@/components/ui/ui-code-block.vue'
import UiTag from '@/components/ui/ui-tag.vue'
import { SwitchOnIcon, SwitchOffIcon } from '@/components/icons'

const value1 = ref(false)
const value2 = ref(true)
const valueDisabledOff = ref(false)

// =========================
// 代码示例（tab=4：统一 4 空格缩进）
// =========================
const codeBasic = `<template>
    <ui-switch v-model="value" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(false)
<\/script>`

const codeSlots = `<template>
    <ui-switch v-model="value">
        <template #thumb-on>
            <SwitchOnIcon />
        </template>
        <template #thumb-off>
            <SwitchOffIcon />
        </template>
    </ui-switch>
<\/template>`

const codeDisabled = `<template>
    <ui-switch v-model="value" disabled />
    <ui-switch :model-value="true" disabled />
<\/template>`
</script>

<style scoped lang="less">
.switch-components-container {
    background-color: var(--background);
}

.h-title {
    color: var(--foreground);
}
</style>
