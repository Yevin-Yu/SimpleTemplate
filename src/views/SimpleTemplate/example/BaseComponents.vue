<template>
    <div class="base-components-container h-full w-full p-6 overflow-auto">
        <div class="max-w-6xl mx-auto">
            <h1 class="h-title text-3xl font-bold mb-6">基础组件</h1>

            <!-- =========================
                模块：Button（按钮）
            ========================== -->
            <ui-card class="p-6 mb-6">
                <h2 class="h-title text-2xl font-semibold mb-4">按钮组件 (Button)</h2>
                <p class="text-gray-600 mb-6">按钮用于触发操作，支持多种样式和图标。</p>

                <div class="space-y-6">
                    <div>
                        <h3 class="h-title text-lg font-medium mb-3">基础用法</h3>
                        <div class="flex flex-wrap gap-3">
                            <ui-button>默认按钮</ui-button>
                            <ui-button variant="primary">主要按钮</ui-button>
                            <ui-button variant="blank">空白按钮</ui-button>
                        </div>
                    </div>

                    <div>
                        <h3 class="h-title text-lg font-medium mb-3">带图标的按钮</h3>
                        <div class="flex flex-wrap gap-3">
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
                    </div>

                    <div>
                        <h3 class="h-title text-lg font-medium mb-3">仅图标按钮</h3>
                        <div class="flex flex-wrap gap-3">
                            <ui-button>
                                <template #icon>
                                    <SettingsIcon size="16" />
                                </template>
                            </ui-button>
                            <ui-button variant="primary">
                                <template #icon>
                                    <ShareIcon size="16" />
                                </template>
                            </ui-button>
                            <ui-button variant="blank">
                                <template #icon>
                                    <LogOutIcon size="16" />
                                </template>
                            </ui-button>
                        </div>
                    </div>

                    <div>
                        <h3 class="h-title text-lg font-medium mb-3">按钮状态</h3>
                        <div class="flex flex-wrap gap-3">
                            <ui-button @click="handleClick">可点击</ui-button>
                            <ui-button variant="blank" disabled>禁用状态</ui-button>
                            <ui-button variant="primary" @click="handleClick">主要按钮</ui-button>
                        </div>
                    </div>
                </div>
            </ui-card>

            <!-- =========================
                模块：Card（卡片）
            ========================== -->
            <ui-card class="p-6 mb-6">
                <h2 class="h-title text-2xl font-semibold mb-4">卡片组件 (Card)</h2>
                <p class="text-gray-600 mb-6">卡片用于展示内容和操作，提供清晰的视觉层次。</p>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <ui-card class="p-4 hover:shadow-lg transition-shadow">
                        <h3 class="h-title font-semibold mb-2">基础卡片</h3>
                        <p class="text-sm text-gray-600">这是一个基础卡片示例，可以包含任何内容。</p>
                    </ui-card>

                    <ui-card class="p-4 hover:shadow-lg transition-shadow">
                        <h3 class="h-title font-semibold mb-2">带操作卡片</h3>
                        <p class="text-sm text-gray-600 mb-3">卡片可以包含操作按钮。</p>
                        <ui-button variant="primary" size="small">查看详情</ui-button>
                    </ui-card>

                    <ui-card variant="light" class="p-4 hover:shadow-lg transition-shadow">
                        <h3 class="h-title font-semibold mb-2">浅色阴影</h3>
                        <div class="text-2xl font-bold text-blue-600 mb-1">1,234</div>
                        <div class="text-xs text-gray-500">总访问量</div>
                    </ui-card>
                </div>
            </ui-card>

            <!-- =========================
                模块：Select（下拉选择）
                - 展示字符串数组 / 对象数组 / 自定义渲染 / 图标选项 / 禁用态
            ========================== -->
            <ui-card class="p-6 mb-6">
                <h2 class="h-title text-2xl font-semibold mb-4">下拉菜单组件 (Select)</h2>
                <p class="text-gray-600 mb-6">下拉菜单用于从多个选项中选择一个值，支持键盘导航和自定义渲染。</p>

                <div class="space-y-6">
                    <div>
                        <h3 class="h-title text-lg font-medium mb-3">基础用法</h3>
                        <div class="flex flex-wrap gap-4">
                            <div class="w-64">
                                <ui-select v-model="selectValue1" :options="simpleOptions" placeholder="请选择" />
                                <div class="text-sm text-gray-600 mt-2">选中值: {{ selectValue1 || '无' }}</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 class="h-title text-lg font-medium mb-3">对象数组</h3>
                        <div class="flex flex-wrap gap-4">
                            <div class="w-64">
                                <ui-select
                                    v-model="selectValue2"
                                    :options="userOptions"
                                    option-label="name"
                                    option-value="id"
                                    placeholder="选择用户"
                                />
                                <div class="text-sm text-gray-600 mt-2">选中ID: {{ selectValue2 || '无' }}</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 class="h-title text-lg font-medium mb-3">自定义选项渲染</h3>
                        <div class="flex flex-wrap gap-4">
                            <div class="w-70">
                                <ui-select v-model="selectValue3" :options="userOptions" option-label="name" option-value="id" placeholder="选择用户">
                                    <template #option="{ option, selected }">
                                        <div class="flex items-center justify-between" :class="{ 'font-semibold': selected }">
                                            <div>
                                                <!-- 图标  -->
                                                <div class="font-medium">{{ (option as unknown as UserOption).name }}</div>
                                            </div>
                                        </div>
                                    </template>
                                </ui-select>
                                <div class="text-sm text-gray-600 mt-2">选中用户: {{ getSelectedUserName(selectValue3) || '无' }}</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 class="h-title text-lg font-medium mb-3">带图标的选项</h3>
                        <div class="flex flex-wrap gap-4">
                            <div class="w-64">
                                <ui-select
                                    v-model="selectValueIcon"
                                    :options="iconOptions"
                                    option-label="label"
                                    option-value="value"
                                    placeholder="选择项目"
                                >
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
                    </div>

                    <div>
                        <h3 class="h-title text-lg font-medium mb-3">禁用状态</h3>
                        <div class="flex flex-wrap gap-4">
                            <div class="w-64">
                                <ui-select v-model="selectValue4" :options="simpleOptions" placeholder="请选择" disabled />
                            </div>
                            <div class="w-64">
                                <ui-select :model-value="'选项2'" :options="simpleOptions" placeholder="请选择" disabled />
                            </div>
                        </div>
                    </div>
                </div>
            </ui-card>

            <!-- =========================
                模块：Context Menu（右键菜单）
                - 页面只挂载一个菜单实例
                - 不同触发源（按钮/列表）传不同 items
            ========================== -->
            <ui-card class="p-6 mb-6">
                <h2 class="h-title text-2xl font-semibold mb-4">右键菜单组件 (Context Menu)</h2>
                <p class="text-gray-600 mb-6">页面只挂载一个菜单实例，右键时动态传入不同 items。</p>

                <div class="space-y-3">
                    <ui-button class="w-28" @contextmenu.prevent="onButtonContextMenu">右键按钮</ui-button>

                    <div class="grid gap-2">
                        <div v-for="row in demoRows" :key="row.id" class="context-row" @contextmenu.prevent="onRowContextMenu($event, row)">
                            <span class="font-medium text-[var(--foreground)]">{{ row.title }}</span>
                            <span class="text-xs text-[var(--muted-foreground)]">{{ row.meta }}</span>
                        </div>
                    </div>

                    <div class="text-xs text-[var(--muted-foreground)]">提示：右键打开 · Ctrl+C / F2 / Del · 点击外部或按 ESC 关闭</div>

                    <div class="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                        <span>最近操作</span>
                        <span class="context-badge">{{ lastContextAction || '无' }}</span>
                    </div>
                </div>
            </ui-card>

            <!-- 全局右键菜单渲染器：页面只需要放一次（通过 ref 调用 openWithEvent/openAt） -->
            <ui-context-menu ref="contextMenuRef" @select="handleContextSelect" />

            <!-- =========================
                模块：Switch（开关）
            ========================== -->
            <ui-card class="p-6 mb-6">
                <h2 class="h-title text-2xl font-semibold mb-4">开关组件 (Switch)</h2>
                <p class="text-gray-600 mb-6">开关用于切换两种状态，常用于设置和配置。</p>

                <div class="space-y-6">
                    <div>
                        <h3 class="h-title text-lg font-medium mb-3">基础用法</h3>
                        <div class="flex items-center gap-4">
                            <div class="flex items-center gap-2">
                                <ui-switch v-model="switchValue1" />
                                <span>基础开关</span>
                            </div>
                            <div class="text-sm text-gray-600">状态: {{ switchValue1 ? '开启' : '关闭' }}</div>
                        </div>
                    </div>

                    <div>
                        <h3 class="h-title text-lg font-medium mb-3">带自定义图标</h3>
                        <div class="flex items-center gap-4">
                            <div class="flex items-center gap-2">
                                <ui-switch v-model="switchValue2">
                                    <template #thumb-on>
                                        <SwitchOnIcon />
                                    </template>
                                    <template #thumb-off>
                                        <SwitchOffIcon />
                                    </template>
                                </ui-switch>
                                <span>自定义图标开关</span>
                            </div>
                            <div class="text-sm text-gray-600">状态: {{ switchValue2 ? '开启' : '关闭' }}</div>
                        </div>
                    </div>

                    <div>
                        <h3 class="h-title text-lg font-medium mb-3">禁用状态</h3>
                        <div class="flex items-center gap-4">
                            <div class="flex items-center gap-2">
                                <ui-switch v-model="switchValue3" disabled />
                                <span>禁用开关</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <ui-switch :model-value="true" disabled />
                                <span>禁用开关（开启）</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 class="h-titletext-lg font-medium mb-3">实际应用场景</h3>
                        <div class="space-y-3">
                            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <div class="font-medium">通知提醒</div>
                                    <div class="text-sm text-gray-600">接收系统通知</div>
                                </div>
                                <ui-switch v-model="notifications" />
                            </div>
                            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <div class="font-medium">自动保存</div>
                                    <div class="text-sm text-gray-600">编辑时自动保存</div>
                                </div>
                                <ui-switch v-model="autoSave" />
                            </div>
                            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <div class="font-medium">深色模式</div>
                                    <div class="text-sm text-gray-600">使用深色主题</div>
                                </div>
                                <ui-switch v-model="darkMode" />
                            </div>
                        </div>
                    </div>
                </div>
            </ui-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { markRaw, ref, type Component } from 'vue'
