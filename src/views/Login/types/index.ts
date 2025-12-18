/**
 * 登录页面相关类型定义
 */

/**
 * 登录表单数据
 */
export interface LoginFormData {
    /** 用户名或邮箱 */
    username: string
    /** 密码 */
    password: string
    /** 是否记住我 */
    rememberMe: boolean
}

/**
 * 表单验证错误信息
 */
export interface LoginFormErrors {
    /** 用户名/邮箱错误信息 */
    username: string
    /** 密码错误信息 */
    password: string
}

/**
 * 登录表单提交的载荷
 */
export interface LoginPayload {
    /** 用户名或邮箱 */
    username: string
    /** 密码 */
    password: string
    /** 是否记住我 */
    rememberMe: boolean
}

