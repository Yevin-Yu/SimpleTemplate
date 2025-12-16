import { createRouter, createWebHistory } from 'vue-router'
import { simpleHomeRoutes } from './modules/simpleHome'
import { simpleTemplateRoutes } from './modules/simpleTemplate'

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
        children: simpleHomeRoutes,
    },
    {
        path: '/home',
        name: 'DefaultLayout',
        component: () => import('@/layout/DefaultLayout.vue'),
        children: simpleTemplateRoutes,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
