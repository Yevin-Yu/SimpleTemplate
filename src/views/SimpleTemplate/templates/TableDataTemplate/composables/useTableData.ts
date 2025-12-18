import { computed, reactive, ref, watch } from 'vue'
import type { PaginationState, SearchFormState, TableUserRow, UserRole, UserStatus } from '../types'

/**
 * 表格数据展示模板 - 数据层
 * 组件只负责展示，数据获取和状态管理集中在此
 */

const ROLE_LABEL: Record<UserRole, string> = {
    admin: '管理员',
    editor: '编辑',
    user: '用户',
}

const STATUS_LABEL: Record<UserStatus, string> = {
    active: '启用',
    inactive: '停用',
}

const seedRows = (): TableUserRow[] => {
    const now = Date.now()
    const roles: UserRole[] = ['admin', 'editor', 'user']
    const statuses: UserStatus[] = ['active', 'inactive']

    // 这里用确定性数据（不依赖随机），方便演示与测试复现
    return Array.from({ length: 57 }).map((_, idx) => {
        const id = idx + 1
        // 在 noUncheckedIndexedAccess 下，数组下标访问会是可选值；这里明确保证存在
        const role = roles[id % roles.length]!
        const status = statuses[id % statuses.length]!
        const createdAt = new Date(now - id * 24 * 60 * 60 * 1000).toISOString()
        return {
            id,
            name: `用户${id}`,
            email: `user${id}@example.com`,
            role,
            status,
            createdAt,
        }
    })
}

// 模拟“服务端查询”
const mockFetch = async (params: {
    dataset: TableUserRow[]
    form: SearchFormState
    pagination: PaginationState
}): Promise<{ total: number; list: TableUserRow[] }> => {
    const { dataset, form, pagination } = params

    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 450))

    const keyword = form.keyword.trim().toLowerCase()

    const all = dataset
        .filter(r => (form.role === 'all' ? true : r.role === form.role))
        .filter(r => (form.status === 'all' ? true : r.status === form.status))
        .filter(r => {
            if (!keyword) return true
            return r.name.toLowerCase().includes(keyword) || r.email.toLowerCase().includes(keyword)
        })

    const total = all.length
    const start = (pagination.page - 1) * pagination.pageSize
    const end = start + pagination.pageSize
    const list = all.slice(start, end)
    return { total, list }
}

export const useTableData = () => {
    /**
     * 内存数据源（模板常见做法）
     * - 在真实项目里这里会被 API 返回的数据替代，或接入 store/缓存层
     * - 之所以不每次都 seedRows()：为了让“新增/修改/删除”能真实生效
     */
    const dataset = ref<TableUserRow[]>(seedRows())

    const form = reactive<SearchFormState>({
        keyword: '',
        role: 'all',
        status: 'all',
    })

    const pagination = reactive<PaginationState>({
        page: 1,
        pageSize: 10,
    })

    const loading = ref(false)
    const error = ref<string | null>(null)

    const total = ref(0)
    const rows = ref<TableUserRow[]>([])

    const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pagination.pageSize)))

    const roleLabel = (role: UserRole) => ROLE_LABEL[role]
    const statusLabel = (status: UserStatus) => STATUS_LABEL[status]

    /**
     * 拉取列表数据
     *
     * 说明：
     * - 真实项目可替换为调用后端 API
     * - 这里内置“空页回退”：当删除导致当前页没有数据时，自动回退到上一页
     */
    const fetchData = async () => {
        loading.value = true
        error.value = null
        try {
            const res = await mockFetch({
                dataset: dataset.value,
                form: { ...form },
                pagination: { ...pagination },
            })
            // 空页回退：例如在最后一页删除最后一条数据，避免出现“有 total 但当前页为空”
            if (res.total > 0 && res.list.length === 0 && pagination.page > 1) {
                pagination.page = Math.max(1, pagination.page - 1)
                const retry = await mockFetch({
                    dataset: dataset.value,
                    form: { ...form },
                    pagination: { ...pagination },
                })
                total.value = retry.total
                rows.value = retry.list
            } else {
                total.value = res.total
                rows.value = res.list
            }
        } catch (e) {
            const message = e instanceof Error ? e.message : '未知错误'
            error.value = message
            total.value = 0
            rows.value = []
        } finally {
            loading.value = false
        }
    }

    const reset = async () => {
        form.keyword = ''
        form.role = 'all'
        form.status = 'all'
        pagination.page = 1
        await fetchData()
    }

    const submit = async () => {
        pagination.page = 1
        await fetchData()
    }

    const setPage = async (page: number) => {
        const next = Math.min(Math.max(1, page), totalPages.value)
        if (next === pagination.page) return
        pagination.page = next
        await fetchData()
    }

    const setPageSize = async (pageSize: number) => {
        if (pageSize === pagination.pageSize) return
        pagination.pageSize = pageSize
        pagination.page = 1
        await fetchData()
    }

    const addRow = async (data: { name: string; email: string; role: UserRole; status: UserStatus }) => {
        const nextId = dataset.value.reduce((max, r) => Math.max(max, r.id), 0) + 1
        const now = new Date().toISOString()
        dataset.value = [
            {
                id: nextId,
                name: data.name,
                email: data.email,
                role: data.role,
                status: data.status,
                createdAt: now,
            },
            ...dataset.value,
        ]
        await fetchData()
    }

    /**
     * 模板里的“修改”示例：
     * - 这里用“状态切换”代替弹窗编辑（真实项目可替换为 Drawer/Dialog 表单）
     */
    const editRow = async (row: TableUserRow) => {
        dataset.value = dataset.value.map(r => {
            if (r.id !== row.id) return r
            return {
                ...r,
                status: r.status === 'active' ? 'inactive' : 'active',
            }
        })
        await fetchData()
    }

    const deleteRow = async (row: TableUserRow) => {
        dataset.value = dataset.value.filter(r => r.id !== row.id)
        await fetchData()
    }

    // “最佳实践”：当页大小变动/或 total 变动导致页码越界时，自动修正
    watch(
        () => [total.value, pagination.pageSize],
        () => {
            if (pagination.page > totalPages.value) pagination.page = totalPages.value
        }
    )

    return {
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
    }
}
