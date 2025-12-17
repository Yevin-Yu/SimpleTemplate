<template>
    <div class="form-demo-container h-full w-full p-6 overflow-auto">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-3xl font-bold mb-6">表单组件示例</h1>

            <ui-card class="p-6 mb-6">
                <h2 class="text-xl font-semibold mb-4">基础表单</h2>
                <form @submit.prevent="handleSubmit" class="space-y-4">
                    <div>
                        <label class="block mb-2 text-sm font-medium">用户名</label>
                        <input
                            v-model="formData.username"
                            type="text"
                            placeholder="请输入用户名"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium">邮箱</label>
                        <input
                            v-model="formData.email"
                            type="email"
                            placeholder="请输入邮箱"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium">密码</label>
                        <input
                            v-model="formData.password"
                            type="password"
                            placeholder="请输入密码"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div class="flex items-center gap-4">
                        <ui-button variant="primary" @click="handleSubmit">提交</ui-button>
                        <ui-button variant="blank" @click="handleReset">重置</ui-button>
                    </div>
                </form>
            </ui-card>

            <ui-card class="p-6 mb-6">
                <h2 class="text-xl font-semibold mb-4">表单数据</h2>
                <pre class="bg-gray-100 p-4 rounded-lg overflow-auto">{{ JSON.stringify(formData, null, 2) }}</pre>
            </ui-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import uiCard from '@/components/ui/ui-card.vue'
import uiButton from '@/components/ui/ui-button.vue'

const formData = ref({
    username: '',
    email: '',
    password: '',
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
    }
}
</script>

<style scoped lang="less">
.form-demo-container {
    background-color: var(--background);
}
</style>
