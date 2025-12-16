import type { RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'

export const simpleTemplateRoutes: RouteRecordRaw[] = [
    {
        path: '/home',
        name: 'Home',
        component: Home,
    },
    {
        path: '/form-example',
        name: 'FormDemo',
        component: () => import('@/views/demo/FormDemo.vue'),
    },
    {
        path: '/table-example',
        name: 'TableDemo',
        component: () => import('@/views/demo/TableDemo.vue'),
    },
    {
        path: '/card-example',
        name: 'CardDemo',
        component: () => import('@/views/demo/CardDemo.vue'),
    },
    {
        path: '/dashboard-example',
        name: 'DashboardDemo',
        component: () => import('@/views/demo/DashboardDemo.vue'),
    },
    {
        path: '/base-components',
        name: 'BaseComponents',
        component: () => import('@/views/example/BaseComponents.vue'),
    },
    {
        path: '/form-components',
        name: 'FormComponents',
        component: () => import('@/views/example/FormComponents.vue'),
    },
]

