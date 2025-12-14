// 图标组件导出
export { default as SettingsIcon } from './SettingsIcon.vue'
export { default as LogOutIcon } from './LogOutIcon.vue'

// 图标类型定义
export interface IconProps {
  size?: number | string
  color?: string
  customClass?: string
}

// 图标名称类型
export type IconName = 'settings' | 'logOut'

// 图标映射
export const iconMap: Record<IconName, () => Promise<unknown>> = {
  settings: () => import('./SettingsIcon.vue'),
  logOut: () => import('./LogOutIcon.vue')
}

// 动态加载图标
export const getIconComponent = (name: IconName) => {
  return iconMap[name]
}