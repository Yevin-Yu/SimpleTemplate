<template>
    <div class="context-menu-components-container h-full w-full p-6 overflow-auto">
        <div class="max-w-6xl mx-auto">
            <h1 class="h-title text-3xl font-bold mb-2">右键菜单组件</h1>
            <p class="text-sm text-[var(--muted-foreground)] mb-6">
                这里聚焦展示 <ui-tag>ui-context-menu</ui-tag> 的推荐用法：页面只挂载一个实例，通过 ref 调用 <ui-tag>openWithEvent</ui-tag> /
                <ui-tag>openAt</ui-tag> 打开。
            </p>

            <!-- =========================
                模块：基础用法（右键打开 + select 回显）
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">基础用法</h2>
                    <p class="text-gray-600 mt-1">在触发元素上监听 <ui-tag>@contextmenu.prevent</ui-tag>，并传入菜单项。</p>
                </div>

                <div class="flex flex-wrap items-center gap-3 mb-4">
                    <ui-button class="w-28" @contextmenu.prevent="onButtonContextMenu">右键按钮</ui-button>
                    <div class="text-sm text-[var(--muted-foreground)]">
                        最近一次操作：<span class="font-medium text-[var(--foreground)]">{{ lastAction || '无' }}</span>
                    </div>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeBasic" />
            </ui-card>

            <!-- =========================
                模块：列表场景（每行不同菜单）
            ========================== -->
            <ui-card class="p-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">列表场景</h2>
                    <p class="text-gray-600 mt-1">根据行数据动态生成菜单项（仍然复用同一个菜单实例）。</p>
                </div>

                <div class="grid gap-2 mb-4 max-w-xl">
                    <div v-for="row in rows" :key="row.id" class="row" @contextmenu.prevent="onRowContextMenu($event, row)">
                        <span class="font-medium text-[var(--foreground)]">{{ row.title }}</span>
                        <span class="text-xs text-[var(--muted-foreground)]">{{ row.meta }}</span>
                    </div>
                </div>

                <div class="text-xs text-[var(--muted-foreground)] mb-4">提示：右键打开 · Ctrl+C / F2 / Del · 点击外部或按 ESC 关闭</div>

                <ui-code-block title="示例代码" language="vue" :code="codeList" />
            </ui-card>

            <!-- 页面只挂载一个右键菜单实例：通过 ref 调用 openWithEvent/openAt -->
            <ui-context-menu ref="menuRef" @select="onSelect" />
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * ContextMenuComponents
 *
 * 页面目标：
 * - 推荐实践：页面只渲染一个 ui-context-menu，通过 ref 暴露方法来打开
 * - 展示两类常见场景：按钮/列表行
 */
import { markRaw, ref } from 'vue'
import uiCard from '@/components/ui/ui-card.vue'
import uiButton from '@/components/ui/ui-button.vue'
import uiCodeBlock from '@/components/ui/ui-code-block.vue'
import uiContextMenu from '@/components/ui/ui-context-menu.vue'
import type { ContextMenuItem } from '@/components/ui/ui-context-menu.vue'
import UiTag from '@/components/ui/ui-tag.vue'
import { CopyIcon, EditIcon, TrashIcon } from '@/components/icons'

const menuRef = ref<InstanceType<typeof uiContextMenu> | null>(null)
const lastAction = ref<string>('')

const baseItems = (): ContextMenuItem[] => [
    { key: 'copy', label: '复制', shortcut: 'Ctrl+C', icon: markRaw(CopyIcon), onSelect: () => (lastAction.value = '复制') },
    { key: 'rename', label: '重命名', shortcut: 'F2', icon: markRaw(EditIcon), onSelect: () => (lastAction.value = '重命名') },
    { key: 'divider', type: 'divider' },
    { key: 'delete', label: '删除', shortcut: 'Del', variant: 'danger', icon: markRaw(TrashIcon), onSelect: () => (lastAction.value = '删除') },
]

const onSelect = (item: ContextMenuItem) => {
    // 兜底回显：即便 item 没写 onSelect，也能在页面看到选择结果
    if (item.label) lastAction.value = item.label
}

const onButtonContextMenu = (e: MouseEvent) => {
    menuRef.value?.openWithEvent(e, baseItems())
}

interface Row {
    id: number
    title: string
    meta: string
}
const rows = ref<Row[]>([
    { id: 1, title: 'README.md', meta: '文档' },
    { id: 2, title: 'src/views', meta: '页面目录' },
    { id: 3, title: 'package.json', meta: '依赖配置' },
])

const onRowContextMenu = (e: MouseEvent, row: Row) => {
    const items: ContextMenuItem[] = [
        {
            key: `copy-${row.id}`,
            label: `复制「${row.title}」`,
            shortcut: 'Ctrl+C',
            icon: markRaw(CopyIcon),
            onSelect: () => (lastAction.value = `复制：${row.title}`),
        },
        {
            key: `rename-${row.id}`,
            label: `重命名「${row.title}」`,
            shortcut: 'F2',
            icon: markRaw(EditIcon),
            onSelect: () => (lastAction.value = `重命名：${row.title}`),
        },
        { key: `divider-${row.id}`, type: 'divider' },
        {
            key: `delete-${row.id}`,
            label: `删除「${row.title}」`,
            shortcut: 'Del',
            variant: 'danger',
            icon: markRaw(TrashIcon),
            onSelect: () => (lastAction.value = `删除：${row.title}`),
        },
    ]
    menuRef.value?.openWithEvent(e, items)
}

// =========================
// 代码示例（tab=4：统一 4 空格缩进）
// =========================
const codeBasic = `<template>
    <ui-button @contextmenu.prevent="onContextMenu">右键按钮</ui-button>
    <ui-context-menu ref="menuRef" @select="onSelect" />
<\/template>

<script setup lang="ts">
const onContextMenu = (e: MouseEvent) => {
    menuRef.value?.openWithEvent(e, items)
}
<\/script>`

const codeList = `<template>
    <div v-for="row in rows" :key="row.id" @contextmenu.prevent="onRowMenu($event, row)">
        {{ row.title }}
    </div>
    <ui-context-menu ref="menuRef" />
<\/template>`
</script>

<style scoped lang="less">
.context-menu-components-container {
    background-color: var(--background);
}

.h-title {
    color: var(--foreground);
}

.row {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    background: var(--card);
    box-shadow: var(--shadow-xs);
    cursor: context-menu;
    transition: background-color 0.2s ease;
    border: 1px solid var(--border);

    &:hover {
        background: var(--accent);
    }
}
</style>
