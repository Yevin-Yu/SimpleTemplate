import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
    {
        path: '/',
        redirect: '/simple-home',
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
