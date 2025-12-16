<template>
    <div class="blank-layout">
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
.blank-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    background-color: var(--background);
    overflow: hidden;
}

.default-layout-content {
    flex: 1;
    min-height: 0;
    overflow: hidden;
}
</style>