import uiCard from '@/components/ui/ui-card.vue'
import uiButton from '@/components/ui/ui-button.vue'
import uiSwitch from '@/components/ui/ui-switch.vue'
import uiSelect from '@/components/ui/ui-select.vue'
import uiContextMenu from '@/components/ui/ui-context-menu.vue'
import type { ContextMenuItem } from '@/components/ui/ui-context-menu.vue'
import {
    SettingsIcon,
    LogOutIcon,
    ShareIcon,
    SwitchOnIcon,
    SwitchOffIcon,
    HomeIcon,
    DashboardIcon,
    CopyIcon,
    EditIcon,
    TrashIcon,
} from '@/components/icons'

// =========================
// 模块：Button（按钮）
// =========================
const switchValue1 = ref(false)
const switchValue2 = ref(true)
const switchValue3 = ref(false)
const notifications = ref(true)
const autoSave = ref(false)
const darkMode = ref(false)

// =========================
// 模块：Select（下拉选择）
// =========================
const selectValue1 = ref<string | number | null>(null)
const selectValue2 = ref<string | number | null>(null)
const selectValue3 = ref<string | number | null>(null)
const selectValue4 = ref<string | number | null>(null)
const selectValueIcon = ref<string | number | null>(null)
// 简单数据源：字符串数组
const simpleOptions = ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7', '选项8', '选项9', '选项10']

