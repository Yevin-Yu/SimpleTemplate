<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useCounterStore } from './stores/counter'

const counter = useCounterStore()
</script>

<template>
    <div>
        <!-- 测试 tailwindcss-->
        <div class="min-h-screen flex items-center justify-center bg-gray-100">
            <h1 class="text-4xl font-bold text-blue-600">Hello, Tailwind CSS!</h1>
        </div>
        <h1 class="text-3xl font-bold text-center text-gray-800">Vite + Vue + TypeScript + EsLint + Router + Pinia</h1>
        <nav>
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </nav>
        <hr />
        <RouterView />
        <hr />
        <div>
            <h3>Pinia Counter Store</h3>
            <p>Count: {{ counter.count }}</p>
            <p>Double: {{ counter.doubleCount }}</p>
            <button @click="counter.increment">Increment</button>
            <button @click="counter.decrement">Decrement</button>
            <button @click="counter.reset">Reset</button>
        </div>
    </div>
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}

nav {
    margin: 1rem 0;
}

nav a {
    margin: 0 0.5rem;
    color: #42b883;
    text-decoration: none;
}

nav a.router-link-active {
    font-weight: bold;
    text-decoration: underline;
}

button {
    margin: 0.5rem;
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #f0f0f0;
    cursor: pointer;
}

button:hover {
    background: #e0e0e0;
}
</style>
