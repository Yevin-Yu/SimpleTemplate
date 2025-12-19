import { defineStore } from 'pinia'
import { STORAGE_KEYS, safeGetItem, safeSetItem } from '@/shared'
import { ROUTE_PATHS } from '@/router/paths'
import { DEFAULT_PROJECT_OPTIONS, DEFAULT_SELECTED_PROJECT, normalizeSelectedProject, type ProjectOption } from '@/features/project/projectSelection'

export type { ProjectOption }

export const useProjectStore = defineStore('project', {
    state: () => {
        const stored = safeGetItem(STORAGE_KEYS.SELECTED_PROJECT)
        const savedRoute = normalizeSelectedProject(stored) || DEFAULT_SELECTED_PROJECT

        return {
            selectedProject: savedRoute,
            projectOptions: DEFAULT_PROJECT_OPTIONS,
        }
    },
    actions: {
        setSelectedProject(route: string) {
            this.selectedProject = route
            safeSetItem(STORAGE_KEYS.SELECTED_PROJECT, route)
        },
        getProjectRoute(): string {
            return this.selectedProject || ROUTE_PATHS.SIMPLE_TEMPLATE_HOME
        },
    },
})
