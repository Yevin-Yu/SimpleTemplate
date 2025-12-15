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
        class="switch-off-icon"
        :class="customClass"
        aria-hidden="true"
    >
        <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
        />
    </svg>
</template>

<script setup>
defineProps({
    size: {
        type: [Number, String],
        default: 14,
    },
    color: {
        type: String,
        default: 'currentColor',
    },
    customClass: {
        type: String,
        default: '',
    },
})
</script>

<style scoped>
.switch-off-icon {
    display: inline-block;
    vertical-align: middle;
}
</style>

