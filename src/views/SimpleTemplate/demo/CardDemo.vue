<template>
    <div class="card-demo-container h-full w-full p-6 overflow-auto">
        <div class="max-w-6xl mx-auto">
            <h1 class="text-3xl font-bold mb-6">卡片组件示例</h1>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <ui-card class="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <div class="text-4xl mb-4">📊</div>
                    <h3 class="text-xl font-semibold mb-2">数据统计</h3>
                    <p class="text-gray-600 mb-4">查看详细的数据统计信息和图表分析</p>
                    <ui-button variant="primary">查看详情</ui-button>
                </ui-card>

                <ui-card class="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <div class="text-4xl mb-4">⚙️</div>
                    <h3 class="text-xl font-semibold mb-2">系统设置</h3>
                    <p class="text-gray-600 mb-4">配置系统参数和个性化设置</p>
                    <ui-button variant="blank">进入设置</ui-button>
                </ui-card>

                <ui-card class="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <div class="text-4xl mb-4">👥</div>
                    <h3 class="text-xl font-semibold mb-2">用户管理</h3>
                    <p class="text-gray-600 mb-4">管理用户账户和权限设置</p>
                    <ui-button variant="primary">管理用户</ui-button>
                </ui-card>
            </div>

            <ui-card class="p-6 mb-6">
                <h2 class="text-xl font-semibold mb-4">带图片的卡片</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ui-card class="overflow-hidden">
                        <img src="/logo.jpg" alt="示例图片" class="w-full h-48 object-cover" />
                        <div class="p-4">
                            <h3 class="font-semibold mb-2">卡片标题</h3>
                            <p class="text-sm text-gray-600 mb-4">这是一张带图片的卡片示例，展示了如何在卡片中嵌入图片内容。</p>
                            <div class="flex gap-2">
                                <ui-button variant="primary" size="small">了解更多</ui-button>
                                <ui-button variant="blank" size="small">分享</ui-button>
                            </div>
                        </div>
                    </ui-card>

                    <ui-card class="overflow-hidden">
                        <div class="p-4">
                            <h3 class="font-semibold mb-2">卡片标题</h3>
                            <p class="text-sm text-gray-600 mb-4">这是一张带图片的卡片示例，展示了如何在卡片中嵌入图片内容。</p>
                            <div class="flex gap-2">
                                <ui-button variant="primary" size="small">了解更多</ui-button>
                                <ui-button variant="blank" size="small">分享</ui-button>
                            </div>
                        </div>
                        <img src="/logo.jpg" alt="示例图片" class="w-full h-48 object-cover" />
                    </ui-card>
                </div>
            </ui-card>

            <ui-card class="p-6">
                <h2 class="text-xl font-semibold mb-4">统计卡片</h2>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <ui-card class="p-4 text-center">
                        <div class="text-3xl font-bold text-blue-600 mb-2">1,234</div>
                        <div class="text-sm text-gray-600">总用户数</div>
                    </ui-card>
                    <ui-card class="p-4 text-center">
                        <div class="text-3xl font-bold text-green-600 mb-2">567</div>
                        <div class="text-sm text-gray-600">活跃用户</div>
                    </ui-card>
                    <ui-card class="p-4 text-center">
                        <div class="text-3xl font-bold text-orange-600 mb-2">89</div>
                        <div class="text-sm text-gray-600">待处理</div>
                    </ui-card>
                    <ui-card class="p-4 text-center">
                        <div class="text-3xl font-bold text-purple-600 mb-2">12</div>
                        <div class="text-sm text-gray-600">新消息</div>
                    </ui-card>
                </div>
            </ui-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import uiCard from '@/components/ui/ui-card.vue'
import uiButton from '@/components/ui/ui-button.vue'
</script>

<style scoped lang="less">
.card-demo-container {
    background-color: var(--background);
}
</style>
