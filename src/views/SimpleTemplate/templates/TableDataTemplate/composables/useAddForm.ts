import { reactive } from 'vue'
import type { UserRole, UserStatus } from '../types'
import { EMAIL_REGEX } from '../constants'

export interface AddFormData {
    name: string
    email: string
    role: UserRole | null
    status: UserStatus | null
}

export interface AddFormErrors {
    name: string
    email: string
}

/**
 * 新增表单逻辑
 */
export function useAddForm() {
    const form = reactive<AddFormData>({
        name: '',
        email: '',
        role: null,
        status: null,
    })

    const errors = reactive<AddFormErrors>({
        name: '',
        email: '',
    })

    const validate = (): boolean => {
        errors.name = ''
        errors.email = ''

        if (!form.name.trim()) {
            errors.name = '请输入姓名'
            return false
        }

        if (!form.email.trim()) {
            errors.email = '请输入邮箱'
            return false
        }

        if (!EMAIL_REGEX.test(form.email)) {
            errors.email = '请输入有效的邮箱地址'
            return false
        }

        if (!form.role || !form.status) {
            return false
        }

        return true
    }

    const reset = () => {
        form.name = ''
        form.email = ''
        form.role = null
        form.status = null
        errors.name = ''
        errors.email = ''
    }

    return {
        form,
        errors,
        validate,
        reset,
    }
}
