<template>
    <!--
        TagIcon
        - 简洁的“标签”造型：外轮廓 + 左侧打孔
        - 风格对齐现有 icon：currentColor + size/color/customClass
    -->
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
        <!-- tag outline -->
        <path
            d="M2.8 10.6V5.4C2.8 4.3 3.7 3.4 4.8 3.4H10c.62 0 1.21.25 1.65.68l8.75 8.75c.85.85.85 2.23 0 3.08l-4.56 4.56c-.85.85-2.23.85-3.08 0L3.48 12.25A2.2 2.2 0 0 1 2.8 10.6Z"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linejoin="round"
        />
        <!-- hole -->
        <circle cx="7.4" cy="7.1" r="1.4" fill="currentColor" />
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
