<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="size"
        :height="size"
        viewBox="0 0 24 24"
        fill="none"
        :stroke="color"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="x-icon"
        :class="customClass"
        :aria-hidden="ariaHidden ? 'true' : undefined"
    >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
</template>

<script setup lang="ts">
interface Props {
    size?: number | string
    color?: string
    customClass?: string
    ariaHidden?: boolean
}

withDefaults(defineProps<Props>(), {
    size: 16,
    color: 'currentColor',
    customClass: '',
    ariaHidden: true,
})
</script>

<style scoped>
.x-icon {
    display: inline-block;
    vertical-align: middle;
}
</style>
