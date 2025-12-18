<template>
    <button @click="showMenus" ref="userBtnRef" class="user-info rounded-full overflow-auto">
        <img width="28" src="/logo.jpg" alt="User" />
    </button>
    <!-- 用户信息弹窗 -->
    <transition name="menu-fade">
        <div v-show="showMenu" ref="userMenuRef" class="user-menu fixed z-9999">
            <ui-card class="p-4">
                <div class="user-info flex items-center">
                    <img class="rounded-full m-4" width="32" src="/logo.jpg" alt="User" />
                    <div>
                        <div class="font-bold">Yevin</div>
                        <div class="email">yuwb0521@outlook.com</div>
                    </div>
                </div>
                <div class="user-actions flex flex-col justify-center">
                    <ui-button class="mt-2">
                        <template #icon>
                            <SettingsIcon size="16" />
                        </template>
                        Manage Account
                    </ui-button>
                    <ui-button class="mt-2" @click="handleSignOut">
                        <template #icon>
                            <LogOutIcon size="16" />
                        </template>
                        Sign Out
                    </ui-button>
                </div>
            </ui-card>
        </div>
    </transition>
</template>

<script setup>
import uiCard from '@/components/ui/ui-card.vue'
import uiButton from '@/components/ui/ui-button.vue'
import { SettingsIcon, LogOutIcon } from '@/components/icons'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ROUTE_PATHS } from '@/router/paths'

const router = useRouter()
const userBtnRef = ref(null)
const userMenuRef = ref(null)
const showMenu = ref(false)

const showMenus = () => {
    const rect = userBtnRef.value.getBoundingClientRect()
    const menu = userMenuRef.value
    const maxWidth = window.innerWidth - rect.x - rect.width
    menu.style.top = rect.y + rect.height + 6 + 'px'
    menu.style.right = maxWidth + 'px'
    showMenu.value = true
}
const hideMenus = () => {
    showMenu.value = false
}

/**
 * 处理登出操作
 * 跳转到登录页
 */
const handleSignOut = () => {
    // 关闭菜单
    hideMenus()
    // 跳转到登录页
    router.push(ROUTE_PATHS.LOGIN)
}

watch(showMenu, newVal => {
    if (newVal) {
        setTimeout(() => {
            document.addEventListener('click', clickHandler)
        }, 100)
    } else {
        document.removeEventListener('click', clickHandler)
    }
})

const clickHandler = event => {
    if (!userMenuRef.value?.contains(event.target)) {
        hideMenus()
    }
}
</script>

<style scoped>
.user-info:focus {
    box-shadow: 0 0 0 4px var(--border);
}
.user-menu {
    background-color: var(--background);
    transform-origin: top right;
}
.user-info {
    border-bottom: 1px solid var(--border);
    .email {
        color: var(--muted-foreground);
    }
}

/* 菜单动画效果 */

/* 1. 淡入淡出效果 */
.menu-fade-enter-active,
.menu-fade-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-fade-enter-from,
.menu-fade-leave-to {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
}

.menu-fade-enter-to,
.menu-fade-leave-from {
    opacity: 1;
    transform: scale(1) translateY(0);
}

/* 2. 滑动效果 */
.menu-slide-enter-active,
.menu-slide-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-slide-enter-from {
    opacity: 0;
    transform: translateX(20px);
}

.menu-slide-leave-to {
    opacity: 0;
    transform: translateX(-20px);
}

.menu-slide-enter-to,
.menu-slide-leave-from {
    opacity: 1;
    transform: translateX(0);
}
</style>
