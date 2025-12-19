import type { RouteLocationNormalized } from 'vue-router'

export const APP_TITLE = 'Simple Template'

export function getDocumentTitleFromRoute(to: RouteLocationNormalized): string {
    const title = typeof to.meta?.title === 'string' ? to.meta.title : ''
    return title ? `${title} - ${APP_TITLE}` : APP_TITLE
}
