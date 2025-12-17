<template>
    <div class="select-components-container h-full w-full p-6 overflow-auto">
        <div class="max-w-6xl mx-auto">
            <h1 class="h-title text-3xl font-bold mb-2">下拉菜单组件</h1>
            <p class="text-sm text-[var(--muted-foreground)] mb-6">
                这里聚焦展示 <ui-tag>ui-select</ui-tag> 的常用能力与推荐用法（字符串数组 / 对象数组 / 自定义渲染 / 带图标选项 / 禁用态）。
            </p>

            <!-- =========================
                模块：基础用法
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">基础用法</h2>
                    <p class="text-gray-600 mt-1">使用 <ui-tag>v-model</ui-tag> 绑定选中值；options 支持 <ui-tag>string/number</ui-tag>。</p>
                </div>

                <div class="flex flex-wrap gap-4 mb-4">
                    <div class="w-64">
                        <ui-select v-model="selectValue1" :options="simpleOptions" placeholder="请选择" />
                        <div class="text-sm text-gray-600 mt-2">选中值: {{ selectValue1 || '无' }}</div>
                    </div>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeBasic" />
            </ui-card>

            <!-- =========================
                模块：对象数组
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">对象数组</h2>
                    <p class="text-gray-600 mt-1">
                        当 options 是对象数组时，使用 <ui-tag>optionLabel</ui-tag> / <ui-tag>optionValue</ui-tag> 显式声明字段。
                    </p>
                </div>

                <div class="flex flex-wrap gap-4 mb-4">
                    <div class="w-64">
                        <ui-select v-model="selectValue2" :options="userOptions" option-label="name" option-value="id" placeholder="选择用户" />
                        <div class="text-sm text-gray-600 mt-2">选中ID: {{ selectValue2 || '无' }}</div>
                    </div>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeObjectOptions" />
            </ui-card>

            <!-- =========================
                模块：自定义选项渲染
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">自定义选项渲染</h2>
                    <p class="text-gray-600 mt-1">
                        使用 <ui-tag>#option</ui-tag> 自定义下拉项展示；需要更强类型提示时，可在模板中将 option 断言为具体类型。
                    </p>
                </div>

                <div class="flex flex-wrap gap-4 mb-4">
                    <div class="w-70">
                        <ui-select v-model="selectValue3" :options="userOptions" option-label="name" option-value="id" placeholder="选择用户">
                            <template #option="{ option, selected }">
                                <div class="flex items-center justify-between" :class="{ 'font-semibold': selected }">
                                    <div class="font-medium">{{ (option as unknown as UserOption).name }}</div>
                                </div>
                            </template>
                        </ui-select>
                        <div class="text-sm text-gray-600 mt-2">选中用户: {{ getSelectedUserName(selectValue3) || '无' }}</div>
                    </div>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeCustomOption" />
            </ui-card>

            <!-- =========================
                模块：带图标的选项
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">带图标的选项</h2>
                    <p class="text-gray-600 mt-1">通过 <ui-tag>#selected</ui-tag> / <ui-tag>#option</ui-tag> 自定义展示图标与文案。</p>
                </div>

                <div class="flex flex-wrap gap-4 mb-4">
                    <div class="w-64">
                        <ui-select v-model="selectValueIcon" :options="iconOptions" option-label="label" option-value="value" placeholder="选择项目">
                            <template #selected="{ option }">
                                <div class="flex items-center gap-2">
                                    <component :is="(option as unknown as IconOption).icon" class="w-4 h-4" />
                                    <span>{{ (option as unknown as IconOption).label }}</span>
                                </div>
                            </template>
                            <template #option="{ option, selected }">
                                <div class="flex items-center gap-2" :class="{ 'font-semibold': selected }">
                                    <component :is="(option as unknown as IconOption).icon" class="w-4 h-4" />
                                    <span>{{ (option as unknown as IconOption).label }}</span>
                                </div>
                            </template>
                        </ui-select>
                        <div class="text-sm text-gray-600 mt-2">选中项目: {{ selectValueIcon || '无' }}</div>
                    </div>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeIconOptions" />
            </ui-card>

            <!-- =========================
                模块：禁用状态
            ========================== -->
            <ui-card class="p-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">禁用状态</h2>
                    <p class="text-gray-600 mt-1">使用 <ui-tag>disabled</ui-tag> 禁用交互。</p>
                </div>

                <div class="flex flex-wrap gap-4 mb-4">
                    <div class="w-64">
                        <ui-select v-model="selectValue4" :options="simpleOptions" placeholder="请选择" disabled />
                    </div>
                    <div class="w-64">
                        <ui-select :model-value="'选项2'" :options="simpleOptions" placeholder="请选择" disabled />
                    </div>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeDisabled" />
            </ui-card>
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * SelectComponents（下拉菜单组件示例页）
 *
 * 页面目标：
 * - 展示 Select 组件的多种用法：基础用法 / 对象数组 / 自定义渲染 / 图标选项 / 禁用态
 * - 示例中"交互动作"统一使用 ui-button；ui-tag 仅用于说明文字里的 token
 */
