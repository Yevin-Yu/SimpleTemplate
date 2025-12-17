<template>
    <aside class="sidebar h-full">
        <nav class="sidebar-inner">
            <ul class="menu">
                <li v-for="item in menu" :key="item.key" class="menu-item">
                    <div
                        class="menu-item-label"
                        :class="{
                            active: isActive(item),
                            'has-children': item.children,
                            'is-open': isOpen(item),
                        }"
                        @click="onItemClick(item)"
                    >
                        <span v-if="item.icon" class="menu-item-icon">
                            <component :is="item.icon" :size="16" />
                        </span>
                        <span class="menu-item-text">{{ getLabel(item) }}</span>
                        <span v-if="item.children" class="arrow" :class="{ open: isOpen(item) }">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path
                                    d="M3 4.5L6 7.5L9 4.5"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </span>
                    </div>

                    <transition name="submenu">
                        <ul v-if="item.children && isOpen(item)" class="submenu">
                            <li v-for="child in item.children" :key="child.key" class="submenu-item">
                                <div class="submenu-item-label" :class="{ active: isActive(child) }" @click.stop="onItemClick(child)">
                                    <span class="submenu-indicator"></span>
                                    <span v-if="child.icon" class="submenu-item-icon">
                                        <component :is="child.icon" :size="16" />
                                    </span>
                                    <span class="submenu-item-text">{{ getLabel(child) }}</span>
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
import { SIDEBAR_NAV, type NavItem } from '@/router/nav'

const router = useRouter()
const route = useRoute()

const menu = computed<NavItem[]>(() => SIDEBAR_NAV)

/**
 * 叶子节点文案：优先使用路由 meta.title，避免菜单与标题不一致。
 * 分组节点（无 path）仍使用 nav.ts 里手写的 label。
 */
const titleByPath = computed<Record<string, string>>(() => {
    const map: Record<string, string> = {}
    for (const r of router.getRoutes()) {
        const title = typeof r.meta?.title === 'string' ? r.meta.title : undefined
        if (title) map[r.path] = title
    }
    return map
})

const getLabel = (item: NavItem): string => {
    if (item.path) return titleByPath.value[item.path] ?? item.label ?? item.path
    return item.label ?? item.key
}

const openKeys = ref<Set<string>>(new Set(['example', 'components']))

// 自动展开包含激活子菜单的父菜单
watchEffect(() => {
    const newOpenKeys = new Set(openKeys.value)
    const checkAndOpen = (items: NavItem[]): void => {
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

const isOpen = (item: NavItem) => openKeys.value.has(item.key)

const toggleOpen = (item: NavItem) => {
    if (!item.children) return
    const next = new Set(openKeys.value)
    if (next.has(item.key)) {
        next.delete(item.key)
    } else {
        next.add(item.key)
    }
    openKeys.value = next
}

const isActive = (item: NavItem): boolean => {
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

const onItemClick = (item: NavItem) => {
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
    user-select: none;
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

    & + .menu-item {
        margin-top: 6px;
    }
}

.menu-item-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16px;
    color: var(--foreground);
    cursor: pointer;
    position: relative;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateX(0);
    border: 1px solid transparent;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        left: 5px;
        top: 50%;
        transform: translateY(-50%) scaleY(0);
        width: 3px;
        height: 0;
        background: var(--primary);
        border-radius: 0 2px 2px 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover {
        transform: translateX(2px);
        box-shadow: var(--shadow-xs);
        border: 1px solid var(--border);
        color: var(--primary);

        &::before {
            transform: translateY(-50%) scaleY(1);
            height: 60%;
        }

        .arrow {
            color: var(--primary);
        }
    }

    &.active {
        box-shadow: var(--shadow-xs);
        border: 1px solid var(--border);
        color: var(--primary);

        &::before {
            transform: translateY(-50%) scaleY(1);
            height: 70%;
            background: var(--primary);
        }

        .arrow {
            color: var(--primary);
        }
    }
}

.menu-item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    flex-shrink: 0;
    color: var(--foreground);
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-item-label:hover .menu-item-icon {
    color: var(--primary);
    transform: scale(1.1);
}

.menu-item-label.active .menu-item-icon {
    color: var(--primary);
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
    color: var(--foreground);
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
    transform: scale(1.1);
}

.submenu {
    list-style: none;
    margin: 6px 0 0 4px;
    padding-left: 16px;
    border-left: 1px dashed var(--border);
    position: relative;
}

.submenu-item {
    position: relative;

    & + .submenu-item {
        margin-top: 4px;
    }
}

.submenu-item-label {
    display: flex;
    align-items: center;
    padding: 8px 10px;
    font-size: 13px;
    color: var(--foreground);
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
        border-radius: 0 2px 2px 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover {
        color: var(--primary);
        transform: translateX(2px);

        &::after {
            transform: translateY(-50%) translateX(0);
            height: 55%;
        }

        .submenu-indicator {
            opacity: 1;
            transform: scale(1);
        }
    }

    &.active {
        color: var(--primary);
        font-size: 15px;

        &::after {
            transform: translateY(-50%) translateX(0);
            height: 60%;
        }

        .submenu-indicator {
            opacity: 1;
            transform: scale(1);
        }
    }
}

.submenu-indicator {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--primary);
    margin-right: 8px;
    opacity: 0;
    transform: scale(0);
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;
}

.submenu-item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    flex-shrink: 0;
    color: var(--foreground);
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.submenu-item-label:hover .submenu-item-icon {
    color: var(--primary);
    transform: scale(1.1);
}

.submenu-item-label.active .submenu-item-icon {
    color: var(--primary);
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
