<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="size"
        :height="size"
        viewBox="0 0 24 24"
        :class="customClass"
        :aria-hidden="ariaHidden ? 'true' : undefined"
    >
        <rect width="24" height="24" fill="#008373"/>
        <path d="M7 6h10v2H7V6zm0 4h10v2H7v-2zm0 4h6v2H7v-2zm8 0h2v6h-2v-6z" fill="white"/>
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
