<template>
    <div class="form-components-container h-full w-full p-6 overflow-auto">
        <div class="max-w-6xl mx-auto">
            <h1 class="text-3xl font-bold mb-6">表单组件</h1>

            <!-- 基础表单 -->
            <ui-card class="p-6 mb-6">
                <h2 class="text-2xl font-semibold mb-4">基础表单</h2>
                <p class="text-gray-600 mb-6">使用基础组件构建完整的表单。</p>

                <form @submit.prevent="handleSubmit" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block mb-2 text-sm font-medium">用户名</label>
                            <input
                                v-model="formData.username"
                                type="text"
                                placeholder="请输入用户名"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium">邮箱</label>
                            <input
                                v-model="formData.email"
                                type="email"
                                placeholder="请输入邮箱"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium">密码</label>
                            <input
                                v-model="formData.password"
                                type="password"
                                placeholder="请输入密码"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium">确认密码</label>
                            <input
                                v-model="formData.confirmPassword"
                                type="password"
                                placeholder="请再次输入密码"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label class="block mb-2 text-sm font-medium">个人简介</label>
                        <textarea
                            v-model="formData.bio"
                            rows="4"
                            placeholder="请输入个人简介"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                        ></textarea>
                    </div>

                    <div class="flex gap-3">
                        <ui-button variant="primary" @click="handleSubmit">提交</ui-button>
                        <ui-button variant="blank" @click="handleReset">重置</ui-button>
                    </div>
                </form>
            </ui-card>

            <!-- 表单验证 -->
            <ui-card class="p-6 mb-6">
                <h2 class="text-2xl font-semibold mb-4">表单验证</h2>
                <p class="text-gray-600 mb-6">展示表单验证和错误提示。</p>

                <form @submit.prevent="handleValidateSubmit" class="space-y-6">
                    <div>
                        <label class="block mb-2 text-sm font-medium"> 邮箱 <span class="text-red-500">*</span> </label>
                        <input
                            v-model="validateForm.email"
                            type="email"
                            placeholder="请输入邮箱"
                            :class="[
                                'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all',
                                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500',
                            ]"
                            @blur="validateEmail"
                        />
                        <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
                    </div>

                    <div>
                        <label class="block mb-2 text-sm font-medium"> 密码 <span class="text-red-500">*</span> </label>
                        <input
                            v-model="validateForm.password"
                            type="password"
                            placeholder="请输入密码（至少6位）"
                            :class="[
                                'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all',
                                errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500',
                            ]"
                            @blur="validatePassword"
                        />
                        <p v-if="errors.password" class="mt-1 text-sm text-red-500">{{ errors.password }}</p>
                    </div>

                    <div class="flex gap-3">
                        <ui-button variant="primary" @click="handleValidateSubmit">提交验证</ui-button>
                    </div>
                </form>
            </ui-card>

            <!-- 开关表单 -->
            <ui-card class="p-6 mb-6">
                <h2 class="text-2xl font-semibold mb-4">开关表单</h2>
                <p class="text-gray-600 mb-6">使用开关组件构建设置表单。</p>

                <div class="space-y-4">
                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <div class="font-medium">邮件通知</div>
                            <div class="text-sm text-gray-600">接收邮件通知和更新</div>
                        </div>
                        <ui-switch v-model="settings.emailNotification" />
                    </div>

                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <div class="font-medium">短信通知</div>
                            <div class="text-sm text-gray-600">接收重要短信提醒</div>
                        </div>
                        <ui-switch v-model="settings.smsNotification" />
                    </div>

                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <div class="font-medium">自动保存</div>
                            <div class="text-sm text-gray-600">编辑时自动保存内容</div>
                        </div>
                        <ui-switch v-model="settings.autoSave" />
                    </div>

                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <div class="font-medium">公开资料</div>
                            <div class="text-sm text-gray-600">允许他人查看我的资料</div>
                        </div>
                        <ui-switch v-model="settings.publicProfile" />
                    </div>
                </div>

                <div class="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div class="text-sm font-medium mb-2">当前设置：</div>
                    <pre class="text-xs overflow-auto">{{ JSON.stringify(settings, null, 2) }}</pre>
                </div>
            </ui-card>

            <!-- 表单组合示例 -->
            <ui-card class="p-6 mb-6">
                <h2 class="text-2xl font-semibold mb-4">表单组合示例</h2>
                <p class="text-gray-600 mb-6">综合使用各种表单元素的完整示例。</p>

                <form @submit.prevent="handleComplexSubmit" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block mb-2 text-sm font-medium">项目名称</label>
                            <input
                                v-model="complexForm.projectName"
                                type="text"
                                placeholder="请输入项目名称"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label class="block mb-2 text-sm font-medium">项目类型</label>
                            <select
                                v-model="complexForm.projectType"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">请选择</option>
                                <option value="web">Web应用</option>
                                <option value="mobile">移动应用</option>
                                <option value="desktop">桌面应用</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label class="block mb-2 text-sm font-medium">项目描述</label>
                        <textarea
                            v-model="complexForm.description"
                            rows="4"
                            placeholder="请输入项目描述"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        ></textarea>
                    </div>

                    <div>
                        <label class="block mb-3 text-sm font-medium">项目设置</label>
                        <div class="space-y-3">
                            <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                <span>启用版本控制</span>
                                <ui-switch v-model="complexForm.versionControl" />
                            </div>
                            <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                <span>启用CI/CD</span>
                                <ui-switch v-model="complexForm.cicd" />
                            </div>
                            <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                <span>公开项目</span>
                                <ui-switch v-model="complexForm.isPublic" />
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-3">
                        <ui-button variant="primary" @click="handleComplexSubmit">创建项目</ui-button>
                        <ui-button variant="blank" @click="handleComplexReset">取消</ui-button>
                    </div>
                </form>
            </ui-card>

            <!-- 表单数据展示 -->
            <ui-card class="p-6">
                <h2 class="text-2xl font-semibold mb-4">表单数据</h2>
                <div class="space-y-4">
                    <div>
                        <h3 class="text-lg font-medium mb-2">基础表单数据</h3>
                        <pre class="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">{{ JSON.stringify(formData, null, 2) }}</pre>
                    </div>
                    <div>
                        <h3 class="text-lg font-medium mb-2">设置数据</h3>
                        <pre class="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">{{ JSON.stringify(settings, null, 2) }}</pre>
                    </div>
                    <div>
                        <h3 class="text-lg font-medium mb-2">复杂表单数据</h3>
                        <pre class="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">{{ JSON.stringify(complexForm, null, 2) }}</pre>
                    </div>
                </div>
            </ui-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import uiCard from '@/components/ui/ui-card.vue'
