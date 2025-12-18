import type { LoginFormData, LoginFormErrors } from '../types'

/**
 * 邮箱正则表达式
 * 匹配标准邮箱格式：user@example.com
 */
const EMAIL_REGEX = /^[\w\.-]+@[\w\.-]+\.\w+$/

/**
 * 用户名最小长度
 */
const MIN_USERNAME_LENGTH = 3

/**
 * 密码最小长度
 */
const MIN_PASSWORD_LENGTH = 6

/**
 * 表单验证规则和错误消息
 */
const VALIDATION_RULES = {
    username: {
        required: '请输入用户名或邮箱',
        minLength: `用户名至少需要${MIN_USERNAME_LENGTH}个字符`,
    },
    password: {
        required: '请输入密码',
        minLength: `密码至少需要${MIN_PASSWORD_LENGTH}个字符`,
    },
    invalidCredentials: '用户名或密码错误',
} as const

/**
 * 登录表单验证逻辑
 *
 * @param formData 表单数据
 * @returns 验证后的错误信息对象
 */
export function useLoginValidation() {
    /**
     * 验证用户名/邮箱
     *
     * @param username 用户名或邮箱
     * @returns 错误信息，空字符串表示验证通过
     */
    const validateUsername = (username: string): string => {
        const trimmed = username.trim()

        // 必填验证
        if (!trimmed) {
            return VALIDATION_RULES.username.required
        }

        // 如果不是邮箱格式，检查最小长度
        if (!EMAIL_REGEX.test(trimmed) && trimmed.length < MIN_USERNAME_LENGTH) {
            return VALIDATION_RULES.username.minLength
        }

        return ''
    }

    /**
     * 验证密码
     *
     * @param password 密码
     * @returns 错误信息，空字符串表示验证通过
     */
    const validatePassword = (password: string): string => {
        // 必填验证
        if (!password) {
            return VALIDATION_RULES.password.required
        }

        // 最小长度验证
        if (password.length < MIN_PASSWORD_LENGTH) {
            return VALIDATION_RULES.password.minLength
        }

        return ''
    }

    /**
     * 验证整个表单
     *
     * @param formData 表单数据
     * @returns 错误信息对象
     */
    const validateForm = (formData: LoginFormData): LoginFormErrors => {
        return {
            username: validateUsername(formData.username),
            password: validatePassword(formData.password),
        }
    }

    /**
     * 检查表单是否有效（所有字段都有值）
     *
     * @param formData 表单数据
     * @returns 是否有效
     */
    const isFormValid = (formData: LoginFormData): boolean => {
        return formData.username.trim().length > 0 && formData.password.length > 0
    }

    /**
     * 重置错误信息
     *
     * @returns 空的错误信息对象
     */
    const resetErrors = (): LoginFormErrors => {
        return {
            username: '',
            password: '',
        }
    }

    return {
        validateForm,
        validateUsername,
        validatePassword,
        isFormValid,
        resetErrors,
        VALIDATION_RULES,
    }
}
