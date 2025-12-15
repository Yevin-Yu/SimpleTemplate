<template>
    <div class="default-layout">
        <HeaderModule />
        <div class="default-layout-content">
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
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    background-color: var(--background);
    overflow: hidden;
}

.default-layout-content {
    display: flex;
    flex: 1;
    min-height: 0; // 重要：允许 flex 子元素缩小
    overflow: hidden;
}

.content-left {
    flex-shrink: 0;
    background-color: var(--background);
    border-right: 1px solid var(--border);
    overflow: hidden;
}

.content-right {
    flex: 1;
    min-width: 0; // 重要：允许 flex 子元素缩小
    overflow-y: auto;
    overflow-x: hidden;
    background-color: var(--background);
    height: 100%;
}
</style>
