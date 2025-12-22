<template>
    <div class="toast-components-container h-full w-full p-6 overflow-auto">
        <div class="max-w-6xl mx-auto">
            <h1 class="h-title text-3xl font-bold mb-2">提示组件</h1>
            <p class="text-sm text-[var(--muted-foreground)] mb-6">
                这里聚焦展示 <ui-tag>ui-toast</ui-tag> 的常用能力与推荐用法，并提供可复制的代码示例。
            </p>

            <!-- =========================
                模块：基础用法（推荐使用 toast 管理器）
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">基础用法（推荐）</h2>
                    <p class="text-gray-600 mt-1">
                        使用 <ui-tag>toast</ui-tag> 管理器快速显示提示消息，支持四种类型：<ui-tag>success</ui-tag>、<ui-tag>error</ui-tag>、<ui-tag>warning</ui-tag>、<ui-tag>info</ui-tag>。
                    </p>
                </div>

                <div class="flex flex-wrap gap-3 mb-4">
                    <ui-button variant="primary" size="small" @click="toast.success('操作成功！')">
                        成功提示
                    </ui-button>
                    <ui-button variant="danger" size="small" @click="toast.error('操作失败，请重试')">
                        错误提示
                    </ui-button>
                    <ui-button variant="station" size="small" @click="toast.warning('请注意相关事项')">
                        警告提示
                    </ui-button>
                    <ui-button size="small" @click="toast.info('这是一条普通信息')">
                        信息提示
                    </ui-button>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeBasic" />
            </ui-card>

            <!-- =========================
                模块：自定义持续时间
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">自定义持续时间</h2>
                    <p class="text-gray-600 mt-1">
                        通过 <ui-tag>duration</ui-tag> 参数控制提示显示的时长（单位：毫秒）。默认成功/警告/信息为 3000ms，错误为 5000ms。
                    </p>
                </div>

                <div class="flex flex-wrap gap-3 mb-4">
                    <ui-button variant="primary" size="small" @click="toast.success('这条提示显示 1 秒', 1000)">
                        1 秒
                    </ui-button>
                    <ui-button variant="primary" size="small" @click="toast.success('这条提示显示 5 秒', 5000)">
                        5 秒
                    </ui-button>
                    <ui-button variant="primary" size="small" @click="toast.info('这条提示不会自动关闭', 0)">
                        永久显示
                    </ui-button>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeDuration" />
            </ui-card>

            <!-- =========================
                模块：使用 toast.show 方法
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">使用 show 方法</h2>
                    <p class="text-gray-600 mt-1">
                        通过 <ui-tag>toast.show()</ui-tag> 方法，可以使用 <ui-tag>options</ui-tag> 对象同时指定类型和持续时间。
                    </p>
                </div>

                <div class="flex flex-wrap gap-3 mb-4">
                    <ui-button variant="primary" size="small" @click="showCustomToast('success')">
                        自定义成功提示
                    </ui-button>
                    <ui-button variant="primary" size="small" @click="showCustomToast('error')">
                        自定义错误提示
                    </ui-button>
                    <ui-button variant="primary" size="small" @click="showCustomToast('warning')">
                        自定义警告提示
                    </ui-button>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeShow" />
            </ui-card>

            <!-- =========================
                模块：业务场景示例
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">业务场景示例</h2>
                    <p class="text-gray-600 mt-1">
                        展示在实际业务中如何使用 toast 提示用户操作结果。
                    </p>
                </div>

                <div class="space-y-4 mb-4">
                    <div>
                        <label class="block text-sm font-medium text-[var(--foreground)] mb-2">模拟表单提交</label>
                        <div class="flex gap-3">
                            <ui-input v-model="formData.username" placeholder="请输入用户名" class="flex-1" />
                            <ui-button variant="primary" @click="handleFormSubmit" class="form-submit-btn">提交</ui-button>
                        </div>
                        <div v-if="submitResult" class="mt-2 text-sm text-[var(--muted-foreground)]">
                            最近操作：<span class="font-medium text-[var(--foreground)]">{{ submitResult }}</span>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-[var(--foreground)] mb-2">模拟数据加载</label>
                        <ui-button variant="primary" @click="handleDataLoad">加载数据</ui-button>
                    </div>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeBusiness" />
            </ui-card>

            <!-- =========================
                模块：使用说明
            ========================== -->
            <ui-card class="p-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">使用说明</h2>
                    <p class="text-gray-600 mt-1">
                        <ui-tag>ui-toast</ui-tag> 组件通过 <ui-tag>toast</ui-tag> 管理器使用，管理器会自动处理定位（固定在右上角）、层级（z-index: 9999）和生命周期管理。
                    </p>
                </div>

                <div class="bg-[var(--muted)] rounded-lg p-4 mb-4">
                    <h3 class="font-semibold text-[var(--foreground)] mb-2">推荐用法：</h3>
                    <ul class="list-disc list-inside space-y-1 text-sm text-[var(--muted-foreground)]">
                        <li>使用 <ui-tag>toast.success()</ui-tag>、<ui-tag>toast.error()</ui-tag> 等方法快速显示提示</li>
                        <li>错误提示默认持续 5 秒，其他类型默认 3 秒</li>
                        <li>可以通过第二个参数自定义持续时间</li>
                        <li>使用 <ui-tag>toast.show()</ui-tag> 方法可以同时指定类型和持续时间</li>
                    </ul>
                </div>

                <ui-code-block title="导入方式" language="typescript" :code="codeImport" />
            </ui-card>
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * ToastComponents
 *
 * 页面目标：
 * - 展示 ui-toast 的各种用法
 * - 提供可直接复制的代码示例
 */
