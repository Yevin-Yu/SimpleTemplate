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
        class="eye-icon"
        :class="customClass"
        :aria-hidden="ariaHidden ? 'true' : undefined"
    >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
</template>

<script setup>
defineProps({
    size: {
        type: [Number, String],
        default: 20,
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
.eye-icon {
    display: inline-block;
    vertical-align: middle;
}
</style>
