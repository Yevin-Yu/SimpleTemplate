<template>
    <div class="header flex justify-between items-center">
        <div class="flex items-center">
            <div class="logo">
                <img class="rounded-sm" width="24" src="/logo.jpg" alt="Logo" />
            </div>
            <div class="title pl-4">SimpleTemplate</div>
        </div>
        <div class="flex justify-between items-center gap-1">
            <!-- 绘制一条竖线 设置两边padd -->
            <div class="line"></div>
            <UserModule />
            <div class="line"></div>
            <UserModule />
        </div>
    </div>
</template>

<script setup>
import UserModule from '@/components/module/UserModule.vue'
</script>

<style scoped lang="less">
.header {
    border-bottom: 1px solid var(--border);
    height: 48px;
    padding: 0 16px;
    color: var(--foreground);
}
.line {
    width: 0px;
    height: 32px;
    border-left: 1px solid var(--border);
    margin: 0 4.5px;
}
</style>
