<template>
    <div class="dashboard-demo-container h-full w-full p-6 overflow-auto">
        <div class="max-w-7xl mx-auto">
            <div class="flex items-center justify-between mb-6">
                <h1 class="text-3xl font-bold">仪表盘示例</h1>
                <ui-button type="primary">
                    <template #icon>
                        <SettingsIcon size="16" />
                    </template>
                    设置
                </ui-button>
            </div>
            
            <!-- 统计卡片 -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <ui-card class="p-5 hover:shadow-lg transition-shadow">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm text-gray-600 mb-1">总访问量</div>
                            <div class="text-2xl font-bold">12,345</div>
                            <div class="text-xs text-green-600 mt-1">↑ 12.5%</div>
                        </div>
                        <div class="text-4xl">📈</div>
                    </div>
                </ui-card>

                <ui-card class="p-5 hover:shadow-lg transition-shadow">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm text-gray-600 mb-1">用户总数</div>
                            <div class="text-2xl font-bold">8,901</div>
                            <div class="text-xs text-green-600 mt-1">↑ 8.2%</div>
                        </div>
                        <div class="text-4xl">👥</div>
                    </div>
                </ui-card>

                <ui-card class="p-5 hover:shadow-lg transition-shadow">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm text-gray-600 mb-1">订单数量</div>
                            <div class="text-2xl font-bold">5,678</div>
                            <div class="text-xs text-red-600 mt-1">↓ 3.1%</div>
                        </div>
                        <div class="text-4xl">🛒</div>
                    </div>
                </ui-card>

                <ui-card class="p-5 hover:shadow-lg transition-shadow">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-sm text-gray-600 mb-1">收入总额</div>
                            <div class="text-2xl font-bold">¥98,765</div>
                            <div class="text-xs text-green-600 mt-1">↑ 15.3%</div>
                        </div>
                        <div class="text-4xl">💰</div>
                    </div>
                </ui-card>
            </div>

            <!-- 主要内容区域 -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- 左侧：图表和列表 -->
                <div class="lg:col-span-2 space-y-6">
                    <ui-card class="p-6">
                        <h2 class="text-xl font-semibold mb-4">最近活动</h2>
                        <div class="space-y-4">
                            <div
                                v-for="(activity, index) in activities"
                                :key="index"
                                class="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                    {{ activity.icon }}
                                </div>
                                <div class="flex-1">
                                    <div class="font-medium">{{ activity.title }}</div>
                                    <div class="text-sm text-gray-600">{{ activity.description }}</div>
                                    <div class="text-xs text-gray-400 mt-1">{{ activity.time }}</div>
                                </div>
                            </div>
                        </div>
                    </ui-card>

                    <ui-card class="p-6">
                        <h2 class="text-xl font-semibold mb-4">快速操作</h2>
                        <div class="grid grid-cols-2 gap-4">
                            <ui-button type="primary" class="h-20 flex flex-col items-center justify-center">
                                <span class="text-2xl mb-2">➕</span>
                                <span>新建项目</span>
                            </ui-button>
                            <ui-button type="blank" class="h-20 flex flex-col items-center justify-center">
                                <span class="text-2xl mb-2">📁</span>
                                <span>文件管理</span>
                            </ui-button>
                            <ui-button type="blank" class="h-20 flex flex-col items-center justify-center">
                                <span class="text-2xl mb-2">⚙️</span>
                                <span>系统设置</span>
                            </ui-button>
                            <ui-button type="primary" class="h-20 flex flex-col items-center justify-center">
                                <span class="text-2xl mb-2">📊</span>
                                <span>数据分析</span>
                            </ui-button>
                        </div>
                    </ui-card>
                </div>

                <!-- 右侧：通知和设置 -->
                <div class="space-y-6">
                    <ui-card class="p-6">
                        <h2 class="text-xl font-semibold mb-4">通知中心</h2>
                        <div class="space-y-3">
                            <div
                                v-for="(notice, index) in notices"
                                :key="index"
                                class="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                            >
                                <div class="font-medium text-sm">{{ notice.title }}</div>
                                <div class="text-xs text-gray-500 mt-1">{{ notice.time }}</div>
                            </div>
                        </div>
                    </ui-card>

                    <ui-card class="p-6">
                        <h2 class="text-xl font-semibold mb-4">系统状态</h2>
                        <div class="space-y-4">
                            <div>
                                <div class="flex justify-between text-sm mb-2">
                                    <span>CPU 使用率</span>
                                    <span>45%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-blue-600 h-2 rounded-full" style="width: 45%"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between text-sm mb-2">
                                    <span>内存使用率</span>
                                    <span>62%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-green-600 h-2 rounded-full" style="width: 62%"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between text-sm mb-2">
                                    <span>磁盘使用率</span>
                                    <span>38%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-orange-600 h-2 rounded-full" style="width: 38%"></div>
                                </div>
                            </div>
                        </div>
                    </ui-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import uiCard from '@/components/ui/ui-card.vue'
import uiButton from '@/components/ui/ui-button.vue'
import { SettingsIcon } from '@/components/icons'

const activities = ref([
    { icon: '👤', title: '新用户注册', description: '用户 "张三" 刚刚注册了账户', time: '5分钟前' },
    { icon: '📝', title: '文档更新', description: '项目文档已更新到最新版本', time: '15分钟前' },
    { icon: '💬', title: '新评论', description: '收到3条新评论', time: '30分钟前' },
    { icon: '🔔', title: '系统通知', description: '系统维护将在今晚进行', time: '1小时前' },
])

const notices = ref([
    { title: '系统更新完成', time: '2小时前' },
    { title: '新功能上线', time: '5小时前' },
    { title: '安全提醒', time: '1天前' },
])
</script>

<style scoped lang="less">
.dashboard-demo-container {
    background-color: var(--background);
}
</style>

