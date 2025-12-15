import type { Component } from 'vue'

export interface NavItem {
    label: string
    to?: string
    external?: boolean
    disabled?: boolean
    children?: NavItem[]
    icon?: Component
}
