<template>
    <div class="code-block-components-container h-full w-full p-6 overflow-auto">
        <div class="max-w-6xl mx-auto">
            <h1 class="h-title text-3xl font-bold mb-2">代码块组件</h1>
            <p class="text-sm text-[var(--muted-foreground)] mb-6">
                这里聚焦展示 <ui-tag-button>ui-code-block</ui-tag-button> 的常用能力与推荐用法（语言高亮、复制、标题、主题切换）。
            </p>

            <!-- =========================
                模块：基础用法（language + code）
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">基础用法</h2>
                    <p class="text-gray-600 mt-1">
                        通过 <ui-tag-button>language</ui-tag-button> 指定语言，通过 <ui-tag-button>code</ui-tag-button> 传入代码文本。
                    </p>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeVueSnippet" />

                <div class="mt-4">
                    <ui-code-block title="示例代码（bash）" language="bash" :code="codeBashSnippet" />
                </div>

                <div class="mt-4">
                    <ui-code-block title="示例代码（纯文本兜底）" language="unknown_lang" :code="codePlainSnippet" />
                </div>

                <div class="mt-4">
                    <ui-code-block title="可复制最小示例" language="vue" :code="codeBasic" />
                </div>
            </ui-card>

            <!-- =========================
                模块：复制按钮控制（showCopy）
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">复制按钮控制</h2>
                    <p class="text-gray-600 mt-1">使用 <ui-tag-button>showCopy</ui-tag-button> 控制是否展示复制按钮（例如：只读展示场景）。</p>
                </div>

                <ui-code-block title="不展示复制按钮" language="json" :code="codeJsonSnippet" :show-copy="false" />

                <div class="mt-4">
                    <ui-code-block title="可复制最小示例" language="vue" :code="codeShowCopy" />
                </div>
            </ui-card>

            <!-- =========================
                模块：主题（theme=auto/显式）
            ========================== -->
            <ui-card class="p-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">主题</h2>
                    <p class="text-gray-600 mt-1">
                        默认 <ui-tag-button>theme="auto"</ui-tag-button>：会根据 <ui-tag-button>html.dark</ui-tag-button> 或系统主题自动切换。
                        也可显式指定 Shiki 主题。
                    </p>
                </div>

                <div class="grid gap-4">
                    <ui-code-block title="自动主题（auto）" language="ts" :code="codeTsSnippet" theme="auto" />
                    <ui-code-block title="显式主题：one-dark-pro" language="ts" :code="codeTsSnippet" theme="one-dark-pro" />
                    <ui-code-block title="显式主题：one-light" language="ts" :code="codeTsSnippet" theme="one-light" />
                </div>

                <div class="mt-4">
                    <ui-code-block title="可复制最小示例" language="vue" :code="codeTheme" />
                </div>
            </ui-card>
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * CodeBlockComponents
 *
 * 页面目标：
 * - 覆盖 ui-code-block 的核心能力：语法高亮、复制、标题、主题
 * - 示例中 ui-tag-button 仅用于说明文字里的 token
 */
import uiCard from '@/components/ui/ui-card.vue'
import uiCodeBlock from '@/components/ui/ui-code-block.vue'
import UiTagButton from '@/components/ui/ui-tag-button.vue'

// 展示用：更贴近实际的片段（tab=4）
const codeVueSnippet = `<template>
    <ui-button variant="primary">提交</ui-button>
<\/template>

<script setup lang="ts">
import uiButton from '@/components/ui/ui-button.vue'
<\/script>`

const codeBashSnippet = `npm run dev
npm run build`

const codePlainSnippet = `这里是未知语言：ui-code-block 会回退为纯文本输出。`

const codeJsonSnippet = `{
    "name": "SimpleTemplate",
    "private": true
}`

const codeTsSnippet = `export type User = {
    id: number
    name: string
}

export const hello = (u: User) => \`hi, \${u.name}\``

// =========================
// 可复制最小示例（tab=4：统一 4 空格缩进）
// =========================
const codeBasic = `<template>
    <ui-code-block title="示例代码" language="vue" :code="code" />
<\/template>

<script setup lang="ts">
import uiCodeBlock from '@/components/ui/ui-code-block.vue'
const code = '<div>Hello</div>'
<\/script>`

const codeShowCopy = `<template>
    <ui-code-block :show-copy="false" language="json" :code="code" />
<\/template>`

const codeTheme = `<template>
    <ui-code-block theme="auto" language="ts" :code="code" />
    <ui-code-block theme="one-dark-pro" language="ts" :code="code" />
<\/template>`
</script>

<style scoped lang="less">
.code-block-components-container {
    background-color: var(--background);
}

.h-title {
    color: var(--foreground);
}
</style>
