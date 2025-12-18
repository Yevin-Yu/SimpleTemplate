<template>
    <div class="form-group">
        <label class="form-label" for="password">密码</label>
        <ui-input
            id="password"
            name="password"
            v-model="inputValue"
            :type="isPasswordVisible ? 'text' : 'password'"
            size="large"
            :placeholder="placeholder"
            autocomplete="current-password"
            :disabled="disabled"
            :error="error"
            @blur="handleBlur"
            @enter="handleEnter"
        >
            <template #suffix>
                <button
                    type="button"
                    class="password-toggle"
                    :class="{ 'is-visible': isPasswordVisible }"
                    :disabled="disabled"
                    :aria-label="isPasswordVisible ? '隐藏密码' : '显示密码'"
                    @click.stop="togglePasswordVisibility"
                >
                    <!-- 密码可见图标 -->
                    <EyeOffIcon v-if="isPasswordVisible" :size="20" />
                    <!-- 密码隐藏图标 -->
                    <EyeIcon v-else :size="20" />
                </button>
            </template>
        </ui-input>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import UiInput from '@/components/ui/ui-input.vue'
import { EyeIcon, EyeOffIcon } from '@/components/icons'

/**
 * 密码输入框组件
 *
 * 基于 ui-input 组件，通过 suffix slot 添加密码显示/隐藏切换功能
 *
 * Props:
 * - modelValue: 输入框的值（v-model）
 * - error: 错误信息
 * - placeholder: 占位符文本
 * - disabled: 是否禁用
 *
 * Events:
 * - update:modelValue: 值更新事件
 * - blur: 失焦事件
 */

interface Props {
    /** 输入框的值 */
    modelValue: string
    /** 错误信息 */
    error?: string
    /** 占位符文本 */
    placeholder?: string
    /** 是否禁用 */
    disabled?: boolean
}

interface Emits {
    (e: 'update:modelValue', value: string): void
    (e: 'blur'): void
    (e: 'enter', event: KeyboardEvent): void
}

const props = withDefaults(defineProps<Props>(), {
    error: '',
    placeholder: '请输入密码',
    disabled: false,
})

const emit = defineEmits<Emits>()

/** 密码是否可见 */
const isPasswordVisible = ref(false)

/** 双向绑定的输入值 */
const inputValue = computed({
    get: () => props.modelValue,
    set: (value: string) => emit('update:modelValue', value),
})

/**
 * 切换密码可见性
 */
const togglePasswordVisibility = () => {
    if (props.disabled) return
    isPasswordVisible.value = !isPasswordVisible.value
}

/**
 * 处理失焦事件
 */
const handleBlur = () => {
    emit('blur')
}

/**
 * 处理 Enter 键事件（传递给父组件）
 */
const handleEnter = (event: KeyboardEvent) => {
    emit('enter', event)
}
</script>

<style scoped lang="less">
/**
 * 密码输入框组件样式
 * 基于 ui-input 组件，添加密码切换按钮样式
 */

.form-group {
    margin-bottom: 22px;
}

.form-label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: var(--foreground);
    margin-bottom: 10px;
    line-height: 1.4;
    letter-spacing: 0.01em;
}

.password-toggle {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--muted-foreground);
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease;
    border-radius: 4px;
    outline: none;
    margin: 0;
    line-height: 1;

    &:hover:not(:disabled) {
        color: var(--foreground);
        background-color: var(--muted);
    }

    &:active:not(:disabled) {
        background-color: var(--accent);
    }

    &:focus-visible {
        outline: 2px solid var(--primary);
        outline-offset: 2px;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }

    &.is-visible {
        color: var(--primary);
    }

    svg {
        display: block;
        flex-shrink: 0;
    }
}
</style>
