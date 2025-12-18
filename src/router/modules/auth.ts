import type { RouteRecordRaw } from 'vue-router'
import { ROUTE_PATHS } from '@/router/paths'

/**
 * 认证相关路由模块
 *
 * 说明：
 * - 登录、注册、忘记密码等认证相关页面的路由配置
 * - 使用 BlankLayout 布局（无侧边栏和顶部导航）
 */
export const authRoutes: RouteRecordRaw[] = [
    {
        path: ROUTE_PATHS.LOGIN,
        name: 'Login',
        meta: {
            title: '登录',
        },
        component: () => import('@/views/Login/index.vue'),
    },
]
