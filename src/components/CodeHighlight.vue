<template>
    <div class="code-highlight">
        <pre class="code-block light-theme"><code ref="codeElement"></code></pre>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import * as shiki from 'shiki'
const props = defineProps<{
    code: string
    language: string
}>()

const codeElement = ref<HTMLElement | null>(null)
let highlighter: shiki.Highlighter | null = null

// 初始化高亮器
const initHighlighter = async () => {
    try {
        highlighter = await shiki.createHighlighter({
            themes: ['github-dark', 'github-light'],
            langs: ['javascript', 'typescript', 'vue', 'html', 'css'],
        })
    } catch (error) {
        console.error('Shiki 高亮器初始化失败:', error)
    }
}

// 高亮代码
const highlightCode = async () => {
    if (!codeElement.value || !highlighter) return
    try {
        const html = highlighter.codeToHtml(props.code, {
            lang: props.language,
            theme: 'github-light',
        })
        codeElement.value.innerHTML = html
    } catch (error) {
        console.error('代码高亮失败:', error)
        // 如果高亮失败，显示原始代码
        codeElement.value.textContent = props.code
    }
}

// 监听代码变化并重新高亮
watch(
    () => [props.code, props.language],
    () => {
        nextTick(() => {
            highlightCode()
        })
    }
)

onMounted(async () => {
    await initHighlighter()
    highlightCode()
})
</script>

<style scoped lang="less">
.code-highlight {
    overflow: auto;
    padding: 16px;
    font-size: 18px;
}
</style>
