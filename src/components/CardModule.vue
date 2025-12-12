<template>
    <div class="card-module">
        <div class="card-header" v-if="$slots.header">
            <slot name="header"></slot>
        </div>
        <div class="card-content">
            <slot></slot>
        </div>
    </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="less">
.card-module {
    width: 100%;
    height: 100%;
    border-radius: 6px;
    overflow: hidden;
    background: var(--white-bg-color);
    border: 1px solid var(--card-shadow-color);
    box-shadow: 3px 3px 0px var(--card-shadow-color);

    .card-header {
        color: var(--default-text-color);
        padding: 12px 16px;
        line-height: 1.5;
        background-color: var(--wb-card-header-bg-color);
        border-bottom: 1px solid var(--card-shadow-color);
    }
}
</style>
