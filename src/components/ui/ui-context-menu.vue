<template>
    <Teleport to="body">
        <!-- Teleport：避免被父级 overflow/transform 裁剪，按 viewport 定位 -->
        <Transition name="context-menu">
            <div
                v-if="state.open"
                ref="menuRef"
                class="ui-context-menu"
                :style="{ left: `${state.x}px`, top: `${state.y}px` }"
                role="menu"
                @contextmenu.prevent
            >
                <div
                    v-for="(item, index) in state.items"
                    :key="item.key ?? index"
                    class="ui-context-menu-item"
                    :class="{
                        'is-disabled': item.disabled,
                        'is-divider': item.type === 'divider',
                        'is-danger': item.variant === 'danger',
                    }"
                    role="menuitem"
                    :aria-disabled="item.disabled ? 'true' : 'false'"
                    @click="onItemClick(item)"
                >
                    <template v-if="item.type === 'divider'">
                        <div class="ui-context-menu-divider"></div>
                    </template>
                    <template v-else>
                        <!-- 左侧：图标 + 文案；右侧：快捷键提示（可选） -->
                        <div class="item-left">
                            <component v-if="item.icon" :is="item.icon" class="item-icon" />
                            <span class="item-label">{{ item.label }}</span>
                        </div>
                        <span v-if="item.shortcut" class="item-shortcut">{{ item.shortcut }}</span>
                    </template>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
/**
 * ContextMenu（右键菜单）
 *
 * Props
 * - items: 默认菜单项（也可在 openAt/openWithEvent 时动态传入）
 * - offset: 菜单与 viewport 边缘的最小间距（防止贴边）
 *
 * Emits
 * - open: 打开（返回坐标）
 * - select: 选择某项
 * - close: 关闭
 *
 * Expose
 * - openWithEvent(e, items?): 常见用法：在 @contextmenu 里传入 MouseEvent
 * - openAt(x, y, items?): 按坐标打开
 * - close(): 主动关闭
 */
import { nextTick, onMounted, onUnmounted, ref, type Component } from 'vue'

export interface ContextMenuItem {
    key?: string | number
    label?: string
    shortcut?: string
    /** 左侧图标组件（建议传入 Vue Component） */
    icon?: Component
    disabled?: boolean
    variant?: 'danger'
    type?: 'divider'
    onSelect?: () => void
}

interface ContextMenuState {
    open: boolean
    x: number
    y: number
    items: ContextMenuItem[]
    offset: number
}

const props = withDefaults(
    defineProps<{
        /** 默认菜单项（不传时可通过 openWithEvent/openAt 动态传入） */
        items?: ContextMenuItem[]
        /** 菜单与 viewport 边缘的最小间距 */
        offset?: number
    }>(),
    {
        items: () => [],
        offset: 8,
    }
)

// 用法：页面放一个 <ui-context-menu ref="xxx" />；任意元素右键时调用 menuRef.openWithEvent(e, items)
const state = ref<ContextMenuState>({
    open: false,
    x: 0,
    y: 0,
    items: props.items,
    offset: props.offset,
})

const emit = defineEmits<{
    open: [payload: { x: number; y: number }]
    close: []
    select: [item: ContextMenuItem]
}>()

const menuRef = ref<HTMLElement | null>(null)

const clampToViewport = () => {
    const el = menuRef.value
    if (!el) return

    const rect = el.getBoundingClientRect()
    const vw = window.innerWidth
    const vh = window.innerHeight

    // 防溢出：菜单打开后根据自身宽高修正位置，避免超出 viewport
    if (rect.right > vw) {
        state.value.x = Math.max(state.value.offset, state.value.x - (rect.right - vw) - state.value.offset)
    }
    if (rect.bottom > vh) {
        state.value.y = Math.max(state.value.offset, state.value.y - (rect.bottom - vh) - state.value.offset)
    }
}

const close = () => {
    state.value.open = false
}

const openAt = async (x: number, y: number, items?: ContextMenuItem[]) => {
    state.value.items = items ?? props.items
    state.value.x = x
    state.value.y = y
    state.value.open = true
    emit('open', { x, y })
    await nextTick()
    clampToViewport()
}

const openWithEvent = (e: MouseEvent, items?: ContextMenuItem[]) => {
    // 只用 clientX/Y，避免滚动导致定位偏差
    void openAt(e.clientX, e.clientY, items)
}

defineExpose({ openWithEvent, openAt, close })

