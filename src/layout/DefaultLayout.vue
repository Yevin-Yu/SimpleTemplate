<template>
    <div class="default-layout h-full w-full">
        <HeaderModule />
        <div class="default-layout-content">
            <router-view />
        </div>
    </div>
</template>
<script setup>
import HeaderModule from '@/components/module/HeaderModule.vue'
</script>
<style scoped lang="less">
.default-layout {
    background-color: var(--background);
}
</style>