import { ref } from 'vue'
import uiCard from '@/components/ui/ui-card.vue'
import uiButton from '@/components/ui/ui-button.vue'
import uiInput from '@/components/ui/ui-input.vue'
import uiCodeBlock from '@/components/ui/ui-code-block.vue'
import UiTag from '@/components/ui/ui-tag.vue'
import { toast } from '@/shared/toast'

const formData = ref({
    username: '',
})

const submitResult = ref('')

const showCustomToast = (type: 'success' | 'error' | 'warning' | 'info') => {
    const messages = {
        success: '操作成功完成！',
        error: '操作失败，请检查后重试',
        warning: '请注意相关事项',
        info: '这是一条普通信息',
    }
    toast.show(messages[type], { type, duration: 4000 })
}

const handleFormSubmit = () => {
    if (!formData.value.username.trim()) {
        toast.error('请输入用户名')
        submitResult.value = '提交失败：未输入用户名'
        return
    }

    // 模拟提交
    setTimeout(() => {
        toast.success(`提交成功：${formData.value.username}`)
        submitResult.value = `已提交：${formData.value.username}`
        formData.value.username = ''
    }, 500)
}

const handleDataLoad = () => {
    toast.info('正在加载数据...', 2000)

    setTimeout(() => {
        const success = Math.random() > 0.3
        if (success) {
            toast.success('数据加载成功')
        } else {
            toast.error('数据加载失败，请重试')
        }
    }, 2000)
}

// =========================
// 代码示例
// =========================
const codeBasic = `<template>
    <ui-button @click="toast.success('操作成功！')">成功提示</ui-button>
    <ui-button @click="toast.error('操作失败，请重试')">错误提示</ui-button>
    <ui-button @click="toast.warning('请注意相关事项')">警告提示</ui-button>
    <ui-button @click="toast.info('这是一条普通信息')">信息提示</ui-button>
</template>

<script setup>
import { toast } from '@/shared/toast'
<\/script>`

const codeDuration = `<template>
    <ui-button @click="toast.success('消息', 1000)">1 秒</ui-button>
    <ui-button @click="toast.success('消息', 5000)">5 秒</ui-button>
    <ui-button @click="toast.info('消息', 0)">永久显示</ui-button>
</template>

<script setup>
import { toast } from '@/shared/toast'
<\/script>`

const codeShow = `<template>
    <ui-button @click="handleClick">显示提示</ui-button>
</template>

<script setup>
import { toast } from '@/shared/toast'

const handleClick = () => {
    toast.show('消息内容', {
        type: 'success', // 'success' | 'error' | 'warning' | 'info'
        duration: 4000
    })
}
<\/script>`

const codeBusiness = `<template>
    <ui-button @click="handleSubmit">提交表单</ui-button>
</template>

<script setup>
import { toast } from '@/shared/toast'

const handleSubmit = () => {
    if (!validateForm()) {
        toast.error('请填写完整信息')
        return
    }

    // 模拟 API 调用
    api.submit(data)
        .then(() => {
            toast.success('提交成功')
        })
        .catch(() => {
            toast.error('提交失败，请重试')
        })
}
<\/script>`

const codeImport = `// 在需要使用 toast 的组件或文件中导入
import { toast } from '@/shared/toast'

// 或者从 @/shared 统一导出中导入
import { toast } from '@/shared'`
</script>

<style scoped lang="less">
.toast-components-container {
    background-color: var(--background);
}

.h-title {
    color: var(--foreground);
}

.space-y-4 > * + * {
    margin-top: 16px;
}

.form-submit-btn {
    flex-shrink: 0;
    white-space: nowrap;
}
</style>

