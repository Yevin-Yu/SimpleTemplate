import { createRouter, createWebHistory } from 'vue-router'
import { simpleHomeRoutes } from './modules/simpleHome'
import { simpleTemplateRoutes } from './modules/simpleTemplate'
import { authRoutes } from './modules/auth'
import { STORAGE_KEYS, safeGetItem } from '@/shared'
import { ROUTE_PATHS } from '@/router/paths'
import { normalizeSelectedProject } from '@/features/project/projectSelection'
import { SIDEBAR_NAV } from '@/router/nav'
import { validateNavPaths } from '@/router/validate'
import { getDocumentTitleFromRoute } from '@/router/meta'

const getSavedRoute = (): string => {
    const stored = safeGetItem(STORAGE_KEYS.SELECTED_PROJECT)
    return normalizeSelectedProject(stored) || ROUTE_PATHS.SIMPLE_TEMPLATE_HOME
}

const routes = [
    {
        path: ROUTE_PATHS.ROOT,
        redirect: () => getSavedRoute(),
        name: 'BlankLayout',
        component: () => import('@/layout/BlankLayout.vue'),
        children: [...simpleHomeRoutes, ...authRoutes],
    },
    {
        path: ROUTE_PATHS.SIMPLE_TEMPLATE_HOME,
        name: 'DefaultLayout',
        component: () => import('@/layout/DefaultLayout.vue'),
        children: simpleTemplateRoutes,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.afterEach(to => {
    document.title = getDocumentTitleFromRoute(to)
})

if (import.meta.env.DEV) {
    validateNavPaths(router, SIDEBAR_NAV)
}

export default router
