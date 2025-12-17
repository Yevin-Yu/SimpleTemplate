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
        <path d="M3 6h18" />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
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
