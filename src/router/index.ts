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
                path: '/home',
                name: 'Home',
                component: Home,
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
