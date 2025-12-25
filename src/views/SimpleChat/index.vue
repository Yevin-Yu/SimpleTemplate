<template>
    <div class="simple-chat">
        <div class="chat-container">
            <!-- 左侧对话列表 -->
            <div class="conversation-list">
                <div class="conversation-header">
                    <span class="conversation-title">对话列表</span>
                    <ui-button variant="blank" size="small" @click="createNewConversation">
                        <template #icon>
                            <PlusIcon :size="16" />
                        </template>
                    </ui-button>
                </div>
                <div class="conversation-items">
                    <div
                        v-for="conv in conversations"
                        :key="conv.id"
                        class="conversation-item"
                        :class="{ active: conv.id === currentConversationId }"
                        @click="selectConversation(conv.id)"
                    >
                        <div class="conversation-info">
                            <div class="conversation-name">{{ conv.title }}</div>
                            <div class="conversation-time">{{ formatTime(conv.updatedAt) }}</div>
                        </div>
                        <ui-button
                            variant="blank"
                            size="small"
                            class="conversation-close"
                            @click.stop="deleteConversation(conv.id)"
                        >
                            <template #icon>
                                <XIcon :size="16" />
                            </template>
                        </ui-button>
                    </div>
                </div>
            </div>

            <!-- 右侧聊天区域 -->
            <div class="chat-area">
                <div class="chat-header">
                    <div class="chat-header-left">
                        <span class="star-icon">★</span>
                        <div class="chat-title-wrapper">
                            <span class="chat-title">SimpleChat</span>
                            <span class="chat-subtitle">使用 Deepseek API</span>
                        </div>
                    </div>
                </div>

                <div class="chat-messages" ref="messagesContainerRef" @scroll="handleScroll">
                    <div class="messages-content">
                        <div v-for="msg in currentMessages" :key="msg.id" class="message-item" :class="msg.role">
                            <div class="message-avatar" :class="msg.role === 'assistant' ? 'avatar-ai' : 'avatar-user'">
                                <AvatarAIIcon v-if="msg.role === 'assistant'" :size="20" />
                                <AvatarUserIcon v-else :size="20" />
                            </div>
                            <div class="message-content">
                                <div v-html="formattedMessages[msg.id] || msg.content"></div>
                                <div v-if="streamingMessageId === msg.id" class="typing-indicator">
                                    <span class="typing-dot"></span>
                                    <span class="typing-dot"></span>
                                    <span class="typing-dot"></span>
                                </div>
                            </div>
                        </div>
                        <div class="messages-bottom-spacer"></div>
                    </div>
                  
                </div>
                <div class="input-wrapper">
                    <textarea
                        v-model="inputMessage"
                        class="message-input"
                        placeholder="输入消息... (按 Enter 发送, Shift+Enter 换行)"
                        @keydown="handleKeydown"
                        rows="2"
                    ></textarea>
                    <ui-button variant="primary" size="small" class="send-button" @click="sendMessage" :disabled="!inputMessage.trim()">
                        <template #icon>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </template>
                    </ui-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue'
import UiButton from '@/components/ui/ui-button.vue'
import { PlusIcon, XIcon, AvatarAIIcon, AvatarUserIcon } from '@/components/icons'
import { useConversationStorage } from './composables/useConversationStorage'
import { useConversations } from './composables/useConversations'
import { useScroll } from './composables/useScroll'
import { useMessageFormat } from './composables/useMessageFormat'
import { useChatMessage } from './composables/useChatMessage'
import { formatTime } from './utils/formatter'

const messagesContainerRef = ref<HTMLElement>()
const inputMessage = ref('')

const { conversations, currentConversationId, saveConversations, saveCurrentConversationId } = useConversationStorage()

const {
    currentConversation,
    currentMessages,
    createNewConversation,
    selectConversation,
    deleteConversation,
    addMessage,
    updateMessage,
    removeMessage,
    initializeConversations,
} = useConversations({
    conversations,
    currentConversationId,
    saveConversations,
    saveCurrentConversationId,
})

const { scrollToBottom, handleScroll, shouldAutoScroll } = useScroll(messagesContainerRef)

const { formattedMessages, formatMessages, formatMessage, shouldThrottleFormat, clearFormattedMessages } = useMessageFormat()

const { streamingMessageId, sendMessage: sendChatMessage } = useChatMessage({
    addMessage,
    updateMessage,
    removeMessage,
    getCurrentConversation: () => currentConversation.value || null,
    formatMessage,
    shouldThrottleFormat,
    scrollToBottom,
})

async function sendMessage() {
    const content = inputMessage.value
    inputMessage.value = ''
    await sendChatMessage(content)
}

function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        sendMessage()
    }
}

