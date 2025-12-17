<template>
    <div class="card-components-container h-full w-full p-6 overflow-auto">
        <div class="max-w-6xl mx-auto">
            <h1 class="h-title text-3xl font-bold mb-2">卡片组件</h1>
            <p class="text-sm text-[var(--muted-foreground)] mb-6">
                这里聚焦展示
                <ui-tag-button>ui-card</ui-tag-button>
                的常用能力与推荐用法。卡片组件仅负责“容器外观”，布局（padding/header/footer）建议由业务层组合完成。
            </p>

            <!-- =========================
                模块：基础用法（variant）
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">基础用法</h2>
                    <p class="text-gray-600 mt-1">通过 <ui-tag-button>variant</ui-tag-button> 选择默认阴影或轻量阴影。</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <ui-card class="p-4">
                        <div class="font-medium text-[var(--foreground)] mb-1">Default</div>
                        <div class="text-sm text-[var(--muted-foreground)]">适用于主要内容承载、分区卡片。</div>
                    </ui-card>

                    <ui-card class="p-4" variant="light">
                        <div class="font-medium text-[var(--foreground)] mb-1">Light</div>
                        <div class="text-sm text-[var(--muted-foreground)]">适用于次级信息、列表项容器。</div>
                    </ui-card>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeVariant" />
            </ui-card>

            <!-- =========================
                模块：推荐结构（header / content / footer）
            ========================== -->
            <ui-card class="p-6 mb-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">推荐结构</h2>
                    <p class="text-gray-600 mt-1">
                        <ui-tag-button>ui-card</ui-tag-button> 建议保持“薄封装”，在卡片内部用语义化结构分区，便于复用与维护。
                    </p>
                </div>

                <ui-card class="p-5">
                    <div class="flex items-start justify-between gap-4">
                        <div>
                            <div class="text-base font-semibold text-[var(--foreground)]">卡片标题</div>
                            <div class="text-sm text-[var(--muted-foreground)] mt-1">这里放描述信息（可选）。</div>
                        </div>
                        <ui-button variant="blank" size="small" aria-label="操作：编辑" @click="onActionClick('编辑')">编辑</ui-button>
                    </div>

                    <div class="mt-4 text-sm text-[var(--foreground)]">内容区域：保持排版简单，必要时使用网格/列表承载信息。</div>

                    <div class="mt-5 pt-4 border-t border-[var(--border)] flex items-center justify-end gap-2">
                        <ui-button variant="blank" size="small" aria-label="操作：取消" @click="onActionClick('取消')">取消</ui-button>
                        <ui-button variant="primary" size="small" aria-label="操作：确认" @click="onActionClick('确认')">确认</ui-button>
                    </div>
                </ui-card>

                <div class="text-sm text-[var(--muted-foreground)] mt-4 mb-4">
                    最近一次操作：<span class="font-medium text-[var(--foreground)]">{{ lastActionText }}</span>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeLayout" />
            </ui-card>

            <!-- =========================
                模块：列表场景（light + tight padding）
            ========================== -->
            <ui-card class="p-6">
                <div class="mb-4">
                    <h2 class="h-title text-2xl font-semibold">列表场景</h2>
                    <p class="text-gray-600 mt-1">
                        在列表/表单分组等场景推荐使用 <ui-tag-button>variant="light"</ui-tag-button>，并用更紧凑的 padding。
                    </p>
                </div>

                <div class="grid gap-3 mb-4">
                    <ui-card variant="light" class="px-4 py-3">
                        <div class="flex items-center justify-between gap-4">
                            <div>
                                <div class="text-sm font-medium text-[var(--foreground)]">列表项 A</div>
                                <div class="text-xs text-[var(--muted-foreground)] mt-1">说明信息</div>
                            </div>
                            <ui-button variant="blank" size="small" aria-label="操作：查看" @click="onActionClick('查看 A')">查看</ui-button>
                        </div>
                    </ui-card>

                    <ui-card variant="light" class="px-4 py-3">
                        <div class="flex items-center justify-between gap-4">
                            <div>
                                <div class="text-sm font-medium text-[var(--foreground)]">列表项 B</div>
                                <div class="text-xs text-[var(--muted-foreground)] mt-1">说明信息</div>
                            </div>
                            <ui-button variant="blank" size="small" aria-label="操作：查看" @click="onActionClick('查看 B')">查看</ui-button>
                        </div>
                    </ui-card>
                </div>

                <ui-code-block title="示例代码" language="vue" :code="codeList" />
            </ui-card>
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * CardComponents
 *
 * 页面目标：
 * - 解释 ui-card 的职责边界：只管容器外观，不内置业务结构
 * - 提供“推荐结构”示例，方便复制到真实业务页面
 */
import { ref } from 'vue'
import uiCard from '@/components/ui/ui-card.vue'
import uiButton from '@/components/ui/ui-button.vue'
import uiCodeBlock from '@/components/ui/ui-code-block.vue'
import UiTagButton from '@/components/ui/ui-tag-button.vue'

const lastActionText = ref('无')

const onActionClick = (label: string) => {
    lastActionText.value = `${label}（${new Date().toLocaleTimeString()}）`
}

// =========================
// 代码示例（tab=4：统一 4 空格缩进）
// =========================
const codeVariant = `<template>
    <ui-card class="p-4">
        Default
    </ui-card>

    <ui-card variant="light" class="p-4">
        Light
    </ui-card>
<\/template>`

const codeLayout = `<template>
    <ui-card class="p-5">
        <div class="flex items-start justify-between gap-4">
            <div>
                <div class="text-base font-semibold">卡片标题</div>
                <div class="text-sm text-[var(--muted-foreground)] mt-1">描述信息</div>
            </div>
            <ui-button variant="blank" size="small" @click="onEdit">编辑</ui-button>
        </div>

        <div class="mt-4">内容区域...</div>

        <div class="mt-5 pt-4 border-t border-[var(--border)] flex justify-end gap-2">
            <ui-button variant="blank" size="small" @click="onCancel">取消</ui-button>
            <ui-button variant="primary" size="small" @click="onConfirm">确认</ui-button>
        </div>
    </ui-card>
<\/template>`

const codeList = `<template>
    <ui-card variant="light" class="px-4 py-3">
        <div class="flex items-center justify-between">
            <div>列表项 A</div>
            <ui-button variant="blank" size="small">查看</ui-button>
        </div>
    </ui-card>
<\/template>`
</script>

<style scoped lang="less">
.card-components-container {
    background-color: var(--background);
}

.h-title {
    color: var(--foreground);
}
</style>
