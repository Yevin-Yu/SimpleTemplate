<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="size"
        :height="size"
        viewBox="0 0 24 24"
        :class="customClass"
        :aria-hidden="ariaHidden ? 'true' : undefined"
    >
        <rect width="24" height="24" fill="#2932E1"/>
        <circle cx="7" cy="9" r="1.5" fill="white"/>
        <circle cx="17" cy="9" r="1.5" fill="white"/>
        <ellipse cx="12" cy="15" rx="3" ry="2" fill="white"/>
        <path d="M10 10.5c0-1.1.9-2 2-2s2 .9 2 2" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    </svg>
</template>

<script setup>
defineProps({
    size: {
        type: [Number, String],
        default: 16,
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
svg {
    display: inline-block;
    vertical-align: middle;
}
</style>
