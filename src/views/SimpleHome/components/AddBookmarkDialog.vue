<template>
    <div v-if="visible" class="dialog-overlay" @click="$emit('close')">
        <div class="dialog" @click.stop>
            <h3 class="dialog-title">添加书签</h3>
            <div class="dialog-content">
                <div class="form-group">
                    <label>标题</label>
                    <input v-model="formData.title" type="text" placeholder="输入书签标题" />
                </div>
                <div class="form-group">
                    <label>网址</label>
                    <input v-model="formData.url" type="text" placeholder="https://example.com" />
                </div>
            </div>
            <div class="dialog-actions">
                <ui-button @click="$emit('close')">取消</ui-button>
                <ui-button variant="primary" @click="handleSubmit">添加</ui-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import uiButton from '@/components/ui/ui-button.vue'

interface Props {
    visible: boolean
}

interface Emits {
    (e: 'close'): void
    (e: 'submit', data: { title: string; url: string }): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const formData = ref({ title: '', url: '' })

watch(
    () => props.visible,
    newVal => {
        if (!newVal) {
            formData.value = { title: '', url: '' }
        }
    }
)

const handleSubmit = () => {
    if (!formData.value.title || !formData.value.url) return
    emit('submit', { ...formData.value })
    emit('close')
}
</script>

<style scoped lang="less">
.dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.dialog {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    box-shadow: var(--shadow-xl);
    width: 90%;
    max-width: 400px;
    padding: 24px;
}

.dialog-title {
    font-size: 20px;
    font-weight: 600;
    color: var(--foreground);
    margin-bottom: 20px;
}

.dialog-content {
    margin-bottom: 24px;
}

.form-group {
    margin-bottom: 16px;

    label {
        display: block;
        font-size: 14px;
        font-weight: 500;
        color: var(--foreground);
        margin-bottom: 8px;
    }

    input {
        width: 100%;
        padding: 10px 12px;
        border: 1px solid var(--border);
        border-radius: 6px;
        background: var(--card);
        color: var(--foreground);
        font-size: 14px;
        font-family: var(--font-sans);
        transition: all 0.2s ease;

        &:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(226, 169, 25, 0.1);
        }
    }
}

.dialog-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
}
</style>
