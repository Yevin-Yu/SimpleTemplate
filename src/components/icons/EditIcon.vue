<template>
    <svg
        :class="customClass"
        :width="size"
        :height="size"
        viewBox="0 0 24 24"
        fill="none"
        :stroke="color"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        :aria-hidden="ariaHidden"
    >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
</template>

<script setup lang="ts">
import type { IconProps } from './index'

withDefaults(
    defineProps<
        IconProps & {
            ariaHidden?: boolean
        }
    >(),
    {
        size: 16,
        color: 'currentColor',
        customClass: '',
        ariaHidden: true,
    }
)
</script>
