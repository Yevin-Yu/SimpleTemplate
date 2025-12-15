<template>
    <aside class="sidebar h-full">
        <nav class="sidebar-inner">
            <ul class="menu">
                <li v-for="item in menu" :key="item.key" class="menu-item">
                    <div class="menu-item-label" :class="{
                        active: isActive(item),
                        'has-children': item.children,
                        'is-open': isOpen(item)
                    }" @click="onItemClick(item)">
                        <span class="menu-item-text">{{ item.label }}</span>
                        <span v-if="item.children" class="arrow" :class="{ open: isOpen(item) }">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                    </div>

                    <transition name="submenu">
                        <ul v-if="item.children && isOpen(item)" class="submenu">
                            <li v-for="child in item.children" :key="child.key" class="submenu-item">
                                <div class="submenu-item-label" :class="{ active: isActive(child) }"
                                    @click.stop="onItemClick(child)">
                                    <span class="submenu-indicator"></span>
                                    <span class="submenu-item-text">{{ child.label }}</span>
                                </div>
                            </li>
                        </ul>
                    </transition>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface MenuItem {
    key: string
    label: string
    path?: string
    children?: MenuItem[]
}

const router = useRouter()
const route = useRoute()

// 这里可以根据你的实际业务路由结构进行扩展
const menu = computed<MenuItem[]>(() => [
    {
        key: 'home',
        label: '首页',
        path: '/home',
    },
    {
        key: 'example',
        label: '示例演示',
        children: [
            {
                key: 'form',
                label: '表单示例',
                path: '/form-example',
            },
            {
                key: 'table',
                label: '表格示例',
                path: '/table-example',
            },
            {
                key: 'card',
                label: '卡片示例',
                path: '/card-example',
            },
            {
                key: 'dashboard',
                label: '仪表盘示例',
                path: '/dashboard-example',
            },
        ],
    },
    {
        key: 'components',
        label: '组件示例',
        children: [
            {
                key: 'base',
                label: '基础组件',
                path: '/base-components',
            },
            {
                key: 'form',
                label: '表单组件',
                path: '/form-components',
            },
        ],
    },
])

const openKeys = ref<Set<string>>(new Set(['demos', 'components']))

// 自动展开包含激活子菜单的父菜单
watchEffect(() => {
    const newOpenKeys = new Set(openKeys.value)
    const checkAndOpen = (items: MenuItem[]): void => {
        items.forEach(item => {
            if (item.children && item.children.length > 0) {
                // 检查是否有子菜单项被激活
                const hasActiveChild = item.children.some(child => {
                    if (!child.path) return false
                    const pathWithoutHash = child.path.split('#')[0]
                    if (!pathWithoutHash) return false
                    return route.path === pathWithoutHash || route.path === child.path || (route.fullPath?.startsWith(pathWithoutHash) ?? false)
                })
                if (hasActiveChild) {
                    newOpenKeys.add(item.key)
                }
                // 递归检查子菜单
                checkAndOpen(item.children)
            }
        })
    }
    checkAndOpen(menu.value)
    openKeys.value = newOpenKeys
})

const isOpen = (item: MenuItem) => openKeys.value.has(item.key)

const toggleOpen = (item: MenuItem) => {
    if (!item.children) return
    const next = new Set(openKeys.value)
    if (next.has(item.key)) {
        next.delete(item.key)
    } else {
        next.add(item.key)
    }
    openKeys.value = next
}

const isActive = (item: MenuItem): boolean => {
    // 如果菜单项有子菜单，检查是否有子菜单项被激活
    if (item.children && item.children.length > 0) {
        return item.children.some(child => isActive(child))
    }

    // 如果没有路径，返回 false
    if (!item.path) return false

    // 判断当前路由是否匹配该菜单项
    // 处理带 hash 的路径（如 /home#buttons）
    const pathWithoutHash = item.path.split('#')[0]
    if (!pathWithoutHash) return false
    return route.path === pathWithoutHash || route.path === item.path || (route.fullPath?.startsWith(pathWithoutHash) ?? false)
}

const onItemClick = (item: MenuItem) => {
    if (item.children && !item.path) {
        toggleOpen(item)
        return
    }

    if (item.children && item.path) {
        toggleOpen(item)
    }

    if (item.path) {
        router.push(item.path)
    }
}
</script>

