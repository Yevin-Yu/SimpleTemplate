<template>
    <div class="button-components-container h-full w-full p-6 overflow-auto">
        <div class="max-w-6xl mx-auto">
            <h1 class="h-title text-3xl font-bold mb-2">按钮组件</h1>
            <p class="text-sm text-[var(--muted-foreground)] mb-6">
                这里聚焦展示 <ui-tag>ui-button</ui-tag> 的常用能力与推荐用法，并提供可复制的代码示例。
            </p>

            <!-- =========================
                模块：基础用法（variant）
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="flex items-start justify-between gap-4 mb-4">
                    <div>
                        <h2 class="h-title text-2xl font-semibold">基础用法</h2>
                        <p class="text-gray-600 mt-1">通过 <ui-tag>variant</ui-tag> 选择不同视觉样式。</p>
                    </div>
                </div>

                <div class="flex flex-wrap gap-3 mb-4">
                    <ui-button>默认按钮</ui-button>
                    <ui-button variant="primary">主要按钮</ui-button>
                    <ui-button variant="blank">空白按钮</ui-button>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeVariant" />
            </ui-card>

            <!-- =========================
                模块：主题色（station / danger）
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">主题色</h2>
                    <p class="text-gray-600 mt-1">
                        参考 <ui-tag>ui-tag</ui-tag> 的主题色命名，按钮也提供 <ui-tag>station</ui-tag> / <ui-tag>danger</ui-tag> 两个主题 variant。
                    </p>
                </div>

                <div class="flex flex-wrap items-center gap-3 mb-4">
                    <ui-button variant="station">Station</ui-button>
                    <ui-button variant="danger">Danger</ui-button>
                    <ui-button variant="station" size="small">Small Station</ui-button>
                    <ui-button variant="danger" size="small">Small Danger</ui-button>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeTheme" />
            </ui-card>

            <!-- =========================
                模块：尺寸（size）
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">尺寸</h2>
                    <p class="text-gray-600 mt-1">通过 <ui-tag>size</ui-tag> 选择按钮尺寸（small / medium / large）。</p>
                </div>

                <div class="flex flex-wrap items-center gap-3 mb-4">
                    <ui-button size="small">Small</ui-button>
                    <ui-button>Medium</ui-button>
                    <ui-button size="large">Large</ui-button>
                    <ui-button variant="primary" size="small">Small Primary</ui-button>
                    <ui-button variant="primary">Medium Primary</ui-button>
                    <ui-button variant="primary" size="large">Large Primary</ui-button>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeSize" />
            </ui-card>

            <!-- =========================
                模块：图标按钮（slot: icon）
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">带图标 / 仅图标</h2>
                    <p class="text-gray-600 mt-1">使用 <ui-tag>#icon</ui-tag> 插槽传入图标。若没有默认插槽文案，将自动表现为“仅图标按钮”。</p>
                </div>

                <div class="flex flex-wrap gap-3 mb-4">
                    <ui-button>
                        <template #icon>
                            <SettingsIcon size="16" />
                        </template>
                        设置
                    </ui-button>
                    <ui-button variant="primary">
                        <template #icon>
                            <ShareIcon size="16" />
                        </template>
                        分享
                    </ui-button>
                    <ui-button variant="blank">
                        <template #icon>
                            <LogOutIcon size="16" />
                        </template>
                        退出
                    </ui-button>
                </div>

                <div class="flex flex-wrap gap-3 mb-4">
                    <ui-button :title="'设置（仅图标）'">
                        <template #icon>
                            <SettingsIcon size="16" />
                        </template>
                    </ui-button>
                    <ui-button variant="primary" :title="'分享（仅图标）'">
                        <template #icon>
                            <ShareIcon size="16" />
                        </template>
                    </ui-button>
                    <ui-button variant="blank" :title="'退出（仅图标）'">
                        <template #icon>
                            <LogOutIcon size="16" />
                        </template>
                    </ui-button>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeIcon" />
            </ui-card>

            <!-- =========================
                模块：禁用（disabled）
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">禁用状态</h2>
                    <p class="text-gray-600 mt-1">
                        <ui-tag>disabled</ui-tag> 会透传到原生 <ui-tag>&lt;button disabled&gt;</ui-tag>，并且组件内部会阻止 click
                        emit（符合最佳实践）。
                    </p>
                </div>

                <div class="flex flex-wrap gap-3 mb-4">
                    <ui-button @click="onDemoClick">可点击</ui-button>
                    <ui-button disabled @click="onDemoClick">禁用（不触发）</ui-button>
                    <ui-button variant="primary" disabled>主要按钮禁用</ui-button>
                </div>

                <div class="text-sm text-[var(--muted-foreground)] mb-4">
                    最近一次点击：<span class="font-medium text-[var(--foreground)]">{{ lastClickText }}</span>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeDisabled" />
            </ui-card>

            <!-- =========================
                模块：表单提交（nativeType=submit）
            ========================== -->
            <ui-card class="p-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">表单场景（推荐）</h2>
                    <p class="text-gray-600 mt-1">
                        在表单内请优先用 <ui-tag>nativeType="submit"</ui-tag> 触发表单提交（而不是在按钮 click 里手动调用提交逻辑）。
                    </p>
                </div>

                <form class="grid gap-4 max-w-md" @submit.prevent="onSubmit">
                    <div class="flex items-center gap-3">
                        <ui-button variant="primary" nativeType="submit">提交</ui-button>
                        <ui-button variant="blank" nativeType="reset" @click="onReset">重置</ui-button>
                    </div>
                </form>

                <div class="mt-4 text-sm text-[var(--muted-foreground)]">
                    提交结果：<span class="font-medium text-[var(--foreground)]">{{ submitText }}</span>
                </div>

                <div class="mt-4">
                    <ui-code-block title="示例代码" language="vue" :code="codeForm" />
                </div>
            </ui-card>
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * ButtonComponents
 *
 * 页面目标：
 * - 只聚焦一个组件（ui-button），用“示例 + 可复制代码”的方式讲清楚推荐用法
 * - 每个示例块尽量做到：展示效果、说明要点、给出最小可复用代码
 */
