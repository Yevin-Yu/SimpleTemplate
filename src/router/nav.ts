import type { Component } from 'vue'
import { ROUTE_PATHS } from '@/router/paths'
import { HomeIcon, ExampleIcon, FormIcon, TableIcon, CardIcon, DashboardIcon, ComponentsIcon, BaseIcon, ButtonIcon, TagIcon, SelectIcon } from '@/components/icons'

/**
 * 侧边栏导航菜单（Single Source of Truth）
 *
 * 目标：
 * - Sidebar 不再硬编码 path/icon/label
 * - 路由 path 统一使用 ROUTE_PATHS，避免字符串散落
 *
 * 说明：
 * - 这里仅描述“展示导航”，不等同于路由表（路由仍由 src/router/modules/* 负责）
 */
export interface NavItem {
    key: string
    /**
     * 展示文案：
     * - 叶子节点推荐不写（由对应路由 meta.title 自动派生）
     * - 分组节点建议保留（因为没有对应 route）
     */
    label?: string
    path?: string
    icon?: Component
    children?: NavItem[]
}

export const SIDEBAR_NAV: NavItem[] = [
    {
        key: 'home',
        path: ROUTE_PATHS.SIMPLE_TEMPLATE_HOME,
        icon: HomeIcon,
    },
    {
        key: 'components',
        label: '组件示例',
        icon: ComponentsIcon,
        children: [
            {
                key: 'base',
                path: ROUTE_PATHS.BASE_COMPONENTS,
                icon: BaseIcon,
            },
            {
                key: 'button',
                path: ROUTE_PATHS.BUTTON_COMPONENTS,
                icon: ButtonIcon,
            },
            {
                key: 'card-components',
                path: ROUTE_PATHS.CARD_COMPONENTS,
                icon: CardIcon,
            },
            {
                key: 'select-components',
                path: ROUTE_PATHS.SELECT_COMPONENTS,
                icon: SelectIcon,
            },
            {
                key: 'tag',
                path: ROUTE_PATHS.TAG_COMPONENTS,
                icon: TagIcon,
            },
        ],
    },
    {
        key: 'example',
        label: '示例演示',
        icon: ExampleIcon,
        children: [
            {
                key: 'form',
                path: ROUTE_PATHS.FORM_DEMO,
                icon: FormIcon,
            },
            {
                key: 'table',
                path: ROUTE_PATHS.TABLE_DEMO,
                icon: TableIcon,
            },
            {
                key: 'card',
                path: ROUTE_PATHS.CARD_DEMO,
                icon: CardIcon,
            },
            {
                key: 'dashboard',
                path: ROUTE_PATHS.DASHBOARD_DEMO,
                icon: DashboardIcon,
            },
        ],
    },
]
