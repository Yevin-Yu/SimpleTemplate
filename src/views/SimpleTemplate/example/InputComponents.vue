<template>
    <div class="input-components-container h-full w-full p-6 overflow-auto">
        <div class="max-w-6xl mx-auto">
            <h1 class="h-title text-3xl font-bold mb-2">输入框组件</h1>
            <p class="text-sm text-[var(--muted-foreground)] mb-6">
                这里聚焦展示 <ui-tag>ui-input</ui-tag> 的常用能力与推荐用法，并提供可复制的代码示例。
            </p>

            <!-- =========================
                模块：基础用法
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">基础用法</h2>
                    <p class="text-gray-600 mt-1">使用 <ui-tag>v-model</ui-tag> 绑定值，通过 <ui-tag>placeholder</ui-tag> 设置占位文本。</p>
                </div>

                <div class="flex flex-wrap gap-4 mb-4">
                    <div class="w-64">
                        <ui-input v-model="basicValue" placeholder="请输入内容" />
                        <div class="text-sm text-gray-600 mt-2">当前值: {{ basicValue || '空' }}</div>
                    </div>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeBasic" />
            </ui-card>

            <!-- =========================
                模块：尺寸
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">尺寸</h2>
                    <p class="text-gray-600 mt-1">通过 <ui-tag>size</ui-tag> 设置不同的尺寸（small: 32px / medium: 36px / large: 42px）。</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">Small (32px)</label>
                        <ui-input v-model="sizeSmall" placeholder="小尺寸" size="small" />
                    </div>
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">Medium (36px)</label>
                        <ui-input v-model="sizeMedium" placeholder="中等尺寸" size="medium" />
                    </div>
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">Large (42px)</label>
                        <ui-input v-model="sizeLarge" placeholder="大尺寸" size="large" />
                    </div>
                </div>

                <div class="mb-4">
                    <p class="text-sm text-[var(--muted-foreground)] mb-2">尺寸对比（带图标）：</p>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <ui-input v-model="sizeSmallWithIcon" placeholder="小尺寸" size="small">
                            <template #prefix>
                                <HomeIcon size="16" />
                            </template>
                        </ui-input>
                        <ui-input v-model="sizeMediumWithIcon" placeholder="中等尺寸" size="medium">
                            <template #prefix>
                                <HomeIcon size="16" />
                            </template>
                        </ui-input>
                        <ui-input v-model="sizeLargeWithIcon" placeholder="大尺寸" size="large">
                            <template #prefix>
                                <HomeIcon size="16" />
                            </template>
                        </ui-input>
                    </div>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeSize" />
            </ui-card>

            <!-- =========================
                模块：输入类型
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">输入类型</h2>
                    <p class="text-gray-600 mt-1">
                        通过 <ui-tag>type</ui-tag> 设置不同的输入类型（text / email / number / tel / url / search / password）。
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">文本</label>
                        <ui-input v-model="typeText" type="text" placeholder="请输入文本" />
                    </div>
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">邮箱</label>
                        <ui-input v-model="typeEmail" type="email" placeholder="请输入邮箱" />
                    </div>
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">数字</label>
                        <ui-input v-model="typeNumber" type="number" placeholder="请输入数字" />
                    </div>
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">电话</label>
                        <ui-input v-model="typeTel" type="tel" placeholder="请输入电话" />
                    </div>
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">URL</label>
                        <ui-input v-model="typeUrl" type="url" placeholder="请输入URL" />
                    </div>
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">搜索</label>
                        <ui-input v-model="typeSearch" type="search" placeholder="请输入搜索关键词" />
                    </div>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeType" />
            </ui-card>

            <!-- =========================
                模块：前置/后置插槽
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">前置/后置插槽</h2>
                    <p class="text-gray-600 mt-1">使用 <ui-tag>#prefix</ui-tag> 和 <ui-tag>#suffix</ui-tag> 插槽添加前置或后置内容（如图标）。</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">前置图标</label>
                        <ui-input v-model="prefixValue" placeholder="请输入用户名">
                            <template #prefix>
                                <HomeIcon size="16" />
                            </template>
                        </ui-input>
                    </div>
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">后置图标</label>
                        <ui-input v-model="suffixValue" placeholder="请输入内容">
                            <template #suffix>
                                <SettingsIcon size="16" />
                            </template>
                        </ui-input>
                    </div>
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">前后都有</label>
                        <ui-input v-model="bothValue" placeholder="请输入内容">
                            <template #prefix>
                                <HomeIcon size="16" />
                            </template>
                            <template #suffix>
                                <SettingsIcon size="16" />
                            </template>
                        </ui-input>
                    </div>
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">不同尺寸的图标输入框</label>
                        <div class="flex flex-col gap-2">
                            <ui-input v-model="prefixValue" placeholder="small (32px)" size="small">
                                <template #prefix>
                                    <HomeIcon size="16" />
                                </template>
                            </ui-input>
                            <ui-input v-model="prefixValue" placeholder="medium (36px)" size="medium">
                                <template #prefix>
                                    <HomeIcon size="16" />
                                </template>
                            </ui-input>
                            <ui-input v-model="prefixValue" placeholder="large (42px)" size="large">
                                <template #prefix>
                                    <HomeIcon size="16" />
                                </template>
                            </ui-input>
                        </div>
                    </div>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeSlot" />
            </ui-card>

            <!-- =========================
                模块：清除按钮
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">清除按钮</h2>
                    <p class="text-gray-600 mt-1">
                        设置 <ui-tag>clearable</ui-tag> 为 <ui-tag>true</ui-tag> 时，有值且非禁用/只读状态下会显示清除按钮。
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">可清除</label>
                        <ui-input v-model="clearableValue" placeholder="输入后显示清除按钮" clearable />
                        <div class="text-sm text-gray-600 mt-2">当前值: {{ clearableValue || '空' }}</div>
                    </div>
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">清除按钮 + 前置图标</label>
                        <ui-input v-model="clearableWithPrefix" placeholder="输入后显示清除按钮" clearable>
                            <template #prefix>
                                <HomeIcon size="16" />
                            </template>
                        </ui-input>
                    </div>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeClearable" />
            </ui-card>

            <!-- =========================
                模块：禁用与只读
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">禁用与只读</h2>
                    <p class="text-gray-600 mt-1">使用 <ui-tag>disabled</ui-tag> 禁用输入，使用 <ui-tag>readonly</ui-tag> 设置为只读。</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">禁用</label>
                        <ui-input v-model="disabledValue" placeholder="禁用状态" disabled />
                    </div>
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">只读</label>
                        <ui-input v-model="readonlyValue" placeholder="只读状态" readonly />
                    </div>
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">禁用（有值）</label>
                        <ui-input :model-value="'已禁用的值'" placeholder="禁用状态" disabled />
                    </div>
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">只读（有值）</label>
                        <ui-input :model-value="'只读的值'" placeholder="只读状态" readonly />
                    </div>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeDisabled" />
            </ui-card>

            <!-- =========================
                模块：错误状态
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">错误状态</h2>
                    <p class="text-gray-600 mt-1">通过 <ui-tag>error</ui-tag> 属性设置错误信息，输入框会显示错误样式并在下方显示错误文本。</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">错误提示</label>
                        <ui-input v-model="errorValue" placeholder="请输入内容" error="请输入有效的内容" />
                    </div>
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">错误提示（有值）</label>
                        <ui-input :model-value="'无效的值'" error="此值不符合要求" />
                    </div>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeError" />
            </ui-card>

            <!-- =========================
                模块：最大长度
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">最大长度</h2>
                    <p class="text-gray-600 mt-1">使用 <ui-tag>maxlength</ui-tag> 限制输入的最大字符数。</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">最大长度 10</label>
                        <ui-input v-model="maxlengthValue" placeholder="最多输入10个字符" :maxlength="10" />
                        <div class="text-sm text-gray-600 mt-2">当前长度: {{ maxlengthValue.length }}/10</div>
                    </div>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeMaxlength" />
            </ui-card>

            <!-- =========================
                模块：事件处理
            ========================== -->
            <ui-card class="p-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">事件处理</h2>
                    <p class="text-gray-600 mt-1">
                        组件支持 <ui-tag>focus</ui-tag>、<ui-tag>blur</ui-tag>、<ui-tag>enter</ui-tag>、<ui-tag>clear</ui-tag> 等事件。
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-sm text-gray-600 mb-2">事件示例</label>
                        <ui-input
                            v-model="eventValue"
                            placeholder="输入后按 Enter 或点击清除按钮"
                            clearable
                            @focus="onFocus"
                            @blur="onBlur"
                            @enter="onEnter"
                            @clear="onClear"
                        />
                    </div>
                </div>

                <div class="text-sm text-[var(--muted-foreground)] mb-4">
                    <div>
                        最近事件：<span class="font-medium text-[var(--foreground)]">{{ lastEvent }}</span>
                    </div>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeEvent" />
            </ui-card>
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * InputComponents（输入框组件示例页）
 *
 * 页面目标：
 * - 展示 Input 组件的多种用法：基础用法 / 输入类型 / 插槽 / 清除按钮 / 禁用只读 / 错误状态 / 最大长度 / 事件处理
 */
