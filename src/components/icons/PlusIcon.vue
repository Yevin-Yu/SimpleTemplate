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
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
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

