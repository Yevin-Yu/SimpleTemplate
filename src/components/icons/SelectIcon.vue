<template>
    <!--
        SelectIcon
        - 表达“下拉菜单/选择器”：一个触发框 + 下拉箭头
        - 风格对齐现有 icon：stroke=currentColor，支持 size/color/customClass/ariaHidden
    -->
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="size"
        :height="size"
        viewBox="0 0 24 24"
        fill="none"
        :stroke="color"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="select-icon"
        :class="customClass"
        :aria-hidden="ariaHidden ? 'true' : undefined"
    >
        <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
        <path d="M6.6 10h9.2" />
        <path d="M15.6 10l2.2 2.2 2.2-2.2" />
    </svg>
</template>

<script setup>
defineProps({
    size: {
        type: [Number, String],
        default: 16,
    },
    color: {
        type: String,
        default: 'currentColor',
    },
    customClass: {
        type: String,
        default: '',
    },
    ariaHidden: {
        type: Boolean,
        default: true,
    },
})
</script>

<style scoped>
.select-icon {
    display: inline-block;
    vertical-align: middle;
}
</style>


