<template>
    <!-- 居中 -->
    <div class="flex flex-col justify-center items-center h-screen gap-4">
        <h1>原子组件展示</h1>
        <div>
            <wb-button />
        </div>
        <div class="mt-4 flex flex-col items-center gap-2">
            <div class="text-lg">当前主题: {{ currentTheme }}</div>
            <div class="flex gap-2">
                <button v-for="theme in themes" :key="theme" class="px-4 py-2 rounded border"
                    :class="{ 'bg-blue-500 text-white': currentTheme === theme }" @click="setTheme(theme)">
                    {{ theme }}
                </button>
            </div>
            <button class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" @click="toggleTheme">
                切换主题
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import WbButton from '@/atom/wb-button.vue'
import { useTheme } from '@/hooks/useTheme'

const { currentTheme, themes, setTheme, toggleTheme } = useTheme()
</script>

<style scoped>
h1 {
    color: var(--theme-color, #42b883);
}
</style>
