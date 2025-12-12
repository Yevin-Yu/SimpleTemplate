<template>
    <button class="wb-button2" :class="`wb-button2-${size}`">
        <slot></slot>
    </button>
</template>
<script setup lang="ts">
// 传参
defineProps({
    // size small, medium, large
    size: {
        type: String,
        default: 'medium',
    },
})
</script>
<style scoped>
.wb-button2 {
    background-color: var(--theme-color);
    color: var(--wb-button-text-color);
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 2px;
    margin: 6px 12px;
    transition: all 0.1s ease-in-out;
    position: relative;
}

.wb-button2:hover {
    transform: scale(1.03);
    box-shadow: var(--we-button2-shadow);
}

.wb-button2:active {
    box-shadow: var(--we-button2-shadow-active);
    filter: brightness(0.95);
}

.wb-button2-small {
    padding: 8px 16px;
    font-size: 14px;
}

.wb-button2-medium {
    padding: 10px 20px;
    font-size: 16px;
}

.wb-button2-large {
    padding: 12px 24px;
    font-size: 20px;
}
</style>