<style scoped lang="less">
.sidebar {
    width: 240px;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.sidebar-inner {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 16px 12px;
}

.menu {
    list-style: none;
    margin: 0;
    padding: 0;
}

.menu-item {
    position: relative;

    &+.menu-item {
        margin-top: 6px;
    }
}

.menu-item-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    border-radius: 4px;
    color: var(--foreground);
    cursor: pointer;
    position: relative;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateX(0);
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%) scaleY(0);
        width: 3px;
        height: 0;
        background: var(--primary);
        border-radius: 0 2px 2px 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover {
        background-color: var(--surface);
        color: var(--foreground);
        transform: translateX(2px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

        &::before {
            transform: translateY(-50%) scaleY(1);
            height: 60%;
        }
    }

    &.active {
        background: linear-gradient(90deg, var(--primary-soft) 0%, var(--surface) 100%);
        color: var(--primary-foreground);
        font-weight: 600;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

        &::before {
            transform: translateY(-50%) scaleY(1);
            height: 70%;
            background: var(--primary);
        }
    }

    &.has-children {
        font-weight: 500;
    }

    &.is-open {
        .arrow {
            color: var(--primary);
        }
    }
}

.menu-item-text {
    flex: 1;
    transition: transform 0.2s ease;
}

.menu-item-label:hover .menu-item-text {
    transform: translateX(2px);
}

.arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    color: var(--foreground-muted);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center;
    flex-shrink: 0;

    svg {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &.open {
        svg {
            transform: rotate(180deg);
        }
    }
}

.menu-item-label:hover .arrow {
    color: var(--foreground);
    transform: scale(1.1);
}

.submenu {
    list-style: none;
    margin: 6px 0 0 0;
    padding-left: 20px;
    border-left: 2px solid var(--border-subtle);
    position: relative;

    &::before {
        content: '';
        position: absolute;
        left: -2px;
        top: 0;
        bottom: 0;
        width: 2px;
        background: linear-gradient(180deg, var(--primary-soft), transparent);
        opacity: 0;
        transition: opacity 0.3s ease;
    }
}

.menu-item.is-open .submenu::before {
    opacity: 0.3;
}

.submenu-item {
    position: relative;

    &+.submenu-item {
        margin-top: 4px;
    }
}

.submenu-item-label {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 13px;
    color: var(--foreground-muted);
    cursor: pointer;
    position: relative;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;

    &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%) translateX(-100%);
        width: 2px;
        height: 0;
        background: var(--primary);
        border-radius: 0 1px 1px 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover {
        background-color: var(--surface);
        color: var(--foreground);
        padding-left: 16px;
        transform: translateX(2px);

        &::after {
            transform: translateY(-50%) translateX(0);
            height: 60%;
        }

        .submenu-indicator {
            opacity: 1;
            transform: scale(1);
        }
    }

    &.active {
        background-color: var(--primary-soft);
        color: var(--primary-foreground);
        font-weight: 600;
        padding-left: 16px;

        &::after {
            transform: translateY(-50%) translateX(0);
            height: 70%;
        }

        .submenu-indicator {
            opacity: 1;
            transform: scale(1);
            background: var(--primary);
        }
    }
}

.submenu-indicator {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--foreground-muted);
    margin-right: 10px;
    opacity: 0;
    transform: scale(0);
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;
}

.submenu-item-text {
    transition: transform 0.2s ease;
}

.submenu-item-label:hover .submenu-item-text {
    transform: translateX(2px);
}

// 子菜单展开/收起动画
.submenu-enter-active {
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
}

.submenu-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
}

.submenu-enter-from {
    opacity: 0;
    transform: translateY(-10px);
    max-height: 0;
    margin-top: 0;
    padding-top: 0;
    padding-bottom: 0;
}

.submenu-enter-to {
    opacity: 1;
    transform: translateY(0);
    max-height: 500px;
}

.submenu-leave-from {
    opacity: 1;
    transform: translateY(0);
    max-height: 500px;
}

.submenu-leave-to {
    opacity: 0;
    transform: translateY(-10px);
    max-height: 0;
    margin-top: 0;
    padding-top: 0;
    padding-bottom: 0;
}
</style>
