<template>
    <!-- 居中 -->
    <div class="home-container">
        <page-header title="原子组件" description="展示所有原子组件" />
        <div>
            <h1>按钮组件</h1>
            <wb-button size="small">小按钮</wb-button>
            <wb-button size="medium">中按钮</wb-button>
            <wb-button size="large">大按钮</wb-button>
            <wb-button size="medium" type="default">默认按钮</wb-button>
            <wb-button size="medium" type="primary">主按钮</wb-button>

            <h1>按钮组件2</h1>

            <wb-button2 size="small">小按钮2</wb-button2>
            <wb-button2 size="medium">中按钮2</wb-button2>
            <wb-button2 size="large">大按钮2</wb-button2>
        </div>
        <div>
            <wb-tag size="small">默认标签</wb-tag>
            <wb-tag size="medium">默认标签</wb-tag>
            <wb-tag size="large">默认标签</wb-tag>
        </div>
    </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import WbButton from '@/atom/wb-button.vue'
import WbButton2 from '@/atom/wb-button2.vue'
import WbTag from '@/atom/wb-tag.vue'
</script>

<style scoped lang="less">
.home-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

h1 {
    color: var(--default-text-color);
}
</style>
