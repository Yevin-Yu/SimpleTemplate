import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
    {
        path: '/',
        redirect: '/home',
        name: 'DefaultLayout',
        component: () => import('@/layout/DefaultLayout.vue'),
        children: [
            {
                path: '/',
                name: 'Home',
                component: Home,
            },
            {
                path: '/atom/button',
                name: 'Button',
                component: () => import('@/views/atom/button.vue'),
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
