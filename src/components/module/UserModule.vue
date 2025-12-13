<template>
    <div class="user-info">
        <img class="rounded-full" width="36" src="/logo.jpg" alt="User" />
    </div>
</template>

<script setup></script>

<style scoped>
.user-info {
    img {
        background-color: var(--background);
        border: 4px solid transparent;
    }
    img:active {
        border-color: var(--border);
    }
}
</style>
