import type { Component } from 'vue'
import { ROUTE_PATHS } from '@/router/paths'
import {
    HomeIcon,
    ExampleIcon,
    TableIcon,
    CardIcon,
    ComponentsIcon,
    ButtonIcon,
    TagIcon,
    SelectIcon,
    SwitchIcon,
    CodeBlockIcon,
    ContextMenuIcon,
    InputIcon,
    SettingsIcon,
} from '@/components/icons'

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
                key: 'input-components',
                path: ROUTE_PATHS.INPUT_COMPONENTS,
                icon: InputIcon,
            },
            {
                key: 'switch-components',
                path: ROUTE_PATHS.SWITCH_COMPONENTS,
                icon: SwitchIcon,
            },
            {
                key: 'code-block-components',
                path: ROUTE_PATHS.CODE_BLOCK_COMPONENTS,
                icon: CodeBlockIcon,
            },
            {
                key: 'context-menu-components',
                path: ROUTE_PATHS.CONTEXT_MENU_COMPONENTS,
                icon: ContextMenuIcon,
            },
            {
                key: 'tag',
                path: ROUTE_PATHS.TAG_COMPONENTS,
                icon: TagIcon,
            },
            {
                key: 'icon-components',
                path: ROUTE_PATHS.ICON_COMPONENTS,
                icon: ExampleIcon,
            },
            {
                key: 'dialog-components',
                path: ROUTE_PATHS.DIALOG_COMPONENTS,
                icon: CardIcon,
            },
        ],
    },
    {
        key: 'templates',
        label: '模板演示',
        icon: ExampleIcon,
        children: [
            {
                key: 'table-data-template',
                path: ROUTE_PATHS.TABLE_DATA_TEMPLATE,
                icon: TableIcon,
            },
        ],
    },
]
