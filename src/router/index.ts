import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import { simpleHomeRoutes } from './modules/simpleHome'
import { simpleChatRoutes } from './modules/simpleChat'
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

const blankLayoutRoutes: RouteRecordRaw[] = [
    ...simpleHomeRoutes.map(
        route =>
            ({
                path: route.path,
                component: () => import('@/layout/BlankLayout.vue'),
                children: [
                    {
                        path: '',
                        name: route.name,
                        meta: route.meta,
                        component: route.component,
                    },
                ],
            }) as RouteRecordRaw
    ),
    ...simpleChatRoutes.map(
        route =>
            ({
                path: route.path,
                component: () => import('@/layout/BlankLayout.vue'),
                children: [
                    {
                        path: '',
                        name: route.name,
                        meta: route.meta,
                        component: route.component,
                    },
                ],
            }) as RouteRecordRaw
    ),
    ...authRoutes.map(
        route =>
            ({
                path: route.path,
                component: () => import('@/layout/BlankLayout.vue'),
                children: [
                    {
                        path: '',
                        name: route.name,
                        meta: route.meta,
                        component: route.component,
                    },
                ],
            }) as RouteRecordRaw
    ),
]

const routes: RouteRecordRaw[] = [
    {
        path: ROUTE_PATHS.ROOT,
        redirect: () => getSavedRoute(),
    },
    ...blankLayoutRoutes,
    {
        path: ROUTE_PATHS.SIMPLE_TEMPLATE_HOME,
        name: 'DefaultLayout',
        component: () => import('@/layout/DefaultLayout.vue'),
        children: simpleTemplateRoutes,
    },
]

const router = createRouter({
    history: createWebHashHistory('/a/'),
    routes,
})

router.afterEach(to => {
    document.title = getDocumentTitleFromRoute(to)
})

if (import.meta.env.DEV) {
    validateNavPaths(router, SIDEBAR_NAV)
}

export default router
