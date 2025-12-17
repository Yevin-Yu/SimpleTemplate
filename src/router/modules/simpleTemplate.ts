import type { RouteRecordRaw } from 'vue-router'
import { ROUTE_PATHS } from '@/router/paths'

export const simpleTemplateRoutes: RouteRecordRaw[] = [
    {
        path: ROUTE_PATHS.SIMPLE_TEMPLATE_HOME,
        name: 'Home',
        meta: {
            title: '首页',
        },
        component: () => import('@/views/SimpleTemplate/Home.vue'),
    },
    {
        path: ROUTE_PATHS.FORM_DEMO,
        name: 'FormDemo',
        meta: {
            title: '表单示例',
        },
        component: () => import('@/views/SimpleTemplate/demo/FormDemo.vue'),
    },
    {
        path: ROUTE_PATHS.TABLE_DEMO,
        name: 'TableDemo',
        meta: {
            title: '表格示例',
        },
        component: () => import('@/views/SimpleTemplate/demo/TableDemo.vue'),
    },
    {
        path: ROUTE_PATHS.CARD_DEMO,
        name: 'CardDemo',
        meta: {
            title: '卡片示例',
        },
        component: () => import('@/views/SimpleTemplate/demo/CardDemo.vue'),
    },
    {
        path: ROUTE_PATHS.DASHBOARD_DEMO,
        name: 'DashboardDemo',
        meta: {
            title: '仪表盘示例',
        },
        component: () => import('@/views/SimpleTemplate/demo/DashboardDemo.vue'),
    },
    {
        path: ROUTE_PATHS.BASE_COMPONENTS,
        name: 'BaseComponents',
        meta: {
            title: '基础组件',
        },
        component: () => import('@/views/SimpleTemplate/example/BaseComponents.vue'),
    },
    {
        path: ROUTE_PATHS.FORM_COMPONENTS,
        name: 'FormComponents',
        meta: {
            title: '表单组件',
        },
        component: () => import('@/views/SimpleTemplate/example/FormComponents.vue'),
    },
    {
        path: ROUTE_PATHS.BUTTON_COMPONENTS,
        name: 'ButtonComponents',
        meta: {
            title: '按钮组件',
        },
        component: () => import('@/views/SimpleTemplate/example/ButtonComponents.vue'),
    },
    {
        path: ROUTE_PATHS.TAG_COMPONENTS,
        name: 'TagComponents',
        meta: {
            title: '标签组件',
        },
        component: () => import('@/views/SimpleTemplate/example/TagComponents.vue'),
    },
]
