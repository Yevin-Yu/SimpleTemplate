<template>
    <ui-dialog v-model="dialogVisible" :title="dialogTitle" size="small" @close="handleClose">
        <div class="bookmark-form">
            <div class="form-item">
                <label>标题</label>
                <ui-input v-model="formData.title" placeholder="请输入标题" />
            </div>
            <div class="form-item">
                <label>URL</label>
                <ui-input v-model="formData.url" placeholder="https://example.com" />
            </div>
            <div class="form-item">
                <label>图标</label>
                <ui-input v-model="formData.icon" placeholder="单个字符或字母" :maxlength="1" />
            </div>
            <div class="form-item">
                <label>颜色</label>
                <div class="color-input-wrapper">
                    <input v-model="formData.color" type="color" class="color-input" />
                    <ui-input v-model="formData.color" placeholder="#000000" />
                </div>
            </div>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <ui-button variant="default" @click="handleClose">取消</ui-button>
                <ui-button @click="handleSave">保存</ui-button>
            </div>
        </template>
    </ui-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import UiDialog from '@/components/ui/ui-dialog.vue'
import UiInput from '@/components/ui/ui-input.vue'
import UiButton from '@/components/ui/ui-button.vue'
import { normalizeUrl } from '../utils/url'
import type { CategoryLink, CategoryKey } from '../types'

const DEFAULT_FORM_DATA: Omit<CategoryLink, 'id'> = {
    title: '',
    url: '',
    icon: '',
    color: '#000000',
}

interface Props {
    modelValue: boolean
    link?: CategoryLink | null
    category: CategoryKey
}

const props = defineProps<Props>()

const emit = defineEmits<{
    'update:modelValue': [value: boolean]
    save: [link: CategoryLink]
}>()

const dialogVisible = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
})

const dialogTitle = computed(() => (props.link ? '编辑书签' : '新增书签'))

const formData = ref<CategoryLink>({
    id: Date.now().toString(),
    ...DEFAULT_FORM_DATA,
})

function resetForm() {
    formData.value = {
        id: Date.now().toString(),
        ...DEFAULT_FORM_DATA,
    }
}

watch(
    () => props.modelValue,
    isOpen => {
        if (isOpen) {
            formData.value = props.link ? { ...props.link } : { id: Date.now().toString(), ...DEFAULT_FORM_DATA }
        }
    },
    { immediate: true }
)

function handleClose() {
    dialogVisible.value = false
    resetForm()
}

function handleSave() {
    const { title, url, icon } = formData.value
    if (!title.trim() || !url.trim()) return

    emit('save', {
        ...formData.value,
        url: normalizeUrl(url.trim()),
        icon: icon || title[0]?.toUpperCase() || '?',
    })
    handleClose()
}
</script>

<style scoped lang="less">
.bookmark-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 8px 0;
}

.form-item {
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
        font-size: 14px;
        font-weight: 500;
        color: var(--foreground);
    }
}

.color-input-wrapper {
    display: flex;
    gap: 8px;
    align-items: center;

    .color-input {
        width: 50px;
        height: 36px;
        border: 1px solid var(--border);
        border-radius: 0;
        cursor: pointer;
        background: transparent;
    }
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
}
</style>
