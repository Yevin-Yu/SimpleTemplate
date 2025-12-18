<template>
    <ui-card class="p-6">
        <div class="flex items-start justify-between gap-4 flex-wrap mb-4">
            <div class="min-w-[280px] flex-1">
                <div class="header">
                    <div class="h-title text-lg font-semibold">表格展示</div>
                    <div class="header-desc">数据列表</div>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <ui-button variant="primary" :disabled="loading" @click="emit('add')">新增数据</ui-button>
            </div>
        </div>

        <!-- Error -->
        <div v-if="error" class="state-box state-error">
            <div class="font-medium mb-1">加载失败</div>
            <div class="text-sm opacity-90">{{ error }}</div>
            <div class="mt-3">
                <ui-button variant="primary" :disabled="loading" @click="emit('retry')">重试</ui-button>
            </div>
        </div>

        <!-- Loading -->
        <div v-else-if="loading" class="state-box state-loading">
            <div class="font-medium">加载中…</div>
            <div class="text-sm opacity-90">正在请求数据，请稍候</div>
        </div>

        <!-- Empty -->
        <div v-else-if="rows.length === 0" class="state-box state-empty">
            <div class="font-medium">暂无数据</div>
            <div class="text-sm opacity-90">尝试调整筛选条件或重置查询</div>
        </div>

        <!-- Table -->
        <div v-else class="overflow-x-auto">
            <table class="data-table w-full border-collapse">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>姓名</th>
                        <th>邮箱</th>
                        <th>角色</th>
                        <th>状态</th>
                        <th>创建时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="r in rows" :key="r.id">
                        <td>{{ r.id }}</td>
                        <td>{{ r.name }}</td>
                        <td>{{ r.email }}</td>
                        <td>
                            <ui-tag :title="roleLabel(r.role)">
                                {{ roleLabel(r.role) }}
                            </ui-tag>
                        </td>
                        <td>
                            <ui-tag :variant="statusTagVariant(r.status)" :title="statusLabel(r.status)">
                                {{ statusLabel(r.status) }}
                            </ui-tag>
                        </td>
                        <td>{{ formatDate(r.createdAt) }}</td>
                        <td>
                            <div class="flex items-center gap-2">
                                <ui-button
                                    :variant="ROW_ACTIONS.edit.variant"
                                    size="small"
                                    :disabled="loading"
                                    :aria-label="`修改：${r.name}`"
                                    @click="emit('edit', r)"
                                >
                                    修改
                                </ui-button>
                                <ui-button
                                    :variant="ROW_ACTIONS.delete.variant"
                                    size="small"
                                    :disabled="loading"
                                    :aria-label="`删除：${r.name}`"
                                    @click="emit('delete', r)"
                                >
                                    删除
                                </ui-button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="mt-4 flex items-center justify-between gap-3 flex-wrap">
            <div class="text-sm text-[var(--muted-foreground)]">共 {{ total }} 条 · 第 {{ page }} / {{ totalPages }} 页</div>
            <div class="flex items-center gap-2 flex-wrap">
                <span class="text-sm text-[var(--muted-foreground)]">每页</span>
                <div class="pager-select">
                    <ui-select
                        v-model="pageSizeModel"
                        :options="pageSizeOptions"
                        option-label="label"
                        option-value="value"
                        placeholder="条数"
                        :disabled="loading"
                        size="small"
                    />
                </div>
                <span class="text-sm text-[var(--muted-foreground)] mr-2">条</span>

                <ui-button variant="blank" size="small" :disabled="loading || page <= 1" @click="emit('pageChange', page - 1)">上一页</ui-button>
                <ui-button variant="blank" size="small" :disabled="loading || page >= totalPages" @click="emit('pageChange', page + 1)">
                    下一页
                </ui-button>
            </div>
        </div>
    </ui-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import uiCard from '@/components/ui/ui-card.vue'
import uiButton from '@/components/ui/ui-button.vue'
import uiSelect from '@/components/ui/ui-select.vue'
import UiTag from '@/components/ui/ui-tag.vue'
import type { TableUserRow, UserRole, UserStatus } from '../types'
import type { UiButtonVariant } from '@/components/ui/ui-button.vue'

/**
 * DataTable（表格展示区）
 *
 * 职责：
 * - 展示：表格/分页/状态（loading/empty/error）
 * - 通过事件把“翻页/重试/改页大小”交给父组件处理
 */

const props = defineProps<{
    rows: TableUserRow[]
    loading: boolean
    error: string | null
    total: number
    page: number
    pageSize: number
    totalPages: number
    roleLabel: (role: UserRole) => string
    statusLabel: (status: UserStatus) => string
}>()

/**
 * 表格内的 tag 风格映射：
 * - 角色：soft（弱强调）
 * - 状态：active => station（强调），非 active => danger（告警）
 */
const statusTagVariant = (status: UserStatus): 'station' | 'danger' => (status === 'active' ? 'station' : 'danger')

/**
 * 行内“操作按钮”集中配置（模块化、可维护）：
 * - 这里的 variant 只描述语义，不绑定具体颜色；颜色由 ui-button + 当前主题统一决定
 * - 如需全局更换操作按钮风格，只改这一处即可
 */
const ROW_ACTIONS = {
    edit: { variant: 'primary' },
    delete: { variant: 'danger' },
} as const satisfies Record<'edit' | 'delete', { variant: UiButtonVariant }>

const emit = defineEmits<{
    add: []
    retry: []
    edit: [row: TableUserRow]
    delete: [row: TableUserRow]
    pageChange: [page: number]
    pageSizeChange: [pageSize: number]
}>()

const pageSizeModel = computed<string | number | null>({
    get: () => props.pageSize,
    set: v => {
        const value = Number(v)
        if (Number.isFinite(value)) emit('pageSizeChange', value)
    },
})

const pageSizeOptions = [
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '50', value: 50 },
] as const

const formatDate = (iso: string): string => {
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return iso
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
</script>

<style scoped lang="less">
.h-title {
    color: var(--foreground);
}

.header {
    display: inline-flex;
    align-items: baseline;
    gap: 10px;
    flex-wrap: wrap;
}

.header-desc {
    font-size: 14px;
    color: var(--muted-foreground);
}

.pager-select {
    width: 70px;
}

.pager-select :deep(.ui-select-wrapper) {
    width: 70px;
    min-width: 70px;
}

.pager-select :deep(.ui-select-trigger) {
    height: 32px;
    line-height: 32px;
}

.state-box {
    border: 1px solid var(--border);
    box-shadow: var(--shadow-xs);
    padding: 14px 12px;
    background: var(--card);
}

.state-error {
    border-color: rgba(239, 68, 68, 0.35);
    background: rgba(239, 68, 68, 0.06);
    color: var(--foreground);
}

.state-loading {
    background: rgba(59, 130, 246, 0.06);
}

.state-empty {
    background: rgba(148, 163, 184, 0.08);
}

.data-table {
    th {
        padding: 12px 16px;
        text-align: left;
        font-weight: 500;
        color: var(--foreground);
        border-bottom: 1px solid var(--border);
    }

    td {
        padding: 12px 16px;
        color: var(--foreground);
        border-bottom: 1px solid var(--border);
    }

    tbody tr {
        transition: background-color 0.2s ease;

        &:hover {
            background-color: var(--muted);
        }

        &:last-child td {
            border-bottom: none;
        }
    }
}
</style>
