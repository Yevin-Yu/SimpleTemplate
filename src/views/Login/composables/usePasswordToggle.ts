import { ref } from 'vue'

/**
 * 密码显示/隐藏切换逻辑
 *
 * @returns 密码切换相关的状态和方法
 */
export function usePasswordToggle() {
    /** 密码是否可见 */
    const isPasswordVisible = ref(false)

    /**
     * 切换密码可见性
     */
    const togglePasswordVisibility = () => {
        isPasswordVisible.value = !isPasswordVisible.value
    }

    /**
     * 隐藏密码（重置）
     */
    const hidePassword = () => {
        isPasswordVisible.value = false
    }

    return {
        isPasswordVisible,
        togglePasswordVisibility,
        hidePassword,
    }
}