interface UserOption extends Record<string, unknown> {
    id: number
    name: string
    email: string
    role: string
}

// 对象数组示例：用户
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
// 带图标选项示例
const iconOptions: IconOption[] = [
    { label: 'Simple Home', value: '/simple-home', icon: HomeIcon },
    { label: 'Simple Template', value: '/home', icon: DashboardIcon },
]

// =========================
// 模块：Context Menu（右键菜单）
// =========================
// 页面只挂载一个右键菜单实例，通过 ref 调用暴露的方法
const contextMenuRef = ref<InstanceType<typeof uiContextMenu> | null>(null)
// 最近一次菜单操作（用于示例回显）
const lastContextAction = ref<string>('')

// 基础菜单项：按钮右键使用（列表右键会根据行动态生成）
const baseContextMenuItems = (): ContextMenuItem[] => [
    {
        key: 'copy',
        label: '复制',
        shortcut: 'Ctrl+C',
        icon: markRaw(CopyIcon),
        onSelect: () => (lastContextAction.value = '复制'),
    },
    {
        key: 'rename',
        label: '重命名',
        shortcut: 'F2',
        icon: markRaw(EditIcon),
        onSelect: () => (lastContextAction.value = '重命名'),
    },
    { key: 'divider-1', type: 'divider' },
    {
        key: 'disabled',
        label: '禁用项',
        disabled: true,
        onSelect: () => (lastContextAction.value = '（不应触发）'),
    },
    {
        key: 'delete',
        label: '删除',
        variant: 'danger',
        shortcut: 'Del',
        icon: markRaw(TrashIcon),
        onSelect: () => (lastContextAction.value = '删除'),
    },
]

