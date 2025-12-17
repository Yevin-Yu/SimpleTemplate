<template>
    <!-- ContextMenuIcon：表达“右键菜单/列表菜单” -->
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
        class="context-menu-icon"
        :class="customClass"
        :aria-hidden="ariaHidden ? 'true' : undefined"
    >
        <rect x="2.5" y="4" width="19" height="16" rx="2" />
        <path d="M7 9h10" />
        <path d="M7 13h10" />
        <path d="M7 17h6" />
        <circle cx="18" cy="17" r="1" fill="currentColor" :style="{ color }" />
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
.context-menu-icon {
    display: inline-block;
    vertical-align: middle;
}
</style>
