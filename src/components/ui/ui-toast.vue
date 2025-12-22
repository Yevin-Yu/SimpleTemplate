<template>
    <Transition name="toast">
        <div v-if="visible" :class="['ui-toast', `ui-toast--${type}`]" @click="handleClose">
            <div class="ui-toast__icon">
                <CheckIcon v-if="type === 'success'" :size="20" />
                <XIcon v-else-if="type === 'error'" :size="20" />
                <WarningIcon v-else-if="type === 'warning'" :size="20" />
                <InfoIcon v-else :size="20" />
            </div>
            <div class="ui-toast__content">
                <div class="ui-toast__message">{{ message }}</div>
            </div>
            <button class="ui-toast__close" @click.stop="handleClose" aria-label="关闭">
                <XIcon :size="16" />
            </button>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CheckIcon, XIcon, WarningIcon, InfoIcon } from '@/components/icons'

interface Props {
    message: string
    type?: 'success' | 'error' | 'warning' | 'info'
    duration?: number
}

const props = withDefaults(defineProps<Props>(), {
    type: 'info',
    duration: 3000,
})

const visible = ref(false)
let timer: number | null = null

const handleClose = () => {
    visible.value = false
    if (timer) {
        clearTimeout(timer)
        timer = null
    }
}

onMounted(() => {
    visible.value = true
    if (props.duration > 0) {
        timer = window.setTimeout(() => {
            handleClose()
        }, props.duration)
    }
})
</script>

<style scoped lang="less">
.ui-toast {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 250px;
    max-width: 400px;
    padding: 12px 16px;
    background: var(--card);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-lg);
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        box-shadow: var(--shadow-xl);
        transform: translateY(-1px);
    }

    &--success {
        border-left: 4px solid var(--success, #10b981);
    }

    &--error {
        border-left: 4px solid var(--destructive, #ef4444);
    }

    &--warning {
        border-left: 4px solid var(--warning, #f59e0b);
    }

    &--info {
        border-left: 4px solid var(--primary, #3b82f6);
    }
}

.ui-toast__icon {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    color: var(--muted-foreground);
}

.ui-toast--success .ui-toast__icon {
    color: var(--success, #10b981);
}

.ui-toast--error .ui-toast__icon {
    color: var(--destructive, #ef4444);
}

.ui-toast--warning .ui-toast__icon {
    color: var(--warning, #f59e0b);
}

.ui-toast--info .ui-toast__icon {
    color: var(--primary, #3b82f6);
}

.ui-toast__content {
    flex: 1;
    min-width: 0;
}

.ui-toast__message {
    font-size: 14px;
    line-height: 1.5;
    color: var(--foreground);
    word-break: break-word;
}

.ui-toast__close {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    color: var(--muted-foreground);
    border-radius: 4px;
    transition: all 0.2s ease;

    &:hover {
        color: var(--foreground);
        background: var(--muted);
    }
}

.toast-enter-active,
.toast-leave-active {
    transition: all 0.3s ease;
}

.toast-enter-from {
    opacity: 0;
    transform: translateX(100%);
}

.toast-leave-to {
    opacity: 0;
    transform: translateX(100%);
}
</style>

