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
        class="avatar-ai-icon"
        :class="customClass"
        :aria-hidden="ariaHidden ? 'true' : undefined"
    >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
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
.avatar-ai-icon {
    display: inline-block;
    vertical-align: middle;
}
</style>