// 菜单 select 事件：统一兜底记录（即使某些 item 没写 onSelect 也能记录）
const handleContextSelect = (item: ContextMenuItem) => {
    if (item.label) lastContextAction.value = item.label
}

interface DemoRow {
    id: number
    title: string
    meta: string
}
// 列表数据：演示“每一项右键不同菜单”
const demoRows = ref<DemoRow[]>([
    { id: 1, title: 'README.md', meta: '文档' },
    { id: 2, title: 'src/views', meta: '页面目录' },
    { id: 3, title: 'package.json', meta: '依赖配置' },
])

// 右键按钮：打开基础菜单
const onButtonContextMenu = (e: MouseEvent) => {
    contextMenuRef.value?.openWithEvent(e, baseContextMenuItems())
}

// 右键列表行：根据当前行动态生成菜单项
const onRowContextMenu = (e: MouseEvent, row: DemoRow) => {
    const items: ContextMenuItem[] = [
        {
            key: `copy-${row.id}`,
            label: `复制「${row.title}」`,
            shortcut: 'Ctrl+C',
            icon: markRaw(CopyIcon),
            onSelect: () => (lastContextAction.value = `复制：${row.title}`),
        },
        {
            key: `rename-${row.id}`,
            label: `重命名「${row.title}」`,
            shortcut: 'F2',
            icon: markRaw(EditIcon),
            onSelect: () => (lastContextAction.value = `重命名：${row.title}`),
        },
        { key: `divider-${row.id}`, type: 'divider' },
        {
            key: `delete-${row.id}`,
            label: `删除「${row.title}」`,
            variant: 'danger',
            shortcut: 'Del',
            icon: markRaw(TrashIcon),
            onSelect: () => (lastContextAction.value = `删除：${row.title}`),
        },
    ]
    contextMenuRef.value?.openWithEvent(e, items)
}

// =========================
// 辅助方法
// =========================
const getSelectedUserName = (id: string | number | null): string | null => {
    if (id === null) return null
    const user = userOptions.find(u => u.id === id)
    return user ? user.name : null
}

const handleClick = () => {
    console.log('按钮被点击')
}
</script>

<style scoped lang="less">
.base-components-container {
    background-color: var(--background);
}

.h-title {
    color: var(--foreground);
}

.context-row {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    background: var(--card);
    box-shadow: var(--shadow-xs);
    cursor: context-menu;
    transition:
        background-color 0.2s ease,
        border-color 0.2s ease;

    &:hover {
        background: var(--accent);
        border-color: var(--primary);
    }
}

.context-badge {
    display: inline-flex;
    align-items: center;
    height: 24px;
    padding: 0 10px;
    border: 1px solid var(--border);
    background: var(--card);
    box-shadow: var(--shadow-xs);
    color: var(--foreground);
}
</style>
