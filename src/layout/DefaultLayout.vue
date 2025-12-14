<template>
    <div class="default-layout h-full w-full">
        <HeaderModule />
        <div class="default-layout-content"></div>
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
