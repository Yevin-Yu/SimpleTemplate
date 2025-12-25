import type { RouteRecordRaw } from 'vue-router'
import { ROUTE_PATHS } from '@/router/paths'

export const simpleChatRoutes: RouteRecordRaw[] = [
    {
        path: ROUTE_PATHS.SIMPLE_CHAT,
        name: 'SimpleChat',
        meta: {
            title: 'Simple Chat',
        },
        component: () => import('@/views/SimpleChat/index.vue'),
    },
]

