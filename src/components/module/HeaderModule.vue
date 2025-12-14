<template>
    <div class="header flex justify-between items-center">
        <div class="flex items-center">
            <div class="logo">
                <img class="rounded-sm" width="24" src="/logo.jpg" alt="Logo" />
            </div>
            <div class="title pl-4">SimpleTemplate</div>
        </div>
        <div class="flex justify-between items-center">
            <UserModule />
        </div>
    </div>
</template>

<script setup>
import UserModule from './UserModule.vue'
</script>

<style scoped lang="less">
.header {
    border-bottom: 1px solid var(--border);
    height: 48px;
    padding: 0 16px;
    color: var(--foreground);
}
</style>
