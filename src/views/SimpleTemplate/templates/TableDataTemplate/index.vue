<template>
    <div class="table-data-template-container h-full w-full p-6 overflow-auto">
        <div class="w-full">
            <h1 class="h-title text-3xl font-bold mb-6">表格模板</h1>

            <!-- 搜索区（模块化） -->
            <SearchPanel v-model="formModel" :loading="loading" @submit="submit" @reset="reset" />

            <!-- 表格区（模块化） -->
            <div class="mt-6">
                <DataTable
                    :rows="rows"
                    :loading="loading"
                    :error="error"
                    :total="total"
                    :page="pagination.page"
                    :page-size="pagination.pageSize"
                    :total-pages="totalPages"
                    :role-label="roleLabel"
                    :status-label="statusLabel"
                    @retry="fetchData"
                    @add="addRow"
                    @edit="editRow"
                    @delete="onDelete"
                    @page-change="setPage"
                    @page-size-change="setPageSize"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import SearchPanel from './components/SearchPanel.vue'
import DataTable from './components/DataTable.vue'
import { useTableData } from './composables/useTableData'
import type { SearchFormState, TableUserRow } from './types'

/**
 * TableDataTemplate（表格模板页）
 *
 * 结构说明（资深前端常见组织方式）：
 * - 页面（index.vue）只负责“编排”：组合 SearchPanel + DataTable
 * - 数据与状态（查询/分页/loading/error）集中在 composable：useTableData
 * - 子组件用 props + emits 通信，避免隐式依赖与耦合
 */

const {
    form,
    pagination,
    loading,
    error,
    total,
    rows,
    totalPages,
    roleLabel,
    statusLabel,
    fetchData,
    submit,
    reset,
    setPage,
    setPageSize,
    addRow,
    editRow,
    deleteRow,
} = useTableData()

// v-model 需要一个可替换引用；这里用 computed 做一层“表单快照”
const formModel = computed<SearchFormState>({
    get: () => ({ ...form }),
    set: v => {
        form.keyword = v.keyword
        form.role = v.role
        form.status = v.status
    },
})

onMounted(() => {
    // 首次进入页面自动拉取
    fetchData()
})

const onDelete = async (row: TableUserRow) => {
    const ok = window.confirm(`确定删除「${row.name}」吗？`)
    if (!ok) return
    await deleteRow(row)
}
</script>

<style scoped lang="less">
.table-data-template-container {
    background-color: var(--background);
}

.h-title {
    color: var(--foreground);
}
</style>
