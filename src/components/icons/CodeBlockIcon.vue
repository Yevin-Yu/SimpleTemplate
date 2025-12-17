<template>
    <!-- CodeBlockIcon：表达“代码块/高亮” -->
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
        class="code-block-icon"
        :class="customClass"
        :aria-hidden="ariaHidden ? 'true' : undefined"
    >
        <rect x="2.5" y="3.5" width="19" height="17" rx="2" />
        <path d="M10 9l-3 3 3 3" />
        <path d="M14 9l3 3-3 3" />
        <path d="M12.2 8.5l-0.9 7" />
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
.code-block-icon {
    display: inline-block;
    vertical-align: middle;
}
</style>
