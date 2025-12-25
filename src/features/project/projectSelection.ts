import { ROUTE_PATHS } from '@/router/paths'

export type ProjectOption = Record<string, unknown> & {
    label: string
    value: string
    icon: string
}

export const DEFAULT_SELECTED_PROJECT = ROUTE_PATHS.SIMPLE_TEMPLATE_HOME

export const DEFAULT_PROJECT_OPTIONS: ProjectOption[] = [
    { label: 'Simple Home', value: ROUTE_PATHS.SIMPLE_HOME, icon: 'home' },
    { label: 'Simple Template', value: ROUTE_PATHS.SIMPLE_TEMPLATE_HOME, icon: 'template' },
    { label: 'Simple Chat', value: ROUTE_PATHS.SIMPLE_CHAT, icon: 'chat' },
]

export function normalizeSelectedProject(raw: string | undefined): string {
    if (!raw) return DEFAULT_SELECTED_PROJECT

    const option = DEFAULT_PROJECT_OPTIONS.find(opt => opt.label === raw || opt.value === raw)
    return option?.value ?? raw ?? DEFAULT_SELECTED_PROJECT
}