const onItemClick = (item: ContextMenuItem) => {
    if (item.type === 'divider') return
    if (item.disabled) return

    // 事件顺序：先 emit 给外部，再执行单项回调，最后关闭菜单
    emit('select', item)
    item.onSelect?.()
    close()
    emit('close')
}

const onGlobalPointerDown = (e: MouseEvent) => {
    if (!state.value.open) return
    const el = menuRef.value
    if (!el) return
    // 点击菜单外部关闭
    if (!el.contains(e.target as Node)) {
        close()
        emit('close')
    }
}

const normalizeShortcutToken = (token: string): string => token.trim().toLowerCase()

const matchShortcut = (e: KeyboardEvent, shortcut?: string): boolean => {
    if (!shortcut) return false

    // 支持形如：Ctrl+C / F2 / Del / Delete
    const raw = shortcut
        .split('+')
        .map(s => s.trim())
        .filter(Boolean)

    if (raw.length === 0) return false

    const tokens = raw.map(normalizeShortcutToken)

    const needCtrl = tokens.includes('ctrl') || tokens.includes('control')
    const needAlt = tokens.includes('alt') || tokens.includes('option')
    const needShift = tokens.includes('shift')
    const needMeta = tokens.includes('meta') || tokens.includes('cmd') || tokens.includes('command')

    if (needCtrl !== e.ctrlKey) return false
    if (needAlt !== e.altKey) return false
    if (needShift !== e.shiftKey) return false
    if (needMeta !== e.metaKey) return false

    // 取最后一个“非修饰键”作为主键
    const mains = tokens.filter(t => !['ctrl', 'control', 'alt', 'option', 'shift', 'meta', 'cmd', 'command'].includes(t))
    const main = mains.length ? mains[mains.length - 1] : undefined
    if (!main) return false

    const key = e.key.toLowerCase()
    if (main === 'del' || main === 'delete') return e.key === 'Delete' || key === 'del' || key === 'delete'

    // 功能键：F1 ~ F12
    if (/^f\d{1,2}$/.test(main)) return key === main

    // 字母/数字等：统一用 e.key 比对
    return key === main
}

const findItemByShortcut = (e: KeyboardEvent): ContextMenuItem | null => {
    for (const item of state.value.items) {
        if (item.type === 'divider') continue
        if (item.disabled) continue
        if (matchShortcut(e, item.shortcut)) return item
    }
    return null
}

const onKeyDown = (e: KeyboardEvent) => {
    if (!state.value.open) return
    if (e.key === 'Escape') {
        e.preventDefault()
        // ESC 关闭
        close()
        emit('close')
        return
    }

    const item = findItemByShortcut(e)
    if (!item) return

    // 命中快捷键：阻止默认行为（比如 Ctrl+C）并触发对应菜单项
    e.preventDefault()
    onItemClick(item)
}

onMounted(() => {
    // 全局关闭策略：外部点击 / ESC / resize / 任意滚动（捕获阶段）
    document.addEventListener('mousedown', onGlobalPointerDown)
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', clampToViewport)
    window.addEventListener('scroll', closeOnScroll, true)
})

onUnmounted(() => {
    document.removeEventListener('mousedown', onGlobalPointerDown)
    document.removeEventListener('keydown', onKeyDown)
    window.removeEventListener('resize', clampToViewport)
    window.removeEventListener('scroll', closeOnScroll, true)
})

const closeOnScroll = () => {
    if (!state.value.open) return
    close()
    emit('close')
}
</script>

<style scoped lang="less">
.ui-context-menu {
    position: fixed;
    z-index: 2000;
    min-width: 180px;
    padding: 4px;
    background: var(--card);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-md);
    color: var(--foreground);
    user-select: none;
}

.ui-context-menu-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    height: 34px;
    margin: 2px 0;
    padding: 0 12px;
    cursor: pointer;
    transition:
        background-color 0.2s ease,
        color 0.2s ease;

    &.is-divider {
        height: auto;
        padding: 0;
        margin: 6px 0;
        cursor: default;
    }

    &:not(.is-divider):hover {
        background: var(--accent);
    }

    &.is-danger:not(.is-divider) {
        color: var(--destructive);
    }

    &.is-disabled:not(.is-divider) {
        opacity: 0.5;
        cursor: not-allowed;
    }
}

.ui-context-menu-divider {
    height: 1px;
    width: 100%;
    background: var(--border);
}

.item-left {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
}

.item-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
}

.item-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.item-shortcut {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--muted-foreground);
}

.context-menu-enter-active,
.context-menu-leave-active {
    transition:
        opacity 0.15s ease,
        transform 0.15s ease;
}

.context-menu-enter-from,
.context-menu-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}
</style>
