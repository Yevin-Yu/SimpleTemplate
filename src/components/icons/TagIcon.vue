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
            d="M3.5 10.2V5.6C3.5 4.72 4.22 4 5.1 4H9.7c.5 0 .98.2 1.33.55l8.42 8.42c.73.73.73 1.92 0 2.65l-4.4 4.4c-.73.73-1.92.73-2.65 0l-8.42-8.42A1.87 1.87 0 0 1 3.5 10.2Z"
            stroke="currentColor"
            stroke-width="1.9"
            stroke-linejoin="round"
        />
        <!-- hole -->
        <circle cx="7.2" cy="7.2" r="1.2" fill="currentColor" />
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


