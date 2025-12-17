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
            <table class="w-full border-collapse">
                <thead>
                    <tr class="border-b border-gray-200">
                        <th class="px-4 py-3 text-left font-semibold">ID</th>
                        <th class="px-4 py-3 text-left font-semibold">姓名</th>
                        <th class="px-4 py-3 text-left font-semibold">邮箱</th>
                        <th class="px-4 py-3 text-left font-semibold">角色</th>
                        <th class="px-4 py-3 text-left font-semibold">状态</th>
                        <th class="px-4 py-3 text-left font-semibold">创建时间</th>
                        <th class="px-4 py-3 text-left font-semibold">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="r in rows" :key="r.id" class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td class="px-4 py-3">{{ r.id }}</td>
                        <td class="px-4 py-3">{{ r.name }}</td>
                        <td class="px-4 py-3">{{ r.email }}</td>
                        <td class="px-4 py-3">
                            <span class="badge badge-role">{{ roleLabel(r.role) }}</span>
                        </td>
                        <td class="px-4 py-3">
                            <span class="badge" :class="r.status === 'active' ? 'badge-success' : 'badge-muted'">
                                {{ statusLabel(r.status) }}
                            </span>
                        </td>
                        <td class="px-4 py-3">{{ formatDate(r.createdAt) }}</td>
                        <td class="px-4 py-3">
                            <div class="flex items-center gap-2">
                                <ui-button variant="blank" size="small" :disabled="loading" @click="emit('edit', r)">修改</ui-button>
                                <ui-button variant="blank" size="small" :disabled="loading" @click="emit('delete', r)">删除</ui-button>
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
                    />
                </div>
                <span class="text-sm text-[var(--muted-foreground)] mr-2">条</span>

                <ui-button variant="blank" size="small" :disabled="loading || page <= 1" @click="emit('pageChange', page - 1)">上一页</ui-button>
                <ui-button variant="blank" size="small" :disabled="loading || page >= totalPages" @click="emit('pageChange', page + 1)"
                    >下一页</ui-button
                >
            </div>
        </div>
    </ui-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import uiCard from '@/components/ui/ui-card.vue'
import uiButton from '@/components/ui/ui-button.vue'
import uiSelect from '@/components/ui/ui-select.vue'
import type { TableUserRow, UserRole, UserStatus } from '../types'

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
    { label: '10 条/页', value: 10 },
    { label: '20 条/页', value: 20 },
    { label: '50 条/页', value: 50 },
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
    width: 120px;
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

.badge {
    display: inline-flex;
    align-items: center;
    height: 22px;
    padding: 0 8px;
    border-radius: 999px;
    font-size: 12px;
    border: 1px solid var(--border);
}

.badge-role {
    background: rgba(59, 130, 246, 0.12);
    color: rgba(30, 64, 175, 0.95);
    border-color: rgba(59, 130, 246, 0.25);
}

.badge-success {
    background: rgba(34, 197, 94, 0.12);
    color: rgba(22, 101, 52, 0.95);
    border-color: rgba(34, 197, 94, 0.25);
}

.badge-muted {
    background: rgba(148, 163, 184, 0.18);
    color: rgba(51, 65, 85, 0.9);
    border-color: rgba(148, 163, 184, 0.35);
}
</style>
