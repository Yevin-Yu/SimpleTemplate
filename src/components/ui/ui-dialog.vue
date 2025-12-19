<template>
    <Teleport to="body">
        <Transition name="dialog">
            <div v-if="modelValue" class="ui-dialog-overlay" @click.self="handleOverlayClick" @keydown.esc="handleEsc">
                <div
                    ref="dialogRef"
                    class="ui-dialog"
                    :class="[`ui-dialog-size-${size}`]"
                    role="dialog"
                    :aria-labelledby="titleId"
                    :aria-modal="true"
                >
                    <!-- Header -->
                    <div v-if="$slots.title || title" class="ui-dialog-header">
                        <h2 :id="titleId" class="ui-dialog-title">
                            <slot name="title">{{ title }}</slot>
                        </h2>
                        <ui-button
                            v-if="closable"
                            variant="blank"
                            size="small"
                            class="ui-dialog-close"
                            :aria-label="closeAriaLabel"
                            @click="handleClose"
                        >
                            <template #icon>
                                <XIcon :size="16" />
                            </template>
                        </ui-button>
                    </div>

                    <!-- Content -->
                    <div class="ui-dialog-content">
                        <slot />
                    </div>

                    <!-- Footer -->
                    <div v-if="$slots.footer" class="ui-dialog-footer">
                        <slot name="footer" />
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
/**
 * Dialog（弹窗组件）
 *
 * Props: modelValue, title, size, closable, closeOnClickOverlay, closeAriaLabel
 * Slots: default, title, footer
 * Emits: update:modelValue, close
 */

import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { XIcon } from '@/components/icons'
import uiButton from '@/components/ui/ui-button.vue'

export type UiDialogSize = 'small' | 'medium' | 'large'

interface Props {
    modelValue?: boolean
    title?: string
    size?: UiDialogSize
    closable?: boolean
    closeOnClickOverlay?: boolean
    closeAriaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: false,
    size: 'medium',
    closable: true,
    closeOnClickOverlay: true,
    closeAriaLabel: '关闭',
})

const emit = defineEmits<{
    'update:modelValue': [value: boolean]
    close: []
}>()

const dialogRef = ref<HTMLElement>()
const titleId = computed(() => {
    const id = `ui-dialog-title-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`
    return id
})

const handleClose = () => {
    emit('update:modelValue', false)
    emit('close')
}

const handleOverlayClick = () => {
    if (props.closeOnClickOverlay) {
        handleClose()
    }
}

const handleEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && props.modelValue) {
        handleClose()
    }
}

const lockBodyScroll = () => {
    document.body.style.overflow = 'hidden'
}

const unlockBodyScroll = () => {
    document.body.style.overflow = ''
}

watch(
    () => props.modelValue,
    newValue => {
        if (newValue) {
            lockBodyScroll()
            nextTick(() => {
                dialogRef.value?.focus()
            })
        } else {
            unlockBodyScroll()
        }
    },
    { immediate: true }
)

onMounted(() => {
    if (props.modelValue) {
        lockBodyScroll()
    }
})

onUnmounted(() => {
    unlockBodyScroll()
})
</script>

<style scoped lang="less">
.ui-dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
    overflow-y: auto;
}

.ui-dialog {
    position: relative;
    width: 100%;
    max-width: 100%;
    background-color: var(--card);
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 40px);
    outline: none;
}

.ui-dialog-size-small {
    max-width: 400px;
}

.ui-dialog-size-medium {
    max-width: 600px;
}

.ui-dialog-size-large {
    max-width: 900px;
}

.ui-dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
}

.ui-dialog-title {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: var(--foreground);
    line-height: 1.2;
}

.ui-dialog-close {
    margin-left: 10px;
    flex-shrink: 0;
}

.ui-dialog-content {
    padding: 24px;
    flex: 1;
    min-height: 0;
}

.ui-dialog-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
    padding: 12px 20px;
    border-top: 1px solid var(--border);
    flex-shrink: 0;
}

/* 弹窗动画 */
.dialog-enter-active {
    transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.dialog-leave-active {
    transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.dialog-enter-active .ui-dialog {
    animation: dialog-enter 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.dialog-leave-active .ui-dialog {
    animation: dialog-leave 0.2s cubic-bezier(0.4, 0, 1, 1);
}

.dialog-enter-from {
    opacity: 0;
}

.dialog-leave-to {
    opacity: 0;
}

@keyframes dialog-enter {
    from {
        transform: scale(0.96) translateY(-8px);
        opacity: 0;
    }
    to {
        transform: scale(1) translateY(0);
        opacity: 1;
    }
}

@keyframes dialog-leave {
    from {
        transform: scale(1) translateY(0);
        opacity: 1;
    }
    to {
        transform: scale(0.96) translateY(-8px);
        opacity: 0;
    }
}
</style>
