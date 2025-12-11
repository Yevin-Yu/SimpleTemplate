<template>
    <!-- 居中 -->
    <div class="home-container">
        <page-header> 原子组件展示 </page-header>
        <h1>原子组件展示</h1>
        <div>
            <wb-button size="small">小按钮</wb-button>
            <wb-button size="medium">中按钮</wb-button>
            <wb-button size="large">大按钮</wb-button>
            <wb-button size="medium" type="default">默认按钮</wb-button>
            <wb-button size="medium" type="primary">主按钮</wb-button>
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
import WbTag from '@/atom/wb-tag.vue'
</script>

<style scoped>
.home-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
}

h1 {
    color: var(--default-text-color);
}
</style>
