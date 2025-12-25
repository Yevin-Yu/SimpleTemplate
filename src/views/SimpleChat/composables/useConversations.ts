import { computed } from 'vue'
import type { Conversation, Message } from '../types'

interface UseConversationsParams {
    conversations: { value: Conversation[] }
    currentConversationId: { value: string | null }
    saveConversations: () => void
    saveCurrentConversationId: () => void
}

/**
 * 对话管理 Composable
 * 提供对话的增删改查、消息管理等功能
 */

export function useConversations({
    conversations,
    currentConversationId,
    saveConversations,
    saveCurrentConversationId,
}: UseConversationsParams) {
    const currentConversation = computed(() => {
        return conversations.value.find(conv => conv.id === currentConversationId.value)
    })

    const currentMessages = computed(() => {
        return currentConversation.value?.messages || []
    })

    function createNewConversation() {
        const newConv: Conversation = {
            id: Date.now().toString(),
            title: '新对话',
            messages: [],
            updatedAt: Date.now(),
            createdAt: Date.now(),
        }
        conversations.value.unshift(newConv)
        currentConversationId.value = newConv.id
        saveConversations()
        saveCurrentConversationId()
    }

    function selectConversation(id: string) {
        currentConversationId.value = id
        saveCurrentConversationId()
    }

    function deleteConversation(id: string) {
        const index = conversations.value.findIndex(conv => conv.id === id)
        if (index !== -1) {
            conversations.value.splice(index, 1)
            if (currentConversationId.value === id) {
                currentConversationId.value = conversations.value.length > 0 ? conversations.value[0]?.id || null : null
            }
            saveConversations()
            saveCurrentConversationId()
        }
    }

    function addMessage(message: Message) {
        if (!currentConversation.value) return

        currentConversation.value.messages.push(message)
        currentConversation.value.updatedAt = Date.now()

        if (currentConversation.value.title === '新对话' && message.role === 'user') {
            currentConversation.value.title = message.content.substring(0, 20) || '新对话'
        }
    }

    function updateMessage(messageId: string, updater: (msg: Message) => Message) {
        if (!currentConversation.value) return

        const message = currentConversation.value.messages.find(msg => msg.id === messageId)
        if (message) {
            const updated = updater(message)
            Object.assign(message, updated)
            currentConversation.value.updatedAt = Date.now()
        }
    }

    function removeMessage(messageId: string) {
        if (!currentConversation.value) return

        const index = currentConversation.value.messages.findIndex(msg => msg.id === messageId)
        if (index !== -1) {
            currentConversation.value.messages.splice(index, 1)
        }
    }

    function initializeConversations() {
        if (currentConversationId.value) {
            const exists = conversations.value.some(conv => conv.id === currentConversationId.value)
            if (!exists) {
                currentConversationId.value = null
            }
        }

        if (conversations.value.length === 0) {
            createNewConversation()
        } else if (!currentConversationId.value && conversations.value.length > 0) {
            const firstConv = conversations.value[0]
            if (firstConv) {
                currentConversationId.value = firstConv.id
            }
        }
    }

    return {
        currentConversation,
        currentMessages,
        createNewConversation,
        selectConversation,
        deleteConversation,
        addMessage,
        updateMessage,
        removeMessage,
        initializeConversations,
    }
}

