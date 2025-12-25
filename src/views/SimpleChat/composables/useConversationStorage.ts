import { ref, watch } from 'vue'
import { safeGetItem, safeSetItem } from '@/shared/storage'
import { STORAGE_KEYS } from '@/shared/storageKeys'
import type { Conversation } from '../types'

/**
 * 对话存储管理 Composable
 * 负责对话列表和当前选中对话ID的本地存储
 */
export function useConversationStorage() {
    const conversations = ref<Conversation[]>(loadConversations())
    const currentConversationId = ref<string | null>(loadCurrentConversationId())

    function loadConversations(): Conversation[] {
        const stored = safeGetItem(STORAGE_KEYS.CHAT_CONVERSATIONS)
        if (!stored) return []

        try {
            return JSON.parse(stored)
        } catch {
            return []
        }
    }

    function saveConversations() {
        safeSetItem(STORAGE_KEYS.CHAT_CONVERSATIONS, JSON.stringify(conversations.value))
    }

    function loadCurrentConversationId(): string | null {
        const stored = safeGetItem(STORAGE_KEYS.CHAT_CURRENT_CONVERSATION_ID)
        return stored || null
    }

    function saveCurrentConversationId() {
        if (currentConversationId.value) {
            safeSetItem(STORAGE_KEYS.CHAT_CURRENT_CONVERSATION_ID, currentConversationId.value)
        } else {
            safeSetItem(STORAGE_KEYS.CHAT_CURRENT_CONVERSATION_ID, '')
        }
    }

    watch(
        conversations,
        () => {
            saveConversations()
        },
        { deep: true }
    )

    watch(currentConversationId, () => {
        saveCurrentConversationId()
    })

    return {
        conversations,
        currentConversationId,
        saveConversations,
        saveCurrentConversationId,
    }
}

