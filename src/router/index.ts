import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

// 获取保存的项目路由
const getSavedRoute = (): string => {
    const STORAGE_KEY = 'simple-template-selected-project'
    const defaultOptions = [
        { label: 'Simple Home', value: '/simple-home' },
        { label: 'Simple Template', value: '/home' },
    ]

    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            // 兼容旧数据：如果是 label，转换为 value
            const option = defaultOptions.find(opt => opt.label === stored || opt.value === stored)
            return option?.value || stored
        }
    } catch (error) {
        console.error('Failed to load saved project:', error)
    }

    return '/home' // 默认路由
}

const routes = [
    {
        path: '/',
        redirect: () => getSavedRoute(),
        name: 'BlankLayout',
        component: () => import('@/layout/BlankLayout.vue'),
        children: [
            {
                path: '/simple-home',
                name: 'SimpleHome',
                component: () => import('@/views/SimpleHome/index.vue'),
            },
        ],
    },
    {
        path: '/home',
        name: 'DefaultLayout',
        component: () => import('@/layout/DefaultLayout.vue'),
        children: [
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
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
