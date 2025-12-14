<template>
    <div class="ui-card">
        <slot></slot>
    </div>
</template>

<script setup></script>

<style scoped lang="less">
.ui-card {
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
}
</style>
