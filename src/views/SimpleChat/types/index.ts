export interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: number
}

export interface Conversation {
    id: string
    title: string
    messages: Message[]
    updatedAt: number
    createdAt: number
}

