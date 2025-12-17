<template>
    <!-- SwitchIcon：表达“开关” -->
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
        class="switch-icon"
        :class="customClass"
        :aria-hidden="ariaHidden ? 'true' : undefined"
    >
        <rect x="2.5" y="7" width="19" height="10" rx="5" />
        <circle cx="15.5" cy="12" r="3" fill="currentColor" :style="{ color }" />
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
.switch-icon {
    display: inline-block;
    vertical-align: middle;
}
</style>
