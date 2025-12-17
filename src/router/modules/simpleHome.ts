import type { RouteRecordRaw } from 'vue-router'
import { ROUTE_PATHS } from '@/router/paths'

export const simpleHomeRoutes: RouteRecordRaw[] = [
    {
        path: ROUTE_PATHS.SIMPLE_HOME,
        name: 'SimpleHome',
        meta: {
            title: 'Simple Home',
        },
        component: () => import('@/views/SimpleHome/index.vue'),
    },
]
