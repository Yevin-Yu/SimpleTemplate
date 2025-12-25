import { marked } from 'marked'
import { codeToHtml } from 'shiki'
import type { BundledLanguage } from 'shiki'

/**
 * 检测是否为暗色主题
 */
function isDarkTheme(): boolean {
    const byClass = document.documentElement.classList.contains('dark')
    const byMedia = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false
    return byClass || byMedia
}

/**
 * 高亮代码块
 */
async function highlightCode(code: string, lang: string): Promise<string> {
    try {
        const theme = isDarkTheme() ? 'one-dark-pro' : 'one-light'
        const html = await codeToHtml(code, {
            lang: (lang || 'text') as BundledLanguage,
            theme,
        })
        // 提取 <pre><code> 内的内容
        const match = html.match(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/s)
        return match?.[1] ?? code
    } catch (error) {
        console.error('代码高亮失败:', error)
        return escapeHtml(code)
    }
}

/**
 * 转义 HTML
 */
function escapeHtml(text: string): string {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
}

/**
 * 获取或创建 marked 渲染器
 */
function getMarkedRenderer() {
    const renderer = new marked.Renderer()

    // 自定义代码块渲染（marked v17 使用对象参数）
    renderer.code = ({ text, lang }) => {
        const code = typeof text === 'string' ? text : String(text || '')
        const language = (lang && typeof lang === 'string') ? lang : 'text'
        // 先返回未高亮的代码，后续通过异步处理高亮
        return `<pre class="markdown-code-block" data-lang="${escapeHtml(language)}"><code class="language-${escapeHtml(language)}">${escapeHtml(code)}</code></pre>`
    }

    // 自定义行内代码渲染
    renderer.codespan = ({ text }) => {
        const code = typeof text === 'string' ? text : String(text || '')
        return `<code class="markdown-inline-code">${escapeHtml(code)}</code>`
    }

    // 自定义链接渲染（添加 target="_blank"）
    renderer.link = ({ href, title, tokens }) => {
        const text = tokens?.map(t => typeof t === 'string' ? t : (t as any).text || '').join('') || ''
        const titleAttr = title ? ` title="${escapeHtml(title)}"` : ''
        return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer"${titleAttr}>${text}</a>`
    }

    return renderer
}

/**
 * 高亮代码块（异步处理）
 */
async function highlightCodeBlocks(html: string): Promise<string> {
    if (!html || typeof html !== 'string') {
        return ''
    }
    
    const codeBlockRegex = /<pre class="markdown-code-block" data-lang="([^"]+)"><code class="language-[^"]+">([\s\S]*?)<\/code><\/pre>/g
    const matches = Array.from(html.matchAll(codeBlockRegex))
    
    if (matches.length === 0) return html

    let result = html
    for (const match of matches) {
        const [fullMatch, lang, code] = match
        if (code && typeof code === 'string') {
            const highlighted = await highlightCode(unescapeHtml(code), lang || 'text')
            result = result.replace(fullMatch, `<pre class="markdown-code-block"><code class="language-${escapeHtml(lang || 'text')}">${highlighted}</code></pre>`)
        }
    }

    return result
}

/**
 * 反转义 HTML
 */
function unescapeHtml(html: string): string {
    const div = document.createElement('div')
    div.innerHTML = html
    return div.textContent || div.innerText || ''
}

/**
 * 将 Markdown 文本转换为 HTML
 */
export async function markdownToHtml(markdown: string): Promise<string> {
    try {
        if (!markdown || typeof markdown !== 'string') {
            return ''
        }
        
        // 使用自定义渲染器
        const renderer = getMarkedRenderer()
        const html = await marked.parse(markdown, { renderer })
        
        // 确保返回的是字符串
        const htmlString = typeof html === 'string' ? html : String(html)
        
        // 异步高亮代码块
        const highlightedHtml = await highlightCodeBlocks(htmlString)
        return highlightedHtml
    } catch (error) {
        console.error('Markdown 解析失败:', error)
        return escapeHtml(markdown || '')
    }
}

