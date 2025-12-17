/**
 * 表格数据展示模板 - 类型定义
 *
 * 约定：
 * - 类型集中在一个文件，便于复用与避免循环依赖
 * - 查询参数与分页参数分离，便于后续对接真实 API
 */

export type UserStatus = 'active' | 'inactive'

export type UserRole = 'admin' | 'editor' | 'user'

export interface TableUserRow {
    id: number
    name: string
    email: string
    role: UserRole
    status: UserStatus
    createdAt: string // ISO string，展示时再格式化
}

export interface SearchFormState {
    keyword: string
    role: UserRole | 'all'
    status: UserStatus | 'all'
}

export interface PaginationState {
    page: number
    pageSize: number
}
