<template>
    <button class="user-info rounded-full overflow-auto">
        <img  width="28" src="/logo.jpg" alt="User" />
    </button>
</template>

<script setup></script>

<style scoped>
.user-info:focus {
    box-shadow: 0 0 0 4px var(--border);
}
</style>
