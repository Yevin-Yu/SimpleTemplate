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
        class="search-icon"
        :class="customClass"
        :aria-hidden="ariaHidden ? 'true' : undefined"
    >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
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
.search-icon {
    display: inline-block;
    vertical-align: middle;
}
</style>
