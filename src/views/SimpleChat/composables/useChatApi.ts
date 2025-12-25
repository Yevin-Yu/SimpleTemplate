const API_URL = 'https://ai.chat.yuwb.cn/api/chat'

interface SSEChunk {
    content?: string
    done?: boolean
}

/**
 * 解析 SSE 数据行
 */
function parseSSELine(line: string): SSEChunk | null {
    if (!line.startsWith('data: ')) return null

    const dataStr = line.slice(6).trim()
    if (!dataStr) return null

    try {
        return JSON.parse(dataStr)
    } catch {
        return null
    }
}

/**
 * 处理 SSE 流数据
 */
async function processSSEStream(
    reader: ReadableStreamDefaultReader<Uint8Array>,
    onChunk: (chunk: SSEChunk) => void
): Promise<void> {
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
            const chunk = parseSSELine(line)
            if (chunk) {
                onChunk(chunk)
            }
        }
    }

    // 处理剩余的 buffer
    if (buffer) {
        const lines = buffer.split('\n')
        for (const line of lines) {
            const chunk = parseSSELine(line)
            if (chunk) {
                onChunk(chunk)
            }
        }
    }
}

/**
 * 发送聊天消息并处理 SSE 流式响应
 */
export async function sendChatMessage(
    messages: { role: string; content: string }[],
    onContent: (content: string) => void,
    onComplete: () => void,
    onError: (error: Error) => void
): Promise<void> {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages }),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const reader = response.body?.getReader()
        if (!reader) {
            throw new Error('Response body is not readable')
        }

        await processSSEStream(reader, chunk => {
            if (chunk.content) {
                onContent(chunk.content)
            }
            if (chunk.done) {
                onComplete()
            }
        })
    } catch (error) {
        onError(error instanceof Error ? error : new Error('Unknown error'))
    }
}