import { ref } from 'vue'
import uiCard from '@/components/ui/ui-card.vue'
import uiInput from '@/components/ui/ui-input.vue'
import uiCodeBlock from '@/components/ui/ui-code-block.vue'
import UiTag from '@/components/ui/ui-tag.vue'
import { HomeIcon, SettingsIcon } from '@/components/icons'

// =========================
// 数据源
// =========================
const basicValue = ref('')
const sizeSmall = ref('')
const sizeMedium = ref('')
const sizeLarge = ref('')
const sizeSmallWithIcon = ref('')
const sizeMediumWithIcon = ref('')
const sizeLargeWithIcon = ref('')
const typeText = ref('')
const typeEmail = ref('')
const typeNumber = ref('')
const typeTel = ref('')
const typeUrl = ref('')
const typeSearch = ref('')
const prefixValue = ref('')
const suffixValue = ref('')
const bothValue = ref('')
const clearableValue = ref('')
const clearableWithPrefix = ref('')
const disabledValue = ref('')
const readonlyValue = ref('')
const errorValue = ref('')
const maxlengthValue = ref('')
const eventValue = ref('')
const lastEvent = ref('无')

// =========================
// 事件处理
// =========================
const onFocus = () => {
    lastEvent.value = `获得焦点于 ${new Date().toLocaleTimeString()}`
}

