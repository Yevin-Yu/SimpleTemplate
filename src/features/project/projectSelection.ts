import { ROUTE_PATHS } from '@/router/paths'

/**
 * 项目/模块选择（Single Source of Truth）
 *
 * 背景：
 * - Header 的项目切换（store）与 router 初始重定向都依赖“选中的项目”
 * - 历史上 localStorage 可能存的是 label 或 value，需要统一兼容
 *
 * 这里提供：
 * - 默认选项列表
 * - 兼容旧数据的规范化函数
 */

/**
 * 注意：这里让 ProjectOption 继承 Record<string, unknown>，
 * 以便能直接作为 ui-select 的 option（UiSelectOption）使用。
 */
export type ProjectOption = Record<string, unknown> & {
    label: string
    value: string
    icon: string
}

export const DEFAULT_SELECTED_PROJECT = ROUTE_PATHS.SIMPLE_TEMPLATE_HOME

export const DEFAULT_PROJECT_OPTIONS: ProjectOption[] = [
    { label: 'Simple Home', value: ROUTE_PATHS.SIMPLE_HOME, icon: 'home' },
    { label: 'Simple Template', value: ROUTE_PATHS.SIMPLE_TEMPLATE_HOME, icon: 'template' },
]

/**
 * 将 storage 中读取的值规范化为“路由 path”。
 * - 支持旧数据：label 或 value
 * - 未命中时回退到默认
 */
export function normalizeSelectedProject(raw: string | undefined): string {
    if (!raw) return DEFAULT_SELECTED_PROJECT

    const option = DEFAULT_PROJECT_OPTIONS.find(opt => opt.label === raw || opt.value === raw)
    return option?.value ?? raw ?? DEFAULT_SELECTED_PROJECT
}
