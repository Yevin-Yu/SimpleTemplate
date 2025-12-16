<template>
    <div class="code-block-wrapper">
        <div v-if="title" class="code-block-header">
            <span class="code-block-title">{{ title }}</span>
        </div>
        <div class="code-block-container" :class="{ 'with-header': title }">
            <ui-button v-if="showCopy" type="default" class="copy-button" @click="copyCode" :title="copied ? '已复制' : '复制代码'">
                <template #icon>
                    <CopyIcon v-if="!copied" :size="16" />
                    <CheckIcon v-else :size="16" />
                </template>
            </ui-button>
            <pre class="code-block" :class="`language-${language}`"><code v-html="highlightedCode"></code></pre>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { codeToHtml } from 'shiki'
import type { BundledLanguage, BundledTheme } from 'shiki'
import uiButton from '@/components/ui/ui-button.vue'
import CopyIcon from '@/components/icons/CopyIcon.vue'
import CheckIcon from '@/components/icons/CheckIcon.vue'

interface Props {
    code: string
    language?: string
    title?: string
    showCopy?: boolean
    theme?: BundledTheme
}

const props = withDefaults(defineProps<Props>(), {
    language: 'bash',
    showCopy: true,
    theme: 'github-light',
})

const highlightedCode = ref('')
const copied = ref(false)

const highlight = async () => {
    try {
        const html = await codeToHtml(props.code, {
            lang: props.language as BundledLanguage,
            theme: props.theme,
        })
        // 提取 <pre><code> 内的内容
        const match = html.match(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/s)
        highlightedCode.value = match?.[1] ?? html
    } catch (error) {
        console.error('代码高亮失败:', error)
        // 如果高亮失败，使用原始代码
        highlightedCode.value = escapeHtml(props.code)
    }
}

const escapeHtml = (text: string) => {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
}

const copyCode = async () => {
    try {
        await navigator.clipboard.writeText(props.code)
        copied.value = true
        setTimeout(() => {
            copied.value = false
        }, 2000)
    } catch (error) {
        console.error('复制失败:', error)
    }
}

onMounted(() => {
    highlight()
})

watch(
    () => [props.code, props.language, props.theme],
    () => {
        highlight()
    }
)
</script>

<style scoped lang="less">
.code-block-wrapper {
    border: 1px solid var(--border);
    border-radius: 4px;
    overflow: hidden;
    background: var(--card);
    box-shadow: var(--shadow-xs);
}

.code-block-header {
    padding: 12px 16px;
    background: var(--muted);
    border-bottom: 1px solid var(--border);
}

.code-block-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--foreground);
}

.code-block-container {
    position: relative;
    overflow-x: auto;

    &.with-header {
        border-top: none;
    }
}

.copy-button {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 10;
    width: 32px;
    height: 32px;
    min-width: 32px;
    padding: 0;
    line-height: 32px;

    :deep(svg) {
        pointer-events: none;
    }
}

.code-block {
    margin: 0;
    padding: 16px 48px 16px 16px;
    font-family: var(--font-mono);
    font-size: 14px;
    line-height: 1.6;
    color: var(--foreground);
    background: var(--card);
    overflow-x: auto;
    tab-size: 2;

    :deep(code) {
        display: block;
        width: 100%;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        color: inherit;
        background: transparent;
        padding: 0;
        border: none;
    }
}

// 确保代码块在暗色主题下也有良好的显示
.dark .code-block {
    background: var(--card);
}
</style>
