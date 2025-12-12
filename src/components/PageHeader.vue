<template>
    <div class="page-header">
        <h1>{{ title }}</h1>
        <span class="page-description"> {{ description }} </span>
    </div>
</template>
<script setup lang="ts">
// 接收标题和小标题
defineProps({
    title: {
        type: String,
        default: '标题描述',
    },
    description: {
        type: String,
        default: '',
    },
})
</script>
<style scoped lang="less">
.page-header {
    width: calc(100% - 26px);
    margin: 10px 10px 16px 16px;
    border-radius: 6px;
    padding: 16px;
    background: var(--white-bg-color);
    border: 1px solid var(--card-shadow-color);
    box-shadow: 3px 3px 0px var(--card-shadow-color);

    h1 {
        font-size: 20px;
        line-height: 1.5;
        color: var(--theme-text-color);
        margin: 0;
        display: inline-block;
    }

    .page-description {
        padding-left: 16px;
        color: var(--label-text-color);
        font-size: 14px;
        display: inline-block;
    }
}
</style>