watch(currentConversationId, async () => {
    clearFormattedMessages()
    await nextTick()
    if (currentMessages.value.length > 0) {
        await formatMessages(currentMessages.value.map(msg => ({ id: msg.id, content: msg.content })))
    }
    await nextTick()
    await scrollToBottom()
})

watch(
    currentMessages,
    async (messages) => {
        await formatMessages(messages.map(msg => ({ id: msg.id, content: msg.content })))
        if (shouldAutoScroll()) {
            await scrollToBottom()
        }
    },
    { deep: true, immediate: true }
)

onMounted(async () => {
    initializeConversations()
    await nextTick()
    if (currentMessages.value.length > 0) {
        await formatMessages(currentMessages.value.map(msg => ({ id: msg.id, content: msg.content })))
    }
    await nextTick()
    await scrollToBottom()
})
</script>

<style scoped lang="less">
.simple-chat {
    display: flex;
    flex-direction: column;
    height: calc(100% - 32px);
    width: calc(100% - 32px);
    max-width: 1200px;
    margin: 16px auto;
    padding: 0;
    background: var(--card);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-md);
    overflow: hidden;
}

.chat-container {
    display: flex;
    height: 100%;
    width: 100%;
}

.conversation-list {
    width: 280px;
    border-right: 1px solid var(--border);
    background: var(--card);
    display: flex;
    flex-direction: column;
}

.conversation-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 56px;
    padding: 0 20px;
    border-bottom: 1px solid var(--border);
}

.conversation-title {
    font-size: 15px;
    color: var(--foreground);
}

.conversation-items {
    flex: 1;
    overflow-y: auto;
    padding: 8px;

    // 自定义滚动条样式
    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: var(--muted-foreground);
        border-radius: 3px;
        opacity: 0.2;
        transition: opacity 0.2s ease;

        &:hover {
            opacity: 0.4;
        }
    }

    // Firefox
    scrollbar-width: thin;
    scrollbar-color: rgba(109, 106, 98, 0.2) transparent;
}

.conversation-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px;
    margin-bottom: 4px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: var(--muted);
    }

    &.active {
        background: var(--primary);
        color: var(--primary-foreground);
    }
}

.conversation-info {
    flex: 1;
    min-width: 0;
}

.conversation-name {
    font-size: 14px;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.conversation-time {
    font-size: 12px;
    opacity: 0.65;
    margin-top: 4px;
    line-height: 1.4;
}

.conversation-close {
    opacity: 0;
    transition: opacity 0.2s;
}

.conversation-item:hover .conversation-close {
    opacity: 1;
}

.chat-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: var(--background);
    position: relative;
}

.chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 56px;
    padding: 0 20px;
    border-bottom: 1px solid var(--border);
    background: var(--card);
}

.chat-header-left {
    display: flex;
    align-items: center;
    gap: 8px;
}

.star-icon {
    color: #fbbf24;
    font-size: 16px;
}

.chat-title-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
}

.chat-title {
    font-size: 16px;
    color: var(--foreground);
    line-height: 1.2;
}

.chat-subtitle {
    font-size: 12px;
    color: var(--muted-foreground);
    line-height: 1.2;
}

.chat-messages {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 20px;
    padding-bottom: 180px;
    display: flex;
    flex-direction: column;
    position: relative;
    min-height: 0;

    // 自定义滚动条样式
    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: var(--muted-foreground);
        border-radius: 4px;
        opacity: 0.2;
        transition: opacity 0.2s ease;

        &:hover {
            opacity: 0.4;
        }
    }

    // Firefox
    scrollbar-width: thin;
    scrollbar-color: rgba(109, 106, 98, 0.2) transparent;
}

.messages-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
}

.messages-bottom-spacer {
    height: 120px;
    flex-shrink: 0;
}

.message-item {
    display: flex;
    flex-direction: row;
    width: 100%;
    min-width: 0;
    gap: 10px;
    margin-bottom: 20px;
    align-items: flex-start;

    &.user {
        flex-direction: row-reverse;

        .message-content {
            background: var(--primary);
            color: var(--primary-foreground);
            max-width: 75%;
            min-width: 0;
        }
    }

    &.assistant {
        .message-content {
            background: var(--card);
            border: 1px solid var(--border);
            color: var(--foreground);
            max-width: 75%;
            min-width: 0;
        }
    }
}