import { markRaw, ref, type Component } from 'vue'
import uiCard from '@/components/ui/ui-card.vue'
import uiSelect from '@/components/ui/ui-select.vue'
import uiCodeBlock from '@/components/ui/ui-code-block.vue'
import UiTag from '@/components/ui/ui-tag.vue'
import { HomeIcon, DashboardIcon } from '@/components/icons'

// =========================
// 数据源
// =========================
const selectValue1 = ref<string | number | null>(null)
const selectValue2 = ref<string | number | null>(null)
const selectValue3 = ref<string | number | null>(null)
const selectValue4 = ref<string | number | null>(null)
const selectValueIcon = ref<string | number | null>(null)

// 简单数据源：字符串数组（保持可变数组类型，匹配 ui-select props）
const simpleOptions: string[] = ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7', '选项8', '选项9', '选项10']

interface UserOption extends Record<string, unknown> {
    id: number
    name: string
    email?: string
    role?: string
}
const userOptions: UserOption[] = [
    { id: 1, name: '张三', email: 'zhang@example.com', role: '管理员' },
    { id: 2, name: '李四', email: 'li@example.com', role: '用户' },
    { id: 3, name: '王五', email: 'wang@example.com', role: '用户' },
    { id: 4, name: '赵六', email: 'zhao@example.com', role: '编辑' },
]

interface IconOption {
    label: string
    value: string
    icon: Component
    [key: string]: unknown
}
const iconOptions: IconOption[] = [
    { label: 'Simple Home', value: '/simple-home', icon: markRaw(HomeIcon) },
    { label: 'Simple Template', value: '/home', icon: markRaw(DashboardIcon) },
]

// 辅助方法：根据 id 找用户名称（用于示例回显）
const getSelectedUserName = (id: string | number | null): string | null => {
    if (id === null) return null
    const user = userOptions.find(u => u.id === id)
    return user ? user.name : null
}

// =========================
// 代码示例（tab=4：统一 4 空格缩进）
// =========================
const codeBasic = `<template>
    <ui-select v-model="value" :options="options" placeholder="请选择" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref<string | number | null>(null)
const options = ['选项1', '选项2', '选项3']
<\/script>`

const codeObjectOptions = `<template>
    <ui-select
        v-model="selectedId"
        :options="users"
        option-label="name"
        option-value="id"
        placeholder="选择用户"
    />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const users = [
    { id: 1, name: '张三' },
    { id: 2, name: '李四' },
]
const selectedId = ref<string | number | null>(null)
<\/script>`

const codeCustomOption = `<template>
    <ui-select v-model="selectedId" :options="users" option-label="name" option-value="id">
        <template #option="{ option, selected }">
            <div :class="{ 'font-semibold': selected }">
                {{ (option as unknown as UserOption).name }}
            </div>
        </template>
    </ui-select>
<\/template>`

const codeIconOptions = `<template>
    <ui-select v-model="value" :options="options" option-label="label" option-value="value">
        <template #selected="{ option }">
            <div class="flex items-center gap-2">
                <component :is="(option as unknown as IconOption).icon" class="w-4 h-4" />
                <span>{{ (option as unknown as IconOption).label }}</span>
            </div>
        </template>
        <template #option="{ option, selected }">
            <div class="flex items-center gap-2" :class="{ 'font-semibold': selected }">
                <component :is="(option as unknown as IconOption).icon" class="w-4 h-4" />
                <span>{{ (option as unknown as IconOption).label }}</span>
            </div>
        </template>
    </ui-select>
<\/template>`

const codeDisabled = `<template>
    <ui-select v-model="value" :options="options" disabled />
    <ui-select :model-value="'选项2'" :options="options" disabled />
<\/template>`
</script>

<style scoped lang="less">
.select-components-container {
    background-color: var(--background);
}

.h-title {
    color: var(--foreground);
}
</style>
