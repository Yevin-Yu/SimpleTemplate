/**
 * 统一管理 localStorage 的 key，避免散落在各处导致“改一处漏一处”。
 * 命名约定：全大写 + 下划线，值保持现有线上数据兼容（不要随意改动）。
 */
export const STORAGE_KEYS = {
    /** 当前主题（default/dark） */
    THEME: 'simple-app-theme',
    /** 当前选中的项目/模块（路由 path，兼容旧数据可能是 label） */
    SELECTED_PROJECT: 'simple-template-selected-project',
} as const
