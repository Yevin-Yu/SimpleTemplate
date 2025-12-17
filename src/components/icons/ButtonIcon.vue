<template>
    <svg
        :width="size"
        :height="size"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        :class="customClass"
        :style="{ color }"
        aria-hidden="true"
        focusable="false"
    >
        <rect x="2" y="3" width="20" height="18" rx="1.2" stroke="currentColor" stroke-width="1.9" />
        <rect x="6" y="10" width="12" height="4" rx="0.9" stroke="currentColor" stroke-width="1.9" opacity="0.95" />
        <rect x="17.4" y="5.2" width="2.6" height="2.6" rx="0.6" fill="currentColor" opacity="0.9" />
    </svg>
</template>

<script setup lang="ts">
import type { IconProps } from './index'

withDefaults(defineProps<IconProps>(), {
    size: 24,
    color: 'currentColor',
    customClass: '',
})
</script>
