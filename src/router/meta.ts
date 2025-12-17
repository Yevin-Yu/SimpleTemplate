import type { RouteLocationNormalized } from 'vue-router'

export const APP_TITLE = 'Simple Template'

/**
 * 从路由 meta 生成页面标题。
 * 约定：meta.title 存“页面名”，最终标题为 `${title} - ${APP_TITLE}`。
 */
export function getDocumentTitleFromRoute(to: RouteLocationNormalized): string {
    const title = typeof to.meta?.title === 'string' ? to.meta.title : ''
    return title ? `${title} - ${APP_TITLE}` : APP_TITLE
}
