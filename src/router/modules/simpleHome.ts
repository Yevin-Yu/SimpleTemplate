import type { RouteRecordRaw } from 'vue-router'

export const simpleHomeRoutes: RouteRecordRaw[] = [
    {
        path: '/simple-home',
        name: 'SimpleHome',
        component: () => import('@/views/SimpleHome/index.vue'),
    },
]
