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
        path: ROUTE_PATHS.TABLE_DATA_TEMPLATE,
        name: 'TableDataTemplate',
        meta: {
            title: '表格模板',
        },
        component: () => import('@/views/SimpleTemplate/templates/TableDataTemplate/index.vue'),
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
    {
        path: ROUTE_PATHS.CARD_COMPONENTS,
        name: 'CardComponents',
        meta: {
            title: '卡片组件',
        },
        component: () => import('@/views/SimpleTemplate/example/CardComponents.vue'),
    },
    {
        path: ROUTE_PATHS.SELECT_COMPONENTS,
        name: 'SelectComponents',
        meta: {
            title: '下拉菜单组件',
        },
        component: () => import('@/views/SimpleTemplate/example/SelectComponents.vue'),
    },
    {
        path: ROUTE_PATHS.SWITCH_COMPONENTS,
        name: 'SwitchComponents',
        meta: {
            title: '开关组件',
        },
        component: () => import('@/views/SimpleTemplate/example/SwitchComponents.vue'),
    },
    {
        path: ROUTE_PATHS.CODE_BLOCK_COMPONENTS,
        name: 'CodeBlockComponents',
        meta: {
            title: '代码块组件',
        },
        component: () => import('@/views/SimpleTemplate/example/CodeBlockComponents.vue'),
    },
    {
        path: ROUTE_PATHS.CONTEXT_MENU_COMPONENTS,
        name: 'ContextMenuComponents',
        meta: {
            title: '右键菜单组件',
        },
        component: () => import('@/views/SimpleTemplate/example/ContextMenuComponents.vue'),
    },
]
