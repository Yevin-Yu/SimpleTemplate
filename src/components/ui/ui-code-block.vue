<template>
    <div class="code-block-wrapper">
        <div v-if="title" class="code-block-header">
            <span class="code-block-title">{{ title }}</span>
        </div>
        <div class="code-block-container" :class="{ 'with-header': title }">
            <ui-button v-if="showCopy" variant="default" class="copy-button" @click="copyCode" :title="copied ? '已复制' : '复制代码'">
                <template #icon>
                    <CopyIcon v-if="!copied" :size="16" />
                    <CheckIcon v-else :size="16" />
                </template>
            </ui-button>
            <!-- 语法高亮颜色由 Shiki 输出（行内 style）；class 仅用于标记语言。 -->
            <pre class="code-block" :class="`language-${language}`"><code v-html="highlightedCode"></code></pre>
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * CodeBlock（代码块）
 *
 * Props
 * - code: 代码文本
 * - language: Shiki 语言名（默认 bash）。若传入未知语言，内部会回退为原始文本。
 * - title: 可选标题（显示在顶部）
 * - showCopy: 是否展示复制按钮
 * - theme: Shiki 主题：
 *   - 'auto'（默认）：根据主题自动切换 one-light / one-dark-pro
 *   - 也可显式传入 BundledTheme（例如 'github-light'）
 *
 * Slots
 * - 无（目前只提供 Props 配置；后续若要自定义 header 可再扩展 slot）
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { codeToHtml } from 'shiki'
import type { BundledLanguage, BundledTheme } from 'shiki'
import UiButton from '@/components/ui/ui-button.vue'
import { CopyIcon, CheckIcon } from '@/components/icons'

type CodeBlockTheme = BundledTheme | 'auto'

interface Props {
    code: string
    language?: string
    title?: string
    showCopy?: boolean
    theme?: CodeBlockTheme
}

const props = withDefaults(defineProps<Props>(), {
    language: 'bash',
    showCopy: true,
    theme: 'auto',
})

const highlightedCode = ref('')
const copied = ref(false)

// 自动主题：优先 html.dark，兜底 prefers-color-scheme，并支持运行时切换
const isDark = ref(false)
let media: MediaQueryList | null = null
let observer: MutationObserver | null = null
let mqlHandler: ((e: MediaQueryListEvent) => void) | null = null

const updateIsDark = () => {
    const byClass = document.documentElement.classList.contains('dark')
    const byMedia = media?.matches ?? false
    isDark.value = byClass || byMedia
}

const effectiveTheme = computed<BundledTheme>(() => {
    if (props.theme !== 'auto') return props.theme
    return isDark.value ? 'one-dark-pro' : 'one-light'
})

const highlight = async () => {
    try {
        const html = await codeToHtml(props.code, {
            lang: props.language as BundledLanguage,
            theme: effectiveTheme.value,
        })
        // 提取 <pre><code> 内的内容
        const match = html.match(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/s)
        highlightedCode.value = match?.[1] ?? html
    } catch (error) {
        console.error('代码高亮失败:', error)
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
    // prefers-color-scheme
    media = window.matchMedia?.('(prefers-color-scheme: dark)') ?? null
    if (media) {
        mqlHandler = () => updateIsDark()
        // Safari 兼容
        if (typeof media.addEventListener === 'function') media.addEventListener('change', mqlHandler)
        else (media as unknown as { addListener: (handler: (e: MediaQueryListEvent) => void) => void }).addListener(mqlHandler)
    }

    // html.dark
    observer = new MutationObserver(() => updateIsDark())
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    updateIsDark()
    highlight()
})

onBeforeUnmount(() => {
    if (observer) {
        observer.disconnect()
        observer = null
    }
    if (media) {
        if (mqlHandler) {
            if (typeof media.removeEventListener === 'function') media.removeEventListener('change', mqlHandler)
            else (media as unknown as { removeListener: (handler: (e: MediaQueryListEvent) => void) => void }).removeListener(mqlHandler)
        }
        media = null
        mqlHandler = null
    }
})

watch(
    () => [props.code, props.language, props.theme, isDark.value],
    () => {
        highlight()
    }
)
</script>

<style scoped lang="less">
.code-block-wrapper {
    border: 1px solid var(--border);
    border-radius: var(--radius, 0px);
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
    // 注意：语法高亮颜色主要来自 Shiki 生成的 span style
    // 这里仅作为兜底（高亮失败/纯文本时）
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
</style>
