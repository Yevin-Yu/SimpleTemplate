<template>
    <div class="table-demo-container h-full w-full p-6 overflow-auto">
        <div class="max-w-6xl mx-auto">
            <h1 class="text-3xl font-bold mb-6">表格组件示例</h1>

            <ui-card class="p-6 mb-6">
                <h2 class="text-xl font-semibold mb-4">数据表格</h2>
                <div class="overflow-x-auto">
                    <table class="w-full border-collapse">
                        <thead>
                            <tr class="border-b border-gray-200">
                                <th class="px-4 py-3 text-left font-semibold">ID</th>
                                <th class="px-4 py-3 text-left font-semibold">姓名</th>
                                <th class="px-4 py-3 text-left font-semibold">邮箱</th>
                                <th class="px-4 py-3 text-left font-semibold">角色</th>
                                <th class="px-4 py-3 text-left font-semibold">状态</th>
                                <th class="px-4 py-3 text-left font-semibold">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in tableData" :key="item.id" class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td class="px-4 py-3">{{ item.id }}</td>
                                <td class="px-4 py-3">{{ item.name }}</td>
                                <td class="px-4 py-3">{{ item.email }}</td>
                                <td class="px-4 py-3">
                                    <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                                        {{ item.role }}
                                    </span>
                                </td>
                                <td class="px-4 py-3">
                                    <ui-switch v-model="item.active" />
                                </td>
                                <td class="px-4 py-3">
                                    <div class="flex gap-2">
                                        <ui-button type="blank" size="small">编辑</ui-button>
                                        <ui-button type="blank" size="small">删除</ui-button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </ui-card>

            <ui-card class="p-6">
                <h2 class="text-xl font-semibold mb-4">卡片式列表</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <ui-card v-for="item in tableData" :key="item.id" class="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                        <h3 class="font-semibold mb-2">{{ item.name }}</h3>
                        <p class="text-sm text-gray-600 mb-2">{{ item.email }}</p>
                        <div class="flex items-center justify-between">
                            <span class="px-2 py-1 bg-gray-100 rounded text-xs">{{ item.role }}</span>
                            <ui-switch v-model="item.active" />
                        </div>
                    </ui-card>
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

const tableData = ref([
    { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员', active: true },
    { id: 2, name: '李四', email: 'lisi@example.com', role: '编辑', active: false },
    { id: 3, name: '王五', email: 'wangwu@example.com', role: '用户', active: true },
    { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: '编辑', active: false },
    { id: 5, name: '钱七', email: 'qianqi@example.com', role: '用户', active: true },
])
</script>

<style scoped lang="less">
.table-demo-container {
    background-color: var(--background);
}
</style>
