<template>
    <div class="default-layout h-full w-full">
        <HeaderModule />
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
