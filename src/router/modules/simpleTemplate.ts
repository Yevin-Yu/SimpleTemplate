import type { RouteRecordRaw } from 'vue-router'
import { ROUTE_PATHS } from '@/router/paths'

export const simpleTemplateRoutes: RouteRecordRaw[] = [
    {
        path: '',
        name: 'Home',
        meta: {
            title: '首页',
        },
        component: () => import('@/views/SimpleTemplate/Home.vue'),
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
    {
        path: ROUTE_PATHS.INPUT_COMPONENTS,
        name: 'InputComponents',
        meta: {
            title: '输入框组件',
        },
        component: () => import('@/views/SimpleTemplate/example/InputComponents.vue'),
    },
    {
        path: ROUTE_PATHS.ICON_COMPONENTS,
        name: 'IconComponents',
        meta: {
            title: '图标组件',
        },
        component: () => import('@/views/SimpleTemplate/example/IconComponents.vue'),
    },
    {
        path: ROUTE_PATHS.DIALOG_COMPONENTS,
        name: 'DialogComponents',
        meta: {
            title: '弹窗组件',
        },
        component: () => import('@/views/SimpleTemplate/example/DialogComponents.vue'),
    },
    {
        path: ROUTE_PATHS.TOAST_COMPONENTS,
        name: 'ToastComponents',
        meta: {
            title: '提示组件',
        },
        component: () => import('@/views/SimpleTemplate/example/ToastComponents.vue'),
    },
]
