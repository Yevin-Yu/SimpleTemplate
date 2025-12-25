import { ref } from 'vue'
import { markdownToHtml } from '../utils/markdown'

const FORMAT_THROTTLE_PROBABILITY = 0.2 // 流式输出时格式化的概率，降低频繁格式化开销

/**
 * 消息格式化管理 Composable
 * 负责消息的 Markdown 格式化和缓存
 */
export function useMessageFormat() {
    const formattedMessages = ref<Record<string, string>>({})

    async function formatMessage(messageId: string, content: string): Promise<string> {
        if (!content) return ''
        formattedMessages.value[messageId] = await markdownToHtml(content)
        return formattedMessages.value[messageId]
    }

    async function formatMessages(messages: Array<{ id: string; content: string }>) {
        const tasks = messages
            .filter(msg => !formattedMessages.value[msg.id] && msg.content)
            .map(msg => formatMessage(msg.id, msg.content))
        await Promise.all(tasks)
    }

    function shouldThrottleFormat(messageId: string): boolean {
        return !formattedMessages.value[messageId] || Math.random() < FORMAT_THROTTLE_PROBABILITY
    }

    function clearFormattedMessages() {
        formattedMessages.value = {}
    }

    return {
        formattedMessages,
        formatMessage,
        formatMessages,
        shouldThrottleFormat,
        clearFormattedMessages,
    }
}

