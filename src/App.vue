<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { RouterView } from 'vue-router'
import HeaderModule from './components/module/HeaderModule.vue'
import { ROUTE_PATHS } from '@/router/paths'

// 获取当前路由
const route = useRoute()

// 判断是否为登录页，登录页不显示顶部导航
const isLoginPage = computed(() => route.path === ROUTE_PATHS.LOGIN)
</script>

<template>
    <HeaderModule v-if="!isLoginPage" />
    <div class="app-content" :class="{ 'full-screen': isLoginPage }">
        <RouterView />
    </div>
</template>

<style scoped lang="less">
.app-content {
    flex: 1;
    height: calc(100vh - 48px);
    overflow: hidden;

    &.full-screen {
        height: 100vh;
    }
}
</style>
