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
                    @add="showAddDialog = true"
                    @edit="editRow"
                    @delete="onDelete"
                    @page-change="setPage"
                    @page-size-change="setPageSize"
                />
            </div>
        </div>

        <!-- 新增数据弹窗 -->
        <ui-dialog v-model="showAddDialog" title="新增用户" size="medium">
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-[var(--foreground)] mb-2">姓名</label>
                    <ui-input v-model="addForm.name" placeholder="请输入姓名" :error="addFormErrors.name" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-[var(--foreground)] mb-2">邮箱</label>
                    <ui-input v-model="addForm.email" type="email" placeholder="请输入邮箱" :error="addFormErrors.email" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-[var(--foreground)] mb-2">角色</label>
                    <ui-select
                        v-model="addForm.role"
                        :options="ROLE_OPTIONS"
                        option-label="label"
                        option-value="value"
                        placeholder="请选择角色"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-[var(--foreground)] mb-2">状态</label>
                    <ui-select
                        v-model="addForm.status"
                        :options="STATUS_OPTIONS"
                        option-label="label"
                        option-value="value"
                        placeholder="请选择状态"
                    />
                </div>
            </div>

            <template #footer>
                <ui-button variant="blank" :disabled="loading" @click="handleAddCancel">取消</ui-button>
                <ui-button variant="primary" :disabled="loading" @click="handleAddSubmit">确认</ui-button>
            </template>
        </ui-dialog>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import SearchPanel from './components/SearchPanel.vue'
import DataTable from './components/DataTable.vue'
import uiDialog from '@/components/ui/ui-dialog.vue'
import uiInput from '@/components/ui/ui-input.vue'
import uiSelect from '@/components/ui/ui-select.vue'
import uiButton from '@/components/ui/ui-button.vue'
import { useTableData } from './composables/useTableData'
import { useAddForm } from './composables/useAddForm'
import { ROLE_OPTIONS, STATUS_OPTIONS } from './constants'
import type { SearchFormState, TableUserRow } from './types'

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

const formModel = computed<SearchFormState>({
    get: () => ({ ...form }),
    set: v => {
        form.keyword = v.keyword
        form.role = v.role
        form.status = v.status
    },
})

const showAddDialog = ref(false)
const { form: addForm, errors: addFormErrors, validate: validateAddForm, reset: resetAddForm } = useAddForm()

onMounted(() => {
    fetchData()
})

const onDelete = async (row: TableUserRow) => {
    const ok = window.confirm(`确定删除「${row.name}」吗？`)
    if (!ok) return
    await deleteRow(row)
}

const handleAddCancel = () => {
    showAddDialog.value = false
    resetAddForm()
}

const handleAddSubmit = async () => {
    if (!validateAddForm()) return

    await addRow({
        name: addForm.name.trim(),
        email: addForm.email.trim(),
        role: addForm.role!,
        status: addForm.status!,
    })

    handleAddCancel()
}
</script>

<style scoped lang="less">
.table-data-template-container {
    background-color: var(--background);
}

.h-title {
    color: var(--foreground);
}

.space-y-4 > * + * {
    margin-top: 16px;
}
</style>