.message-avatar {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.message-avatar.avatar-ai {
    background: var(--primary);
    color: var(--primary-foreground);
}

.message-avatar.avatar-user {
    background: var(--muted);
    color: var(--foreground);
}

.message-content {
    padding: 0 12px;
    border-radius: 6px;
    word-wrap: break-word;
    word-break: break-word;
    overflow-wrap: break-word;
    line-height: 1.5;
    max-width: 100%;
    overflow: hidden;

    :deep(.markdown-inline-code) {
        background: rgba(0, 0, 0, 0.1);
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
        font-size: 0.9em;
        word-break: break-all;
    }

    :deep(.markdown-code-block) {
        background: var(--muted);
        border: 1px solid var(--border);
        border-radius: 6px;
        padding: 12px;
        margin: 12px 0;
        overflow-x: auto;
        max-width: 100%;
        font-size: 0.9em;
        line-height: 1.6;

        code {
            background: transparent;
            padding: 0;
            border-radius: 0;
            font-family: 'Courier New', monospace;
            white-space: pre;
            word-break: normal;
        }
    }

    :deep(table) {
        border-collapse: collapse;
        width: 100%;
        margin: 12px 0;
        font-size: 0.9em;

        th,
        td {
            border: 1px solid var(--border);
            padding: 8px 12px;
            text-align: left;
        }

        th {
            background: var(--muted);
            font-weight: 500;
        }
    }

    :deep(ul, ol) {
        margin: 8px 0;
        padding-left: 24px;
    }

    :deep(li) {
        margin: 4px 0;
    }

    :deep(blockquote) {
        border-left: 3px solid var(--primary);
        padding-left: 12px;
        margin: 12px 0;
        color: var(--muted-foreground);
        font-style: italic;
    }

    :deep(a) {
        color: var(--primary);
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }

    :deep(hr) {
        border: none;
        border-top: 1px solid var(--border);
        margin: 16px 0;
    }

    :deep(h1, h2, h3, h4, h5, h6) {
        margin: 16px 0 8px;
        font-weight: 500;
        line-height: 1.4;
    }

    :deep(h1) {
        font-size: 1.5em;
    }

    :deep(h2) {
        font-size: 1.3em;
    }

    :deep(h3) {
        font-size: 1.1em;
    }

    :deep(p) {
        margin: 8px 0;
    }
}

.typing-indicator {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-left: 8px;
    vertical-align: middle;
}

.typing-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--primary);
    animation: typing-bounce 1.4s infinite ease-in-out;
    box-shadow: 0 0 6px rgba(226, 169, 25, 0.4);
}

.message-item.assistant .typing-dot {
    background: var(--primary);
}

.message-item.user .typing-dot {
    background: var(--primary-foreground);
}

.typing-dot:nth-child(1) {
    animation-delay: -0.32s;
}

.typing-dot:nth-child(2) {
    animation-delay: -0.16s;
}

.typing-dot:nth-child(3) {
    animation-delay: 0s;
}

@keyframes typing-bounce {
    0%,
    80%,
    100% {
        transform: scale(0.6) translateY(0);
        opacity: 0.4;
    }

    40% {
        transform: scale(1.1) translateY(-4px);
        opacity: 1;
    }
}

.scroll-to-bottom-button {
    position: absolute;
    bottom: 140px;
    left: 50%;
    transform: translateX(-50%);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--card);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 20;
    transition: all 0.2s ease;
    color: var(--foreground);

    &:hover {
        background: var(--primary);
        color: var(--primary-foreground);
        transform: translateX(-50%) translateY(-2px);
        box-shadow: var(--shadow-md);
    }

    &:active {
        transform: translateX(-50%) translateY(0);
    }
}

.input-wrapper {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    width: 85%;
    max-width: 900px;
    margin: 0 auto;
    padding: 0 20px;
    z-index: 10;
    box-sizing: border-box;
}

.message-input {
    width: 100%;
    min-height: 80px;
    max-height: 150px;
    padding: 12px 50px 12px 14px;
    border: 1px solid var(--border);
    background-color: var(--card);
    color: var(--foreground);
    font-family: var(--font-sans);
    box-shadow: var(--shadow-xs);
    transition: all 0.2s ease;
    box-sizing: border-box;
    font-size: 14px;
    line-height: 1.5;
    resize: none;
    outline: none;
    border-radius: 8px;

    &::placeholder {
        color: var(--muted-foreground);
    }

    &:focus:not(:disabled):not(:read-only) {
        box-shadow: var(--shadow-sm);
        border-color: var(--primary);
        outline: 2px solid var(--primary);
        outline-offset: 0;
    }
}

.send-button {
    position: absolute;
    bottom: 16px;
    right: 32px;
    height: 32px;
    width: 32px;
    min-width: 32px;
    padding: 0;
    background-color: var(--primary) !important;
    color: var(--primary-foreground) !important;
    border-color: var(--primary) !important;
    border-radius: 6px;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
        background-color: var(--primary) !important;
        filter: brightness(0.95);
        transform: scale(1.05);
    }

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
        transform: none;
    }
}
</style>
