import type { RouteRecordRaw } from 'vue-router'
import Home from '@/views/SimpleTemplate/Home.vue'

export const simpleTemplateRoutes: RouteRecordRaw[] = [
    {
        path: '/home',
        name: 'Home',
        component: Home,
    },
    {
        path: '/form-example',
        name: 'FormDemo',
        component: () => import('@/views/SimpleTemplate/demo/FormDemo.vue'),
    },
    {
        path: '/table-example',
        name: 'TableDemo',
        component: () => import('@/views/SimpleTemplate/demo/TableDemo.vue'),
    },
    {
        path: '/card-example',
        name: 'CardDemo',
        component: () => import('@/views/SimpleTemplate/demo/CardDemo.vue'),
    },
    {
        path: '/dashboard-example',
        name: 'DashboardDemo',
        component: () => import('@/views/SimpleTemplate/demo/DashboardDemo.vue'),
    },
    {
        path: '/base-components',
        name: 'BaseComponents',
        component: () => import('@/views/SimpleTemplate/example/BaseComponents.vue'),
    },
    {
        path: '/form-components',
        name: 'FormComponents',
        component: () => import('@/views/SimpleTemplate/example/FormComponents.vue'),
    },
]

