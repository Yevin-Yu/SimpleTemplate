import 'vue-router'

/**
 * Vue Router 的 RouteMeta 类型增强：
 * - 在 routes 里写 meta 时能获得类型提示
 * - 在 to.meta 读取时也能有更明确的类型
 */
declare module 'vue-router' {
    interface RouteMeta {
        /** 页面标题（用于 document.title） */
        title?: string
        /** 是否需要登录（示例字段；后续可接入权限体系） */
        requiresAuth?: boolean
    }
}
