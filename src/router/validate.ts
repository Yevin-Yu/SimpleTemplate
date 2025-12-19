import type { Router } from 'vue-router'
import type { NavItem } from '@/router/nav'

export function validateNavPaths(router: Router, nav: NavItem[]): void {
    const routePaths = new Set(router.getRoutes().map(r => r.path))

    const navPaths: string[] = []
    const walk = (items: NavItem[]) => {
        for (const item of items) {
            if (item.path) navPaths.push(item.path)
            if (item.children?.length) walk(item.children)
        }
    }
    walk(nav)

    const missing = navPaths.filter(p => !routePaths.has(p))
    if (missing.length === 0) return

    console.warn(
        `[router] Sidebar nav 引用了不存在的路由 path：\n` +
            missing.map(p => `- ${p}`).join('\n') +
            `\n请检查 src/router/nav.ts 与 src/router/modules/* 是否一致。`
    )
}
