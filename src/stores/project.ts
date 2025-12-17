import { defineStore } from 'pinia'

export interface ProjectOption extends Record<string, unknown> {
    label: string
    value: string
    icon: string
}

const STORAGE_KEY = 'simple-template-selected-project'

export const useProjectStore = defineStore('project', {
    state: () => {
        const defaultOptions: ProjectOption[] = [
            { label: 'Simple Home', value: '/simple-home', icon: 'home' },
            { label: 'Simple Template', value: '/home', icon: 'template' },
        ]

        // 从 localStorage 读取保存的项目路由（value）
        let savedRoute = '/home'
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (stored) {
                // 兼容旧数据：如果是 label，转换为 value
                const option = defaultOptions.find(opt => opt.label === stored || opt.value === stored)
                savedRoute = option?.value || stored
            }
        } catch (error) {
            console.error('Failed to load saved project:', error)
        }

        return {
            selectedProject: savedRoute, // 保存的是 value（路由路径）
            projectOptions: defaultOptions,
        }
    },
    actions: {
        setSelectedProject(route: string) {
            this.selectedProject = route
            // 保存到 localStorage
            try {
                localStorage.setItem(STORAGE_KEY, route)
            } catch (error) {
                console.error('Failed to save project:', error)
            }
        },
        getProjectRoute(): string {
            return this.selectedProject || '/home'
        },
    },
})
