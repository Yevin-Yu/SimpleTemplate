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
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { SIDEBAR_NAV, type NavItem } from '@/router/nav'

const router = useRouter()
const route = useRoute()

const menu = computed<NavItem[]>(() => SIDEBAR_NAV)

// 从路由 meta 获取标题映射（优先使用路由标题，避免菜单与页面标题不一致）
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

/**
 * 侧边栏展开策略（模块化约定）
 * - 默认：全部收起（避免首次进入时信息噪音）
 * - 自动：仅展开“当前选中路由”对应的父级链路（保证定位感）
 *
 * 说明：
 * - 这里的展开状态不做持久化；若后续需要“记住用户手动展开”，可在此处把 openKeys 与 storage/store 对接。
 */
const openKeys = ref<Set<string>>(new Set())

type KeyChain = string[]

const stripHash = (path: string): string => path.split('#')[0] ?? ''

/**
 * 判断当前路由是否“命中”某个菜单 path：
 * - 支持 hash（如 /home#buttons）
 * - 支持更深层子路由（fullPath 前缀匹配）
 */
const isRouteMatchPath = (menuPath: string): boolean => {
    const basePath = stripHash(menuPath)
    if (!basePath) return false
    return route.path === basePath || route.path === menuPath || (route.fullPath?.startsWith(basePath) ?? false)
}

/**
 * 深度优先遍历菜单，找到“当前选中项”的 key 链路（包含叶子本身）。
 * 用回溯维护栈，避免递归过程中的数组拷贝，便于在菜单规模增大时保持性能可控。
 */
const findActiveKeyChain = (items: NavItem[]): KeyChain => {
    const stack: string[] = []

    const dfs = (list: NavItem[]): boolean => {
        for (const item of list) {
            stack.push(item.key)

            if (item.children?.length && dfs(item.children)) return true
            if (item.path && isRouteMatchPath(item.path)) return true

            stack.pop()
        }
        return false
    }

    return dfs(items) ? [...stack] : []
}

// 路由变化时自动展开对应父级菜单（保留其他已展开的菜单）
watch(
    () => route.fullPath,
    () => {
        const chain = findActiveKeyChain(menu.value)
        // 只展开父级分组：链路最后一段是叶子节点 key，不属于“可展开分组”
        const parentKeys = chain.slice(0, -1)
        // 只添加当前激活链路的父级，不折叠其他已展开的菜单
        parentKeys.forEach(key => {
            openKeys.value.add(key)
        })
    },
    { immediate: true }
)

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
    if (item.children?.length) {
        return item.children.some(child => isActive(child))
    }
    if (!item.path) return false
    return isRouteMatchPath(item.path)
}

const onItemClick = (item: NavItem) => {
    // 纯分组节点：仅切换展开状态
    if (item.children && !item.path) {
        toggleOpen(item)
        return
    }

    // 有子菜单且有路径：切换展开状态并跳转
    if (item.children && item.path) {
        toggleOpen(item)
    }

    // 跳转路由
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
    transition: color 0.2s ease, transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
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
        transition: transform 0.2s ease, height 0.2s ease;
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
    transition: color 0.2s ease, transform 0.15s ease;
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
    transition: transform 0.15s ease;
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
    transition: color 0.2s ease, transform 0.15s ease;
    transform-origin: center;
    flex-shrink: 0;

    svg {
        transition: transform 0.2s ease;
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
    transition: color 0.2s ease, transform 0.2s ease;
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
        transition: transform 0.2s ease, height 0.2s ease;
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
        font-weight: 500;

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
    transition: opacity 0.2s ease, transform 0.2s ease;
    flex-shrink: 0;
}

.submenu-item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    flex-shrink: 0;
    color: var(--foreground);
    transition: color 0.2s ease, transform 0.15s ease;
}

.submenu-item-label:hover .submenu-item-icon {
    color: var(--primary);
    transform: scale(1.1);
}

.submenu-item-label.active .submenu-item-icon {
    color: var(--primary);
}

.submenu-item-text {
    transition: transform 0.15s ease;
}

.submenu-item-label:hover .submenu-item-text {
    transform: translateX(2px);
}

// 子菜单展开/收起动画
.submenu-enter-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
    overflow: hidden;
}

.submenu-leave-active {
    transition: opacity 0.15s ease, transform 0.15s ease;
    overflow: hidden;
}

.submenu-enter-from {
    opacity: 0;
    transform: translateY(-4px);
}

.submenu-enter-to {
    opacity: 1;
    transform: translateY(0);
}

.submenu-leave-from {
    opacity: 1;
    transform: translateY(0);
}

.submenu-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}
</style>