import uiButton from '@/components/ui/ui-button.vue'
import uiSwitch from '@/components/ui/ui-switch.vue'

const formData = ref({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: '',
})

const validateForm = ref({
    email: '',
    password: '',
})

const errors = ref<Record<string, string>>({})

const settings = ref({
    emailNotification: true,
    smsNotification: false,
    autoSave: true,
    publicProfile: false,
})

const complexForm = ref({
    projectName: '',
    projectType: '',
    description: '',
    versionControl: true,
    cicd: false,
    isPublic: false,
})

const handleSubmit = () => {
    console.log('表单提交:', formData.value)
    alert('表单提交成功！')
}

const handleReset = () => {
    formData.value = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        bio: '',
    }
}

const validateEmail = () => {
    if (!validateForm.value.email) {
        errors.value.email = '邮箱不能为空'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(validateForm.value.email)) {
        errors.value.email = '请输入有效的邮箱地址'
    } else {
        delete errors.value.email
    }
}

const validatePassword = () => {
    if (!validateForm.value.password) {
        errors.value.password = '密码不能为空'
    } else if (validateForm.value.password.length < 6) {
        errors.value.password = '密码长度至少为6位'
    } else {
        delete errors.value.password
    }
}

const handleValidateSubmit = () => {
    validateEmail()
    validatePassword()
    if (Object.keys(errors.value).length === 0) {
        alert('验证通过！')
    }
}

const handleComplexSubmit = () => {
    console.log('复杂表单提交:', complexForm.value)
    alert('项目创建成功！')
}

const handleComplexReset = () => {
    complexForm.value = {
        projectName: '',
        projectType: '',
        description: '',
        versionControl: true,
        cicd: false,
        isPublic: false,
    }
}
</script>

<style scoped lang="less">
.form-components-container {
    background-color: var(--background);
}
</style>