import { ref } from 'vue'
import uiCard from '@/components/ui/ui-card.vue'
import uiButton from '@/components/ui/ui-button.vue'
import uiCodeBlock from '@/components/ui/ui-code-block.vue'
import UiTag from '@/components/ui/ui-tag.vue'
import { SettingsIcon, ShareIcon, LogOutIcon } from '@/components/icons'

// =========================
// 交互示例：点击回显
// =========================
const lastClickText = ref('无')
const onDemoClick = () => {
    lastClickText.value = `点击于 ${new Date().toLocaleTimeString()}`
}

// =========================
// 表单示例：submit / reset
// =========================
const form = ref({ username: '' })
const submitText = ref('未提交')

const onSubmit = () => {
    submitText.value = form.value.username ? `提交成功：${form.value.username}` : '提交成功：未填写用户名'
}

const onReset = () => {
    form.value.username = ''
    submitText.value = '已重置'
}

// =========================
// 代码示例（保持最小、可直接复制）
// =========================
const codeVariant = `<template>
    <ui-button>默认按钮</ui-button>
    <ui-button variant="primary">主要按钮</ui-button>
    <ui-button variant="blank">空白按钮</ui-button>
<\/template>`

const codeTheme = `<template>
    <ui-button variant="station">Station</ui-button>
    <ui-button variant="danger">Danger</ui-button>
    <ui-button variant="station" size="small">Small Station</ui-button>
    <ui-button variant="danger" size="small">Small Danger</ui-button>
<\/template>`

const codeSize = `<template>
    <ui-button size="small">Small</ui-button>
    <ui-button>Medium</ui-button>
    <ui-button size="large">Large</ui-button>
<\/template>`

const codeIcon = `<template>
    <ui-button>
        <template #icon>
            <SettingsIcon size="16" />
        </template>
        设置
    </ui-button>

    <!-- 仅图标按钮：不提供 default slot 即可 -->
    <ui-button :title="'设置（仅图标）'">
        <template #icon>
            <SettingsIcon size="16" />
        </template>
    </ui-button>
<\/template>`

const codeDisabled = `<template>
    <ui-button @click="onClick">可点击</ui-button>
    <ui-button disabled @click="onClick">禁用（不触发）</ui-button>
<\/template>

<script setup lang="ts">
const onClick = () => console.log('clicked')
<\/script>`

const codeForm = `<template>
    <form @submit.prevent="onSubmit">
        <ui-button variant="primary" nativeType="submit">提交</ui-button>
        <ui-button variant="blank" nativeType="reset" @click="onReset">重置</ui-button>
    </form>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const username = ref('')
const onSubmit = () => console.log('submit', username.value)
const onReset = () => (username.value = '')
<\/script>`
</script>

<style scoped lang="less">
.button-components-container {
    background-color: var(--background);
}

.h-title {
    color: var(--foreground);
}
</style>
