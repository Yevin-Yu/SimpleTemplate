<template>
    <div class="wb-tag" :class="`wb-tag-${size}`">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
defineProps({
    // size small, medium, large
    size: {
        type: String,
        default: 'medium',
    },
})
</script>
<style scoped>
.wb-tag {
    cursor: pointer;
    display: inline-block;
    margin: 6px 12px;
    border-radius: 2px;
    font-size: 14px;
    padding: 8px 16px;
    color: var(--wb-tag-color);
    background-color: var(--wb-tag-bg-color);
    font-size: 12px;
    box-shadow: 0 3px 0px var(--wb-tag-shadow-color);
    transition: all 0.1s ease-in-out;
    user-select: none;
}

.wb-tag-small {
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 2px;
}

.wb-tag-medium {
    padding: 10px 20px;
    font-size: 16px;
    box-shadow: 0 3.5px 0px var(--wb-tag-shadow-color);
}

.wb-tag-large {
    padding: 12px 24px;
    font-size: 20px;
    box-shadow: 0 4px 0px var(--wb-tag-shadow-color);
}

.wb-tag:hover {
    transform: scale(1.05);
    filter: brightness(0.95);
}

.wb-tag:active {
    transform: scale(0.99);
}
</style>
