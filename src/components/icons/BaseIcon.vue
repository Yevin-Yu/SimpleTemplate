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
        class="base-icon"
        :class="customClass"
        :aria-hidden="ariaHidden ? 'true' : undefined"
    >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" x2="12" y1="22.08" y2="12" />
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
.base-icon {
    display: inline-block;
    vertical-align: middle;
}
</style>
