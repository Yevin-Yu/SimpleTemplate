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
        class="check-icon"
        :class="customClass"
        :aria-hidden="ariaHidden ? 'true' : undefined"
    >
        <polyline points="20 6 9 17 4 12" />
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
.check-icon {
    display: inline-block;
    vertical-align: middle;
}
</style>
