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
        class="example-icon"
        :class="customClass"
        :aria-hidden="ariaHidden ? 'true' : undefined"
    >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <line x1="9" x2="15" y1="3" y2="3" />
        <line x1="9" x2="15" y1="21" y2="21" />
        <line x1="3" x2="3" y1="9" y2="15" />
        <line x1="21" x2="21" y1="9" y2="15" />
        <circle cx="12" cy="12" r="2" />
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
.example-icon {
    display: inline-block;
    vertical-align: middle;
}
</style>
