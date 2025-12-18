import { reactive, computed, ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { LoginFormData, LoginFormErrors, LoginPayload } from '../types'
import { useLoginValidation } from './useLoginValidation'
import { ROUTE_PATHS } from '@/router/paths'
import { STORAGE_KEYS } from '@/shared/storageKeys'
import { safeGetItem, safeSetItem, safeRemoveItem } from '@/shared/storage'

/**
 * 登录表单逻辑 Composable
 */
export function useLoginForm() {
    const router = useRouter()
    const { validateForm, isFormValid: checkFormValid, resetErrors, VALIDATION_RULES } = useLoginValidation()

    const formData = reactive<LoginFormData>({
        username: '',
        password: '',
        rememberMe: false,
    })

    const errors = reactive<LoginFormErrors>({
        username: '',
        password: '',
    })

    const isLoading = ref(false)
    const isValid = computed(() => checkFormValid(formData))

    const loginApi = async (payload: LoginPayload): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log('登录请求:', payload)
        // TODO: 替换为实际的 API 调用
    }

    const saveRememberedUsername = (username: string) => {
        safeSetItem(STORAGE_KEYS.REMEMBERED_USERNAME, username.trim())
    }

    const clearRememberedUsername = () => {
        safeRemoveItem(STORAGE_KEYS.REMEMBERED_USERNAME)
    }

    const loadRememberedUsername = (): string => {
        return safeGetItem(STORAGE_KEYS.REMEMBERED_USERNAME) ?? ''
    }

    const handleSubmit = async (): Promise<void> => {
        const validationErrors = validateForm(formData)
        if (validationErrors.username || validationErrors.password) {
            Object.assign(errors, validationErrors)
            return
        }

        Object.assign(errors, resetErrors())
        isLoading.value = true

        try {
            await loginApi({
                username: formData.username.trim(),
                password: formData.password,
                rememberMe: formData.rememberMe,
            })

            if (formData.rememberMe) {
                saveRememberedUsername(formData.username)
            } else {
                clearRememberedUsername()
            }

            router.push(ROUTE_PATHS.SIMPLE_TEMPLATE_HOME)
        } catch (error) {
            console.error('登录失败:', error)
            errors.password = VALIDATION_RULES.invalidCredentials
        } finally {
            isLoading.value = false
        }
    }

    const resetForm = () => {
        formData.username = ''
        formData.password = ''
        formData.rememberMe = false
        Object.assign(errors, resetErrors())
    }

    onMounted(() => {
        const rememberedUsername = loadRememberedUsername()
        if (rememberedUsername) {
            formData.username = rememberedUsername
            formData.rememberMe = true
        }
    })

    watch(
        () => formData.rememberMe,
        isRemembered => {
            if (!isRemembered) {
                clearRememberedUsername()
            }
        }
    )

    return {
        formData,
        errors,
        isLoading,
        isValid,
        handleSubmit,
        resetForm,
    }
}
