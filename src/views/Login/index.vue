<template>
    <div class="login-page">
        <!-- 背景装饰组件 -->
        <LoginBackground />

        <!-- 登录表单容器 -->
        <div class="login-container">
            <ui-card class="login-card">
                <!-- 标题区域 -->
                <header class="login-header">
                    <h1 class="login-title">欢迎登录</h1>
                    <p class="login-subtitle">请输入您的账号信息</p>
                </header>

                <!-- 表单区域 -->
                <form class="login-form" @submit.prevent="handleSubmit">
                    <!-- 用户名/邮箱输入框 -->
                    <div class="form-group">
                        <label class="form-label" for="username">用户名或邮箱</label>
                        <ui-input
                            id="username"
                            name="username"
                            v-model="formData.username"
                            type="text"
                            size="large"
                            placeholder="请输入用户名或邮箱"
                            autocomplete="username"
                            :disabled="isLoading"
                            :error="errors.username"
                            clearable
                            @blur="handleUsernameBlur"
                            @enter="handleSubmit"
                        />
                    </div>

                    <!-- 密码输入框组件 -->
                    <PasswordInput
                        v-model="formData.password"
                        :error="errors.password"
                        placeholder="请输入密码"
                        :disabled="isLoading"
                        @blur="handlePasswordBlur"
                        @enter="handleSubmit"
                    />

                    <!-- 记住我选项 -->
                    <div class="form-options">
                        <label class="checkbox-label">
                            <input v-model="formData.rememberMe" type="checkbox" class="checkbox-input" :disabled="isLoading" />
                            <span>记住我</span>
                        </label>
                    </div>

                    <!-- 提交按钮 -->
                    <ui-button type="submit" variant="primary" size="large" class="login-button" :disabled="isLoading">
                        {{ isLoading ? '登录中...' : '登录' }}
                    </ui-button>
                </form>

                <!-- 底部链接区域 -->
                <footer class="login-footer">
                    <a href="#" class="footer-link" @click.prevent="handleForgotPassword">忘记密码？</a>
                </footer>
            </ui-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useLoginForm } from './composables/useLoginForm'
import { useLoginValidation } from './composables/useLoginValidation'
import PasswordInput from './components/PasswordInput.vue'
import LoginBackground from './components/LoginBackground.vue'
import UiCard from '@/components/ui/ui-card.vue'
import UiButton from '@/components/ui/ui-button.vue'
import UiInput from '@/components/ui/ui-input.vue'

/**
 * 登录页面组件
 *
 * 架构说明：
 * - 使用 Composition API 组织逻辑
 * - 通过 composables 抽离业务逻辑，保持组件简洁
 * - 使用子组件处理复杂的 UI 部分（密码输入、背景装饰）
 * - 类型定义统一放在 types 目录
 *
 * 功能特性：
 * - 用户名/邮箱和密码登录
 * - 实时表单验证
 * - 密码显示/隐藏切换
 * - 记住我选项
 * - 加载状态管理
 * - 响应式设计（适配移动端和桌面端）
 *
 * TODO:
 * - 接入实际的登录 API
 * - 实现忘记密码功能
 * - 添加 Toast 提示组件
 */

// 使用登录表单 composable（管理表单状态、提交逻辑）
const { formData, errors, isLoading, handleSubmit } = useLoginForm()

// 使用表单验证 composable（提供验证方法）
const { validateUsername, validatePassword } = useLoginValidation()

/**
 * 处理用户名失焦事件（触发验证）
 */
const handleUsernameBlur = () => {
    errors.username = validateUsername(formData.username)
}

/**
 * 处理密码失焦事件（触发验证）
 */
const handlePasswordBlur = () => {
    errors.password = validatePassword(formData.password)
}

/**
 * 处理忘记密码
 * TODO: 实现忘记密码功能（跳转到忘记密码页面或显示对话框）
 */
const handleForgotPassword = () => {
    console.log('忘记密码功能待实现')
    // 示例：可以跳转到忘记密码页面
    // router.push(ROUTE_PATHS.FORGOT_PASSWORD)
}
</script>

<style scoped lang="less">
/**
 * 登录页面样式
 * 
 * 设计原则：
 * - 使用 CSS 变量保持主题一致性
 * - 响应式设计，适配各种屏幕尺寸
 * - 合理的动画和过渡效果
 */

.login-page {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    padding: 24px;
    overflow: auto;
    box-sizing: border-box;
    // 增强渐变背景
    background: linear-gradient(
        135deg,
        var(--background) 0%,
        rgba(226, 169, 25, 0.05) 25%,
        rgba(132, 160, 223, 0.08) 50%,
        rgba(226, 169, 25, 0.05) 75%,
        var(--background) 100%
    );
    background-size: 400% 400%;
    animation: gradient-shift 20s ease infinite;
    position: relative;
    isolation: isolate;

    // 添加额外的背景层增加深度
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background:
            radial-gradient(ellipse at top right, rgba(226, 169, 25, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at bottom left, rgba(132, 160, 223, 0.12) 0%, transparent 50%);
        pointer-events: none;
        z-index: 0;
    }
}

// 渐变移动动画
@keyframes gradient-shift {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

// 登录容器
.login-container {
    width: 100%;
    max-width: 420px;
    position: relative;
    z-index: 1;
}

// 登录卡片
.login-card {
    padding: 48px 40px;
    box-shadow: var(--shadow-md);
    background-color: var(--card);
}

// 标题区域
.login-header {
    text-align: center;
    margin-bottom: 36px;
}

.login-title {
    font-size: 32px;
    font-weight: 600;
    color: var(--foreground);
    margin: 0 0 10px 0;
    line-height: 1.2;
    letter-spacing: -0.02em;
}

.login-subtitle {
    font-size: 14px;
    color: var(--muted-foreground);
    margin: 0;
    line-height: 1.5;
}

// 表单区域
.login-form {
    margin-bottom: 28px;
}

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

// 表单选项
.form-options {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 28px;
}

.checkbox-label {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 13px;
    color: var(--foreground);
    user-select: none;

    span {
        margin-left: 8px;
        line-height: 1.4;
    }
}

.checkbox-input {
    width: 16px;
    height: 16px;
    cursor: pointer;
    accent-color: var(--primary);
    flex-shrink: 0;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }
}

// 登录按钮
.login-button {
    width: 100%;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.01em;
}

// 底部链接区域
.login-footer {
    text-align: center;
    padding-top: 24px;
    border-top: 1px solid var(--border);
}

.footer-link {
    font-size: 13px;
    color: var(--primary);
    text-decoration: none;
    transition: color 0.15s ease;
    display: inline-block;
    padding: 4px 8px;
    margin: -4px -8px;

    &:hover {
        color: var(--secondary);
        text-decoration: underline;
    }

    &:active {
        color: var(--secondary);
        opacity: 0.8;
    }
}

// 响应式设计：移动端适配
@media (max-width: 640px) {
    .login-page {
        padding: 20px 16px;
    }

    .login-container {
        max-width: 100%;
    }

    .login-card {
        padding: 32px 24px;
    }

    .login-title {
        font-size: 28px;
    }

    .login-header {
        margin-bottom: 32px;
    }
}
</style>
