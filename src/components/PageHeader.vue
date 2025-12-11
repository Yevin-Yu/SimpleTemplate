<template>
    <div class="page-header">
        <h1>课件上传</h1>
        <span class="page-description"> 选择目标文件夹并上传课件文件 </span>
    </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.page-header {
    width: calc(100% - 32px);
    margin: 16px;
    border-radius: 6px;
    padding: 16px;
    background: white;
    border-bottom: 1px solid #e4e7ed;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    h1 {
        font-size: 24px;
        color: #303133;
        margin: 0;
        display: inline-block;
    }

    .page-description {
        padding-left: 16px;
        color: #909399;
        font-size: 14px;
        display: inline-block;
    }
}
</style>
