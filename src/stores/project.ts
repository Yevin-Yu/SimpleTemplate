import { defineStore } from 'pinia'
import { STORAGE_KEYS, safeGetItem, safeSetItem } from '@/shared'
import { ROUTE_PATHS } from '@/router/paths'
import { DEFAULT_PROJECT_OPTIONS, DEFAULT_SELECTED_PROJECT, normalizeSelectedProject, type ProjectOption } from '@/features/project/projectSelection'

// 对外保持导出名不变（历史兼容）；真实类型来自 features 层
export type { ProjectOption }

export const useProjectStore = defineStore('project', {
    state: () => {
        // 从 localStorage 读取保存的项目路由（value），并兼容旧数据（label）
        const stored = safeGetItem(STORAGE_KEYS.SELECTED_PROJECT)
        const savedRoute = normalizeSelectedProject(stored) || DEFAULT_SELECTED_PROJECT

        return {
            selectedProject: savedRoute, // 保存的是 value（路由路径）
            projectOptions: DEFAULT_PROJECT_OPTIONS,
        }
    },
    actions: {
        setSelectedProject(route: string) {
            this.selectedProject = route
            // 保存到 localStorage
            safeSetItem(STORAGE_KEYS.SELECTED_PROJECT, route)
        },
        getProjectRoute(): string {
            return this.selectedProject || ROUTE_PATHS.SIMPLE_TEMPLATE_HOME
        },
    },
})
