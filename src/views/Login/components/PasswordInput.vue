<template>
    <div class="form-group">
        <label class="form-label" for="password">密码</label>
        <div class="password-wrapper">
            <input
                id="password"
                :value="modelValue"
                :type="isPasswordVisible ? 'text' : 'password'"
                class="form-input"
                :class="{ 'has-error': error }"
                :placeholder="placeholder"
                autocomplete="current-password"
                :disabled="disabled"
                @input="handleInput"
                @blur="handleBlur"
            />
            <button
                type="button"
                class="password-toggle"
                :class="{ 'is-visible': isPasswordVisible }"
                :disabled="disabled"
                :aria-label="isPasswordVisible ? '隐藏密码' : '显示密码'"
                @click="togglePasswordVisibility"
            >
                <!-- 密码可见图标 -->
                <svg
                    v-if="isPasswordVisible"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                >
                    <path
                        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                    />
                    <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
                <!-- 密码隐藏图标 -->
                <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            </button>
        </div>
        <span v-if="error" class="password-input-error">{{ error }}</span>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

/**
 * 密码输入框组件
 *
 * Props:
 * - modelValue: 输入框的值（v-model）
 * - error: 错误信息
 * - placeholder: 占位符文本
 * - disabled: 是否禁用
 *
 * Events:
 * - update:modelValue: 值更新事件
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
}

withDefaults(defineProps<Props>(), {
    error: '',
    placeholder: '请输入密码',
    disabled: false,
})

const emit = defineEmits<Emits>()

/** 密码是否可见 */
const isPasswordVisible = ref(false)

/**
 * 切换密码可见性
 */
const togglePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value
}

/**
 * 处理输入事件
 */
const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
}

/**
 * 处理失焦事件
 */
const handleBlur = () => {
    emit('blur')
}
</script>

<style scoped lang="less">
// 密码输入框组件的样式
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

.password-wrapper {
    position: relative;
}

.form-input {
    width: 100%;
    height: 44px;
    padding: 0 44px 0 14px;
    border: 1px solid var(--border);
    background: var(--card);
    color: var(--foreground);
    font-size: 14px;
    font-family: var(--font-sans);
    transition: all 0.15s ease;
    box-sizing: border-box;
    box-shadow: var(--shadow-xs);

    &.has-error {
        border-color: var(--destructive);
    }

    &::placeholder {
        color: var(--muted-foreground);
    }

    &:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: var(--shadow-xs), 0 0 0 2px rgba(226, 169, 25, 0.15);
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.65;
        background-color: var(--muted);
    }
}

.password-toggle {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: var(--muted-foreground);
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease;
    border-radius: 0;

    &:hover:not(:disabled) {
        color: var(--foreground);
        background-color: var(--muted);
    }

    &:active:not(:disabled) {
        background-color: var(--accent);
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }

    &.is-visible {
        color: var(--primary);
    }
}

.password-input-error {
    display: block;
    font-size: 12px;
    color: var(--destructive);
    margin-top: 8px;
    line-height: 1.4;
    min-height: 16px;
}
</style>

