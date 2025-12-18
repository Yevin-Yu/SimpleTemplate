/**
 * 统一管理路由 path，避免在组件/路由/store 中硬编码字符串。
 * 约定：只放 path（不放 name），并保持与现有路由完全一致。
 */
export const ROUTE_PATHS = {
    ROOT: '/',

    // auth
    LOGIN: '/login',

    // module entry
    SIMPLE_HOME: '/simple-home',
    SIMPLE_TEMPLATE_HOME: '/home',

    // templates
    TABLE_DATA_TEMPLATE: '/table-data-template',

    // examples
    BUTTON_COMPONENTS: '/button-components',
    TAG_COMPONENTS: '/tag-components',
    CARD_COMPONENTS: '/card-components',
    SELECT_COMPONENTS: '/select-components',
    SWITCH_COMPONENTS: '/switch-components',
    CODE_BLOCK_COMPONENTS: '/code-block-components',
    CONTEXT_MENU_COMPONENTS: '/context-menu-components',
    INPUT_COMPONENTS: '/input-components',
    ICON_COMPONENTS: '/icon-components',
    DIALOG_COMPONENTS: '/dialog-components',
} as const
