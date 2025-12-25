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
        class="avatar-user-icon"
        :class="customClass"
        :aria-hidden="ariaHidden ? 'true' : undefined"
    >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
</template>

<script setup lang="ts">
import type { IconProps } from './index'

withDefaults(defineProps<IconProps>(), {
    size: 16,
    color: 'currentColor',
    customClass: '',
    ariaHidden: true,
})
</script>

<style scoped>
.avatar-user-icon {
    display: inline-block;
    vertical-align: middle;
}
</style>

