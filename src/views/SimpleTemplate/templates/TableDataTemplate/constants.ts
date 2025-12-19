/**
 * 表格数据模板 - 常量定义
 */

import type { UserRole, UserStatus } from './types'

export const ROLE_OPTIONS = [
    { label: '管理员', value: 'admin' },
    { label: '编辑', value: 'editor' },
    { label: '用户', value: 'user' },
] as const satisfies readonly Array<{ label: string; value: UserRole }>

export const STATUS_OPTIONS = [
    { label: '启用', value: 'active' },
    { label: '停用', value: 'inactive' },
] as const satisfies readonly Array<{ label: string; value: UserStatus }>

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
