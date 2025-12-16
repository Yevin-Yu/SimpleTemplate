<template>
    <div class="ui-card" :class="[`ui-card-${variant}`]">
        <slot></slot>
    </div>
</template>

<script setup>
// default, light
defineProps({
    variant: {
        type: String,
        default: 'default',
    },
})
</script>

<style scoped lang="less">
.ui-card {
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
}

.ui-card-light {
    border: 1px solid var(--border);
    box-shadow: var(--shadow-xs);
}
</style>
