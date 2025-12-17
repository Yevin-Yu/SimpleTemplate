// 图标组件导出
export { default as SettingsIcon } from './SettingsIcon.vue'
export { default as LogOutIcon } from './LogOutIcon.vue'
export { default as ShareIcon } from './ShareIcon.vue'
export { default as GitHubIcon } from './GitHubIcon.vue'
export { default as SwitchOnIcon } from './SwitchOnIcon.vue'
export { default as SwitchOffIcon } from './SwitchOffIcon.vue'
export { default as HomeIcon } from './HomeIcon.vue'
export { default as ExampleIcon } from './ExampleIcon.vue'
export { default as FormIcon } from './FormIcon.vue'
export { default as TableIcon } from './TableIcon.vue'
export { default as CardIcon } from './CardIcon.vue'
export { default as DashboardIcon } from './DashboardIcon.vue'
export { default as ComponentsIcon } from './ComponentsIcon.vue'
export { default as BaseIcon } from './BaseIcon.vue'
export { default as ButtonIcon } from './ButtonIcon.vue'
export { default as CopyIcon } from './CopyIcon.vue'
export { default as CheckIcon } from './CheckIcon.vue'
export { default as EditIcon } from './EditIcon.vue'
export { default as TrashIcon } from './TrashIcon.vue'

// 图标类型定义
export interface IconProps {
    size?: number | string
    color?: string
    customClass?: string
}

// 图标名称类型
export type IconName =
    | 'settings'
    | 'logOut'
    | 'share'
    | 'github'
    | 'switchOn'
    | 'switchOff'
    | 'home'
    | 'example'
    | 'form'
    | 'table'
    | 'card'
    | 'dashboard'
    | 'components'
    | 'base'
    | 'button'
    | 'copy'
    | 'check'
    | 'edit'
    | 'trash'

// 图标映射
export const iconMap: Record<IconName, () => Promise<unknown>> = {
    settings: () => import('./SettingsIcon.vue'),
    logOut: () => import('./LogOutIcon.vue'),
    share: () => import('./ShareIcon.vue'),
    github: () => import('./GitHubIcon.vue'),
    switchOn: () => import('./SwitchOnIcon.vue'),
    switchOff: () => import('./SwitchOffIcon.vue'),
    home: () => import('./HomeIcon.vue'),
    example: () => import('./ExampleIcon.vue'),
    form: () => import('./FormIcon.vue'),
    table: () => import('./TableIcon.vue'),
    card: () => import('./CardIcon.vue'),
    dashboard: () => import('./DashboardIcon.vue'),
    components: () => import('./ComponentsIcon.vue'),
    base: () => import('./BaseIcon.vue'),
    button: () => import('./ButtonIcon.vue'),
    copy: () => import('./CopyIcon.vue'),
    check: () => import('./CheckIcon.vue'),
    edit: () => import('./EditIcon.vue'),
    trash: () => import('./TrashIcon.vue'),
}

// 动态加载图标
export const getIconComponent = (name: IconName) => {
    return iconMap[name]
}