const onBlur = () => {
    lastEvent.value = `失去焦点于 ${new Date().toLocaleTimeString()}`
}

const onEnter = () => {
    lastEvent.value = `按下 Enter 于 ${new Date().toLocaleTimeString()}，当前值: ${eventValue.value}`
}

const onClear = () => {
    lastEvent.value = `清除于 ${new Date().toLocaleTimeString()}`
}

// =========================
// 代码示例
// =========================
const codeBasic = `<template>
    <ui-input v-model="value" placeholder="请输入内容" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
<\/script>`

const codeSize = `<template>
    <!-- 基础尺寸 -->
    <ui-input v-model="value" placeholder="小尺寸 (32px)" size="small" />
    <ui-input v-model="value" placeholder="中等尺寸 (36px)" size="medium" />
    <ui-input v-model="value" placeholder="大尺寸 (42px)" size="large" />

    <!-- 带图标的尺寸 -->
    <ui-input v-model="value" placeholder="小尺寸" size="small">
        <template #prefix>
            <HomeIcon size="16" />
        </template>
    </ui-input>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
<\/script>`

const codeType = `<template>
    <ui-input v-model="email" type="email" placeholder="请输入邮箱" />
    <ui-input v-model="number" type="number" placeholder="请输入数字" />
    <ui-input v-model="tel" type="tel" placeholder="请输入电话" />
<\/template>`

const codeSlot = `<template>
    <ui-input v-model="value" placeholder="请输入用户名">
        <template #prefix>
            <HomeIcon size="16" />
        </template>
    </ui-input>

    <ui-input v-model="value" placeholder="请输入内容">
        <template #suffix>
            <SettingsIcon size="16" />
        </template>
    </ui-input>
<\/template>`

const codeClearable = `<template>
    <ui-input v-model="value" placeholder="输入后显示清除按钮" clearable />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
<\/script>`

const codeDisabled = `<template>
    <ui-input v-model="value" placeholder="禁用状态" disabled />
    <ui-input v-model="value" placeholder="只读状态" readonly />
<\/template>`

const codeError = `<template>
    <ui-input v-model="value" placeholder="请输入内容" error="请输入有效的内容" />
<\/template>`

const codeMaxlength = `<template>
    <ui-input v-model="value" placeholder="最多输入10个字符" :maxlength="10" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
<\/script>`

const codeEvent = `<template>
    <ui-input
        v-model="value"
        placeholder="输入后按 Enter 或点击清除按钮"
        clearable
        @focus="onFocus"
        @blur="onBlur"
        @enter="onEnter"
        @clear="onClear"
    />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const onFocus = () => console.log('focus')
const onBlur = () => console.log('blur')
const onEnter = () => console.log('enter', value.value)
const onClear = () => console.log('clear')
<\/script>`
</script>

<style scoped lang="less">
.input-components-container {
    background-color: var(--background);
}

.h-title {
    color: var(--foreground);
}
</style>
