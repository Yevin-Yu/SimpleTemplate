<template>
    <div class="default-layout h-full w-full">
        <HeaderModule />
        <div class="default-layout-content flex">
            <div class="content-left">
                <SidebarModule />
            </div>
            <div class="content-right">
                <router-view />
            </div>
        </div>
    </div>
</template>
<script setup>
import HeaderModule from '@/components/module/HeaderModule.vue'
import SidebarModule from '@/components/module/SidebarModule.vue'
</script>
<style scoped lang="less">
.default-layout {
    background-color: var(--background);
}
.content-left {
    flex-shrink: 0;
    background-color: var(--background);
}
.content-right {
    overflow: auto;
    flex: 1;
    height: 100%;
    background-color: var(--background);
}
</style>
