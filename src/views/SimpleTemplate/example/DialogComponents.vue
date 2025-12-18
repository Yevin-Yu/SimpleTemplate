<template>
    <div class="dialog-components-container h-full w-full p-6 overflow-auto">
        <div class="max-w-6xl mx-auto">
            <h1 class="h-title text-3xl font-bold mb-2">弹窗组件</h1>
            <p class="text-sm text-[var(--muted-foreground)] mb-6">
                这里聚焦展示 <ui-tag>ui-dialog</ui-tag> 的常用能力与推荐用法，并提供可复制的代码示例。
            </p>

            <!-- =========================
                模块：基础用法
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">基础用法</h2>
                    <p class="text-gray-600 mt-1">通过 <ui-tag>v-model</ui-tag> 控制弹窗的显示与隐藏。</p>
                </div>

                <div class="flex flex-wrap gap-3 mb-4">
                    <ui-button variant="primary" @click="showBasic = true">打开基础弹窗</ui-button>
                </div>

                <ui-dialog v-model="showBasic" title="基础弹窗" @close="onDialogClose('基础弹窗')">
                    <p class="text-[var(--foreground)]">这是一个基础的弹窗示例。点击遮罩或关闭按钮可以关闭弹窗。</p>
                </ui-dialog>

                <ui-code-block title="示例代码" language="vue" :code="codeBasic" />
            </ui-card>

            <!-- =========================
                模块：不同尺寸
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">不同尺寸</h2>
                    <p class="text-gray-600 mt-1">通过 <ui-tag>size</ui-tag> 属性控制弹窗宽度（small/medium/large）。</p>
                </div>

                <div class="flex flex-wrap gap-3 mb-4">
                    <ui-button variant="primary" size="small" @click="showSmall = true">Small</ui-button>
                    <ui-button variant="primary" size="small" @click="showMedium = true">Medium</ui-button>
                    <ui-button variant="primary" size="small" @click="showLarge = true">Large</ui-button>
                </div>

                <ui-dialog v-model="showSmall" title="小尺寸弹窗" size="small">
                    <p class="text-[var(--foreground)]">这是小尺寸弹窗（最大宽度 400px），适用于简单的确认或提示信息。</p>
                </ui-dialog>

                <ui-dialog v-model="showMedium" title="中等尺寸弹窗" size="medium">
                    <p class="text-[var(--foreground)]">这是中等尺寸弹窗（最大宽度 600px），适用于大多数表单和内容展示场景。</p>
                </ui-dialog>

                <ui-dialog v-model="showLarge" title="大尺寸弹窗" size="large">
                    <p class="text-[var(--foreground)]">这是大尺寸弹窗（最大宽度 900px），适用于需要展示更多内容的场景。</p>
                </ui-dialog>

                <ui-code-block title="示例代码" language="vue" :code="codeSize" />
            </ui-card>

            <!-- =========================
                模块：带表单的弹窗
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">表单弹窗</h2>
                    <p class="text-gray-600 mt-1">在弹窗中使用 <ui-tag>footer</ui-tag> slot 放置操作按钮，这是最常见的业务场景。</p>
                </div>

                <div class="flex flex-wrap gap-3 mb-4">
                    <ui-button variant="primary" @click="showForm = true">打开表单弹窗</ui-button>
                </div>

                <ui-dialog v-model="showForm" title="新增用户" size="medium">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-[var(--foreground)] mb-2">姓名</label>
                            <ui-input v-model="formData.name" placeholder="请输入姓名" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-[var(--foreground)] mb-2">邮箱</label>
                            <ui-input v-model="formData.email" type="email" placeholder="请输入邮箱" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-[var(--foreground)] mb-2">角色</label>
                            <ui-select
                                v-model="formData.role"
                                :options="roleOptions"
                                option-label="label"
                                option-value="value"
                                placeholder="请选择角色"
                            />
                        </div>
                    </div>

                    <template #footer>
                        <ui-button variant="blank" @click="showForm = false">取消</ui-button>
                        <ui-button variant="primary" @click="handleFormSubmit">确认</ui-button>
                    </template>
                </ui-dialog>

                <div v-if="formResult" class="mt-4 text-sm text-[var(--muted-foreground)]">
                    最近提交：<span class="font-medium text-[var(--foreground)]">{{ formResult }}</span>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeForm" />
            </ui-card>

            <!-- =========================
                模块：自定义标题
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">自定义标题</h2>
                    <p class="text-gray-600 mt-1">通过 <ui-tag>title</ui-tag> slot 可以自定义标题区域的内容。</p>
                </div>

                <div class="flex flex-wrap gap-3 mb-4">
                    <ui-button variant="primary" @click="showCustomTitle = true">打开自定义标题弹窗</ui-button>
                </div>

                <ui-dialog v-model="showCustomTitle" size="medium">
                    <template #title>
                        <div class="flex items-center gap-2">
                            <ComponentsIcon :size="20" />
                            <span>自定义标题</span>
                        </div>
                    </template>
                    <p class="text-[var(--foreground)]">标题区域可以包含图标、标签等自定义内容。</p>
                </ui-dialog>

                <ui-code-block title="示例代码" language="vue" :code="codeCustomTitle" />
            </ui-card>

            <!-- =========================
                模块：关闭行为控制
            ========================== -->
            <ui-card class="p-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">关闭行为控制</h2>
                    <p class="text-gray-600 mt-1">
                        通过 <ui-tag>closable</ui-tag> 和 <ui-tag>closeOnClickOverlay</ui-tag> 控制关闭行为。
                    </p>
                </div>

                <div class="flex flex-wrap gap-3 mb-4">
                    <ui-button variant="primary" size="small" @click="showNoCloseBtn = true">无关闭按钮</ui-button>
                    <ui-button variant="primary" size="small" @click="showNoOverlayClose = true">点击遮罩不关闭</ui-button>
                </div>

                <ui-dialog v-model="showNoCloseBtn" title="无关闭按钮" :closable="false">
                    <p class="text-[var(--foreground)]">此弹窗没有关闭按钮，只能通过 ESC 键或点击遮罩关闭。</p>
                </ui-dialog>

                <ui-dialog v-model="showNoOverlayClose" title="点击遮罩不关闭" :close-on-click-overlay="false">
                    <p class="text-[var(--foreground)]">此弹窗点击遮罩不会关闭，只能通过关闭按钮或 ESC 键关闭。</p>
                </ui-dialog>

                <ui-code-block title="示例代码" language="vue" :code="codeCloseBehavior" />
            </ui-card>
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * DialogComponents
 *
 * 页面目标：
 * - 展示 ui-dialog 的各种用法
 * - 提供可直接复制的代码示例
 */
