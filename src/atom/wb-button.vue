<template>
    <button class="wb-button" :class="`wb-button-${size} wb-button-${type}`">
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
    // type primary, default
    type: {
        type: String,
        default: 'primary',
    },
})
</script>
<style scoped>
.wb-button {
    background-color: var(--theme-color);
    color: var(--wb-button-text-color);
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 2px;
    margin: 6px 12px;
    box-shadow: 2px 2px 0 var(--wb-button-default-shadow-color);
    transition: all 0.1s ease-in-out;
    position: relative;
}

.wb-button:hover {
    transform: scale(1.03);
    box-shadow: 4px 4px 8px var(--wb-button-hover-shadow-color);
}

.wb-button:active {
    transform: scale(0.98) translate(1px, 1px);
    box-shadow: 0px 0px 0 var(--wb-button-default-shadow-color);
    filter: brightness(0.95);
}

.wb-button-small {
    padding: 8px 16px;
    font-size: 14px;
}

.wb-button-medium {
    padding: 10px 20px;
    font-size: 16px;
}

.wb-button-large {
    padding: 12px 24px;
    font-size: 20px;
}

.wb-button-default {
    color: var(--wb-button-default-color);
    background-color: var(--wb-button-default-bg-color);
}
</style>
