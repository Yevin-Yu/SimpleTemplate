import { reactive, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { LoginFormData, LoginFormErrors, LoginPayload } from '../types'
import { useLoginValidation } from './useLoginValidation'
import { ROUTE_PATHS } from '@/router/paths'

/**
 * 登录表单逻辑 Composable
 *
 * 职责：
 * - 管理表单数据和状态
 * - 处理表单提交
 * - 管理加载和错误状态
 *
 * @returns 登录表单相关的状态和方法
 */
export function useLoginForm() {
    const router = useRouter()
    const { validateForm, isFormValid: checkFormValid, resetErrors, VALIDATION_RULES } = useLoginValidation()

    /** 表单数据 */
    const formData = reactive<LoginFormData>({
        username: '',
        password: '',
        rememberMe: false,
    })

    /** 表单验证错误信息 */
    const errors = reactive<LoginFormErrors>({
        username: '',
        password: '',
    })

    /** 加载状态 */
    const isLoading = ref(false)

    /**
     * 计算属性：表单是否有效（用于按钮禁用状态）
     */
    const isValid = computed(() => checkFormValid(formData))

    /**
     * 模拟登录 API 调用
     * TODO: 替换为实际的 API 调用
     *
     * @param payload 登录载荷
     * @returns Promise<void>
     */
    const loginApi = async (payload: LoginPayload): Promise<void> => {
        // 模拟 API 请求延迟
        await new Promise(resolve => setTimeout(resolve, 1000))

        // 模拟登录逻辑（实际应该调用真实 API）
        console.log('登录请求:', payload)

        // 这里可以添加实际的 API 调用
        // const response = await fetch('/api/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(payload),
        // })
        // if (!response.ok) throw new Error('登录失败')
    }

    /**
     * 处理表单提交
     *
     * @returns Promise<void>
     */
    const handleSubmit = async (): Promise<void> => {
        // 验证表单
        const validationErrors = validateForm(formData)

        // 如果有验证错误，更新错误状态并终止提交
        if (validationErrors.username || validationErrors.password) {
            Object.assign(errors, validationErrors)
            return
        }

        // 重置错误信息
        Object.assign(errors, resetErrors())

        // 设置加载状态
        isLoading.value = true

        try {
            // 调用登录 API
            await loginApi({
                username: formData.username.trim(),
                password: formData.password,
                rememberMe: formData.rememberMe,
            })

            // 登录成功：跳转到首页
            router.push(ROUTE_PATHS.SIMPLE_TEMPLATE_HOME)
        } catch (error) {
            // 处理登录失败
            console.error('登录失败:', error)
            errors.password = VALIDATION_RULES.invalidCredentials
        } finally {
            // 重置加载状态
            isLoading.value = false
        }
    }

    /**
     * 重置表单
     */
    const resetForm = () => {
        formData.username = ''
        formData.password = ''
        formData.rememberMe = false
        Object.assign(errors, resetErrors())
    }

    return {
        // 状态
        formData,
        errors,
        isLoading,
        isValid,
        // 方法
        handleSubmit,
        resetForm,
    }
}

