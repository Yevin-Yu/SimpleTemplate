// 图标组件导出
export { default as SettingsIcon } from './SettingsIcon.vue'
export { default as LogOutIcon } from './LogOutIcon.vue'
export { default as ShareIcon } from './ShareIcon.vue'
export { default as GitHubIcon } from './GitHubIcon.vue'
export { default as SwitchOnIcon } from './SwitchOnIcon.vue'
export { default as SwitchOffIcon } from './SwitchOffIcon.vue'

// 图标类型定义
export interface IconProps {
    size?: number | string
    color?: string
    customClass?: string
}

// 图标名称类型
export type IconName = 'settings' | 'logOut' | 'share' | 'github' | 'switchOn' | 'switchOff'

// 图标映射
export const iconMap: Record<IconName, () => Promise<unknown>> = {
    settings: () => import('./SettingsIcon.vue'),
    logOut: () => import('./LogOutIcon.vue'),
    share: () => import('./ShareIcon.vue'),
    github: () => import('./GitHubIcon.vue'),
    switchOn: () => import('./SwitchOnIcon.vue'),
    switchOff: () => import('./SwitchOffIcon.vue'),
}

// 动态加载图标
export const getIconComponent = (name: IconName) => {
    return iconMap[name]
}
