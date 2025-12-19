<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="size"
        :height="size"
        viewBox="0 0 24 24"
        :class="customClass"
        :aria-hidden="ariaHidden ? 'true' : undefined"
    >
        <circle cx="12" cy="12" r="10" fill="#DE5833"/>
        <path d="M12 7v5l3.5 2" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
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
