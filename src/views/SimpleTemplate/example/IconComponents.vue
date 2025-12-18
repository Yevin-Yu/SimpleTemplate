<template>
    <div class="icon-components-container h-full w-full p-6 overflow-auto">
        <div class="max-w-6xl mx-auto">
            <h1 class="h-title text-3xl font-bold mb-2">图标组件</h1>
            <p class="text-sm text-[var(--muted-foreground)] mb-6">展示所有可用的图标组件，点击图标可复制导入代码</p>

            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">所有图标</h2>
                    <p class="text-gray-600 mt-1">点击图标卡片可复制导入代码</p>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    <div
                        v-for="icon in iconList"
                        :key="icon.name"
                        class="icon-item px-1 py-3 border border-[var(--border)] hover:bg-[var(--muted)] transition-colors cursor-pointer"
                        @click="copyImportCode(icon.name)"
                    >
                        <div class="flex flex-col items-center gap-1.5">
                            <div class="flex items-center justify-center w-8 h-8">
                                <component :is="icon.component" :size="18" />
                            </div>
                            <div class="text-center">
                                <div class="text-sm font-medium text-[var(--foreground)]">{{ icon.name }}</div>
                                <div v-if="copiedIcon === icon.name" class="text-xs text-[var(--primary)] mt-0.5">已复制</div>
                            </div>
                        </div>
                    </div>
                </div>
            </ui-card>

            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">使用示例</h2>
                    <p class="text-gray-600 mt-1">在组件中导入并使用图标</p>
                </div>

                <div class="flex flex-wrap items-center gap-4 mb-4">
                    <SearchIcon :size="20" />
                    <SettingsIcon :size="20" />
                    <EditIcon :size="20" />
                    <TrashIcon :size="20" />
                    <HomeIcon :size="20" />
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeExample" />
            </ui-card>

            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">不同尺寸</h2>
                    <p class="text-gray-600 mt-1">通过 <ui-tag>size</ui-tag> 属性控制图标大小</p>
                </div>

                <div class="flex flex-wrap items-center gap-6 mb-4">
                    <div v-for="size in iconSizes" :key="size" class="flex flex-col items-center gap-2">
                        <SearchIcon :size="size" />
                        <span class="text-xs text-[var(--muted-foreground)]">{{ size }}px</span>
                    </div>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeSize" />
            </ui-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { markRaw, ref, type Component } from 'vue'
import uiCard from '@/components/ui/ui-card.vue'
import uiCodeBlock from '@/components/ui/ui-code-block.vue'
import UiTag from '@/components/ui/ui-tag.vue'
import {
    SettingsIcon,
    LogOutIcon,
    ShareIcon,
    GitHubIcon,
    SwitchOnIcon,
    SwitchOffIcon,
    HomeIcon,
    ExampleIcon,
    FormIcon,
    TableIcon,
    CardIcon,
    DashboardIcon,
    ComponentsIcon,
    ButtonIcon,
    TagIcon,
    SelectIcon,
    SwitchIcon,
    CodeBlockIcon,
    ContextMenuIcon,
    InputIcon,
    CopyIcon,
    CheckIcon,
    EditIcon,
    TrashIcon,
    XIcon,
    EyeIcon,
    EyeOffIcon,
    SearchIcon,
} from '@/components/icons'

interface IconItem {
    name: string
    componentName: string
    component: Component
}

const ICONS = [
    { name: 'Settings', componentName: 'SettingsIcon', component: SettingsIcon },
    { name: 'LogOut', componentName: 'LogOutIcon', component: LogOutIcon },
    { name: 'Share', componentName: 'ShareIcon', component: ShareIcon },
    { name: 'GitHub', componentName: 'GitHubIcon', component: GitHubIcon },
    { name: 'SwitchOn', componentName: 'SwitchOnIcon', component: SwitchOnIcon },
    { name: 'SwitchOff', componentName: 'SwitchOffIcon', component: SwitchOffIcon },
    { name: 'Home', componentName: 'HomeIcon', component: HomeIcon },
    { name: 'Example', componentName: 'ExampleIcon', component: ExampleIcon },
    { name: 'Form', componentName: 'FormIcon', component: FormIcon },
    { name: 'Table', componentName: 'TableIcon', component: TableIcon },
    { name: 'Card', componentName: 'CardIcon', component: CardIcon },
    { name: 'Dashboard', componentName: 'DashboardIcon', component: DashboardIcon },
    { name: 'Components', componentName: 'ComponentsIcon', component: ComponentsIcon },
    { name: 'Button', componentName: 'ButtonIcon', component: ButtonIcon },
    { name: 'Tag', componentName: 'TagIcon', component: TagIcon },
    { name: 'Select', componentName: 'SelectIcon', component: SelectIcon },
    { name: 'Switch', componentName: 'SwitchIcon', component: SwitchIcon },
    { name: 'CodeBlock', componentName: 'CodeBlockIcon', component: CodeBlockIcon },
    { name: 'ContextMenu', componentName: 'ContextMenuIcon', component: ContextMenuIcon },
    { name: 'Input', componentName: 'InputIcon', component: InputIcon },
    { name: 'Copy', componentName: 'CopyIcon', component: CopyIcon },
    { name: 'Check', componentName: 'CheckIcon', component: CheckIcon },
    { name: 'Edit', componentName: 'EditIcon', component: EditIcon },
    { name: 'Trash', componentName: 'TrashIcon', component: TrashIcon },
    { name: 'X', componentName: 'XIcon', component: XIcon },
    { name: 'Eye', componentName: 'EyeIcon', component: EyeIcon },
    { name: 'EyeOff', componentName: 'EyeOffIcon', component: EyeOffIcon },
    { name: 'Search', componentName: 'SearchIcon', component: SearchIcon },
] as const

const iconList: IconItem[] = ICONS.map(icon => ({
    ...icon,
    component: markRaw(icon.component),
}))

const iconSizes = [16, 20, 24, 32, 48] as const
const COPY_FEEDBACK_DURATION = 2000

const copiedIcon = ref<string | null>(null)

const copyImportCode = async (iconName: string) => {
    const icon = iconList.find(i => i.name === iconName)
    if (!icon) return

    const code = `import { ${icon.componentName} } from '@/components/icons'`
    try {
        await navigator.clipboard.writeText(code)
        copiedIcon.value = iconName
        setTimeout(() => {
            copiedIcon.value = null
        }, COPY_FEEDBACK_DURATION)
    } catch (error) {
        console.error('复制失败:', error)
    }
}

const codeExample = `<template>
    <SearchIcon :size="20" />
    <SettingsIcon :size="20" />
    <EditIcon :size="20" />
</template>

<script setup lang="ts">
import { SearchIcon, SettingsIcon, EditIcon } from '@/components/icons'
<\/script>`

const codeSize = `<template>
    <SearchIcon :size="16" />
    <SearchIcon :size="24" />
    <SearchIcon :size="32" />
</template>`
</script>

<style scoped lang="less">
.icon-components-container {
    background-color: var(--background);
}

.h-title {
    color: var(--foreground);
}

.icon-item {
    transition:
        border-color 0.2s ease,
        background-color 0.2s ease;
    min-width: 0;
}

.icon-item:hover {
    border-color: var(--primary);
}
</style>
