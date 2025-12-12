<template>
    <PageHeader title="按钮组件" description="展示不同样式的按钮，可以根据需求选择使用" />
    <div class="button-container">
        <CardModule title="按钮示例">
            <template #header>
                <div class="card-title">按钮示例</div>
            </template>
            <div class="button-group">
                <div class="title">
                    <wbTag size="small">以下为：Button1 Style 示例</wbTag>
                </div>
                <wbButton size="small">小按钮</wbButton>
                <wbButton size="medium">中按钮</wbButton>
                <wbButton size="large">大按钮</wbButton>
                <wbButton>主题按钮</wbButton>
                <wbButton size="default">默认按钮</wbButton>
                <div class="title">
                    <wbTag size="small">以下为：Button2 Style（模拟突出凹陷效果）：</wbTag>
                </div>
                <wbButton2 size="small">小按钮</wbButton2>
                <wbButton2 size="medium">中按钮</wbButton2>
                <wbButton2 size="large">大按钮</wbButton2>
            </div>
        </CardModule>
        <CardModule>
            <template #header>
                <div class="card-title">代码演示</div>
            </template>
        </CardModule>
    </div>
</template>
<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import CardModule from '@/components/CardModule.vue'

import wbButton from '@/atom/wb-button.vue'
import wbButton2 from '@/atom/wb-button2.vue'
import wbTag from '@/atom/wb-tag.vue'
</script>
<style>
.button-container {
    margin: 0 10px 10px 16px;
    width: calc(100% - 26px);
    height: calc(100% - 100px);
    display: flex;
    gap: 16px;

    .card-module:first-child {
        width: 640px;
    }
}

.button-group {
    padding: 16px;

    .title {
        margin-top: 16px;
    }
}
</style>
