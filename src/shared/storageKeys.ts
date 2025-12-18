/**
 * localStorage key 统一管理
 * 命名约定：全大写 + 下划线，值保持现有数据兼容性
 */
export const STORAGE_KEYS = {
    THEME: 'simple-app-theme',
    SELECTED_PROJECT: 'simple-template-selected-project',
    REMEMBERED_USERNAME: 'simple-app-remembered-username',
} as const
