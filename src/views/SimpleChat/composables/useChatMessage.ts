import { ref } from 'vue'
import type { Message } from '../types'
import { sendChatMessage } from './useChatApi'

interface UseChatMessageParams {
    addMessage: (message: Message) => void
    updateMessage: (messageId: string, updater: (msg: Message) => Message) => void
    removeMessage: (messageId: string) => void
    getCurrentConversation: () => { messages: Message[]; updatedAt: number } | null
    formatMessage: (messageId: string, content: string) => Promise<string>
    shouldThrottleFormat: (messageId: string) => boolean
    scrollToBottom: () => Promise<void>
}

/**
 * 聊天消息发送管理 Composable
 * 处理消息发送和流式响应
 */
export function useChatMessage({
    addMessage,
    updateMessage,
    removeMessage,
    getCurrentConversation,
    formatMessage,
    shouldThrottleFormat,
    scrollToBottom,
}: UseChatMessageParams) {
    const streamingMessageId = ref<string | null>(null)

    async function sendMessage(content: string) {
        const conversation = getCurrentConversation()
        if (!content.trim() || !conversation) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: content.trim(),
            timestamp: Date.now(),
        }

        addMessage(userMessage)
        await scrollToBottom()

        const assistantMessageId = (Date.now() + 1).toString()
        const assistantMessage: Message = {
            id: assistantMessageId,
            role: 'assistant',
            content: '',
            timestamp: Date.now(),
        }

        addMessage(assistantMessage)
        streamingMessageId.value = assistantMessageId
        await scrollToBottom()

        const messagesToSend = conversation.messages
            .filter(msg => msg.role !== 'assistant' || msg.id !== assistantMessageId)
            .map(msg => ({
                role: msg.role,
                content: msg.content,
            }))

        await sendChatMessage(
            messagesToSend,
            async (chunk: string) => {
                updateMessage(assistantMessageId, msg => ({
                    ...msg,
                    content: msg.content + chunk,
                }))

                if (shouldThrottleFormat(assistantMessageId)) {
                    const updatedConversation = getCurrentConversation()
                    const assistantMsg = updatedConversation?.messages.find(msg => msg.id === assistantMessageId)
                    if (assistantMsg) {
                        await formatMessage(assistantMessageId, assistantMsg.content)
                    }
                }
                await scrollToBottom()
            },
            async () => {
                streamingMessageId.value = null
                const updatedConversation = getCurrentConversation()
                if (updatedConversation) {
                    const assistantMsg = updatedConversation.messages.find(msg => msg.id === assistantMessageId)
                    if (assistantMsg) {
                        await formatMessage(assistantMessageId, assistantMsg.content)
                    }
                    updatedConversation.updatedAt = Date.now()
                }
            },
            (error: Error) => {
                streamingMessageId.value = null
                console.error('Failed to send message:', error)
                const updatedConversation = getCurrentConversation()
                if (updatedConversation) {
                    const assistantMsg = updatedConversation.messages.find(msg => msg.id === assistantMessageId)
                    if (assistantMsg && !assistantMsg.content) {
                        removeMessage(assistantMessageId)
                    } else if (assistantMsg) {
                        assistantMsg.content = '抱歉，消息发送失败，请稍后重试。'
                    }
                }
            }
        )
    }

    return {
        streamingMessageId,
        sendMessage,
    }
}

