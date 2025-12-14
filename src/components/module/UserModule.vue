<template>
    <button @click="showMenus" ref="userBtnRef" class="user-info rounded-full overflow-auto">
        <img width="28" src="/logo.jpg" alt="User" />
    </button>
    <div v-show="showMenu" ref="userMenuRef" class="user-menu fixed z-9999">
        <ui-card class="p-3">
            <div><button>推出登录</button></div>
        </ui-card>
    </div>
</template>

<script setup>
import uiCard from '@/components/ui/ui-card.vue'
import { ref, watch } from 'vue'

const userBtnRef = ref(null)
const userMenuRef = ref(null)
const showMenu = ref(false)

const showMenus = () => {
    console.log(123)
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
}
</style>
