<template>
    <div class="blank-layout">
        <div class="default-layout-content">
            <router-view />
        </div>
    </div>
</template>
<script setup>
</script>
<style scoped lang="less">
.blank-layout {
    display: flex;
    flex-direction: column;
    height: 100%;
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