import { ref } from 'vue'
import uiCard from '@/components/ui/ui-card.vue'
import uiButton from '@/components/ui/ui-button.vue'
import uiDialog from '@/components/ui/ui-dialog.vue'
import uiInput from '@/components/ui/ui-input.vue'
import uiSelect from '@/components/ui/ui-select.vue'
import uiCodeBlock from '@/components/ui/ui-code-block.vue'
import UiTag from '@/components/ui/ui-tag.vue'
import { ComponentsIcon } from '@/components/icons'

const showBasic = ref(false)
const showSmall = ref(false)
const showMedium = ref(false)
const showLarge = ref(false)
const showForm = ref(false)
const showCustomTitle = ref(false)
const showNoCloseBtn = ref(false)
const showNoOverlayClose = ref(false)

const formData = ref({
    name: '',
    email: '',
    role: null as string | number | null,
})

const formResult = ref('')

const roleOptions = [
    { label: '管理员', value: 'admin' },
    { label: '编辑', value: 'editor' },
    { label: '用户', value: 'user' },
]

const onDialogClose = (name: string) => {
    console.log(`${name} 已关闭`)
}

const handleFormSubmit = () => {
    if (!formData.value.name || !formData.value.email || !formData.value.role) {
        alert('请填写完整信息')
        return
    }
    formResult.value = `姓名：${formData.value.name}，邮箱：${formData.value.email}，角色：${formData.value.role}`
    showForm.value = false
    formData.value = { name: '', email: '', role: null }
}

// =========================
// 代码示例
// =========================
const codeBasic = `<template>
    <ui-button @click="show = true">打开弹窗</ui-button>
    
    <ui-dialog v-model="show" title="基础弹窗">
        <p>弹窗内容</p>
    </ui-dialog>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(false)
<\/script>`

const codeSize = `<template>
    <ui-dialog v-model="show" title="小尺寸" size="small">内容</ui-dialog>
    <ui-dialog v-model="show" title="中等尺寸" size="medium">内容</ui-dialog>
    <ui-dialog v-model="show" title="大尺寸" size="large">内容</ui-dialog>
</template>`

const codeForm = `<template>
    <ui-dialog v-model="show" title="新增用户" size="medium">
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium mb-2">姓名</label>
                <ui-input v-model="name" placeholder="请输入姓名" />
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">邮箱</label>
                <ui-input v-model="email" type="email" placeholder="请输入邮箱" />
            </div>
        </div>

        <template #footer>
            <ui-button variant="blank" @click="show = false">取消</ui-button>
            <ui-button variant="primary" @click="handleSubmit">确认</ui-button>
        </template>
    </ui-dialog>
</template>`

const codeCustomTitle = `<template>
    <ui-dialog v-model="show" size="medium">
        <template #title>
            <div class="flex items-center gap-2">
                <ComponentsIcon :size="20" />
                <span>自定义标题</span>
            </div>
        </template>
        <p>弹窗内容</p>
    </ui-dialog>
</template>`

const codeCloseBehavior = `<template>
    <!-- 无关闭按钮 -->
    <ui-dialog v-model="show" title="标题" :closable="false">内容</ui-dialog>
    
    <!-- 点击遮罩不关闭 -->
    <ui-dialog v-model="show" title="标题" :close-on-click-overlay="false">内容</ui-dialog>
</template>`
</script>

<style scoped lang="less">
.dialog-components-container {
    background-color: var(--background);
}

.h-title {
    color: var(--foreground);
}

.space-y-4 > * + * {
    margin-top: 16px;
}
</style>

