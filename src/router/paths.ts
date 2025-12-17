/**
 * 统一管理路由 path，避免在组件/路由/store 中硬编码字符串。
 * 约定：只放 path（不放 name），并保持与现有路由完全一致。
 */
export const ROUTE_PATHS = {
    ROOT: '/',

    // module entry
    SIMPLE_HOME: '/simple-home',
    SIMPLE_TEMPLATE_HOME: '/home',

    // demos
    FORM_DEMO: '/form-example',
    TABLE_DEMO: '/table-example',
    CARD_DEMO: '/card-example',
    DASHBOARD_DEMO: '/dashboard-example',

    // examples
    BASE_COMPONENTS: '/base-components',
    BUTTON_COMPONENTS: '/button-components',
    TAG_COMPONENTS: '/tag-components',
    CARD_COMPONENTS: '/card-components',
    SELECT_COMPONENTS: '/select-components',
    SWITCH_COMPONENTS: '/switch-components',
    CODE_BLOCK_COMPONENTS: '/code-block-components',
    CONTEXT_MENU_COMPONENTS: '/context-menu-components',
} as const
