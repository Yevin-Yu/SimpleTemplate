<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderModule from './components/module/HeaderModule.vue'
</script>

<template>
    <HeaderModule />
    <div class="app-content">
        <RouterView />
    </div>
</template>

<style scoped lang="less">
.app-content {
    flex: 1;
    height: calc(100vh - 48px);
    overflow: hidden;
}
</style>
