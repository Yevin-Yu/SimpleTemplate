<template>
    <div class="base-components-container h-full w-full p-6 overflow-auto">
        <div class="max-w-6xl mx-auto">
            <h1 class="h-title text-3xl font-bold mb-6">基础组件</h1>

            <!-- 按钮组件 -->
            <ui-card class="p-6 mb-6">
                <h2 class="h-title text-2xl font-semibold mb-4">按钮组件 (Button)</h2>
                <p class="text-gray-600 mb-6">按钮用于触发操作，支持多种样式和图标。</p>

                <div class="space-y-6">
                    <div>
                        <h3 class="h-title text-lg font-medium mb-3">基础用法</h3>
                        <div class="flex flex-wrap gap-3">
                            <ui-button>默认按钮</ui-button>
                            <ui-button type="primary">主要按钮</ui-button>
                            <ui-button type="blank">空白按钮</ui-button>
                        </div>
                    </div>

                    <div>
                        <h3 class="h-title text-lg font-medium mb-3">带图标的按钮</h3>
                        <div class="flex flex-wrap gap-3">
                            <ui-button>
                                <template #icon>
                                    <SettingsIcon size="16" />
                                </template>
                                设置
                            </ui-button>
                            <ui-button type="primary">
                                <template #icon>
                                    <ShareIcon size="16" />
                                </template>
                                分享
                            </ui-button>
                            <ui-button type="blank">
                                <template #icon>
                                    <LogOutIcon size="16" />
                                </template>
                                退出
                            </ui-button>
                        </div>
                    </div>

                    <div>
                        <h3 class="h-title text-lg font-medium mb-3">仅图标按钮</h3>
                        <div class="flex flex-wrap gap-3">
                            <ui-button>
                                <template #icon>
                                    <SettingsIcon size="16" />
                                </template>
                            </ui-button>
                            <ui-button type="primary">
                                <template #icon>
                                    <ShareIcon size="16" />
                                </template>
                            </ui-button>
                            <ui-button type="blank">
                                <template #icon>
                                    <LogOutIcon size="16" />
                                </template>
                            </ui-button>
                        </div>
                    </div>

                    <div>
                        <h3 class="h-title text-lg font-medium mb-3">按钮状态</h3>
                        <div class="flex flex-wrap gap-3">
                            <ui-button @click="handleClick">可点击</ui-button>
                            <ui-button type="blank" disabled>禁用状态</ui-button>
                            <ui-button type="primary" @click="handleClick">主要按钮</ui-button>
                        </div>
                    </div>
                </div>
            </ui-card>

            <!-- 卡片组件 -->
            <ui-card class="p-6 mb-6">
                <h2 class="h-title text-2xl font-semibold mb-4">卡片组件 (Card)</h2>
                <p class="text-gray-600 mb-6">卡片用于展示内容和操作，提供清晰的视觉层次。</p>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <ui-card class="p-4 hover:shadow-lg transition-shadow">
                        <h3 class="h-title font-semibold mb-2">基础卡片</h3>
                        <p class="text-sm text-gray-600">这是一个基础卡片示例，可以包含任何内容。</p>
                    </ui-card>

                    <ui-card class="p-4 hover:shadow-lg transition-shadow">
                        <h3 class="h-title font-semibold mb-2">带操作卡片</h3>
                        <p class="text-sm text-gray-600 mb-3">卡片可以包含操作按钮。</p>
                        <ui-button type="primary" size="small">查看详情</ui-button>
                    </ui-card>

                    <ui-card variant="light" class="p-4 hover:shadow-lg transition-shadow">
                        <h3 class="h-title font-semibold mb-2">浅色阴影</h3>
                        <div class="text-2xl font-bold text-blue-600 mb-1">1,234</div>
                        <div class="text-xs text-gray-500">总访问量</div>
                    </ui-card>
                </div>
            </ui-card>

            <!-- 下拉菜单组件 -->
            <ui-card class="p-6 mb-6">
                <h2 class="h-title text-2xl font-semibold mb-4">下拉菜单组件 (Select)</h2>
                <p class="text-gray-600 mb-6">下拉菜单用于从多个选项中选择一个值，支持键盘导航和自定义渲染。</p>

                <div class="space-y-6">
                    <div>
                        <h3 class="h-title text-lg font-medium mb-3">基础用法</h3>
                        <div class="flex flex-wrap gap-4">
                            <div class="w-64">
                                <ui-select v-model="selectValue1" :options="simpleOptions" placeholder="请选择" />
                                <div class="text-sm text-gray-600 mt-2">选中值: {{ selectValue1 || '无' }}</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 class="h-title text-lg font-medium mb-3">对象数组</h3>
                        <div class="flex flex-wrap gap-4">
                            <div class="w-64">
                                <ui-select
                                    v-model="selectValue2"
                                    :options="userOptions"
                                    option-label="name"
                                    option-value="id"
                                    placeholder="选择用户"
                                />
                                <div class="text-sm text-gray-600 mt-2">选中ID: {{ selectValue2 || '无' }}</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 class="h-title text-lg font-medium mb-3">自定义选项渲染</h3>
                        <div class="flex flex-wrap gap-4">
                            <div class="w-70">
                                <ui-select v-model="selectValue3" :options="userOptions" option-label="name" option-value="id" placeholder="选择用户">
                                    <template #option="{ option, selected }">
                                        <div class="flex items-center justify-between" :class="{ 'font-semibold': selected }">
                                            <div>
                                                <!-- 图标  -->
                                                <div class="font-medium">{{ (option as unknown as UserOption).name }}</div>
                                            </div>
                                        </div>
                                    </template>
                                </ui-select>
                                <div class="text-sm text-gray-600 mt-2">选中用户: {{ getSelectedUserName(selectValue3) || '无' }}</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 class="h-title text-lg font-medium mb-3">禁用状态</h3>
                        <div class="flex flex-wrap gap-4">
                            <div class="w-64">
                                <ui-select v-model="selectValue4" :options="simpleOptions" placeholder="请选择" disabled />
                            </div>
                            <div class="w-64">
                                <ui-select :model-value="'选项2'" :options="simpleOptions" placeholder="请选择" disabled />
                            </div>
                        </div>
                    </div>
                </div>
            </ui-card>

            <!-- 开关组件 -->
            <ui-card class="p-6 mb-6">
                <h2 class="h-title text-2xl font-semibold mb-4">开关组件 (Switch)</h2>
                <p class="text-gray-600 mb-6">开关用于切换两种状态，常用于设置和配置。</p>

                <div class="space-y-6">
                    <div>
                        <h3 class="h-title text-lg font-medium mb-3">基础用法</h3>
                        <div class="flex items-center gap-4">
                            <div class="flex items-center gap-2">
                                <ui-switch v-model="switchValue1" />
                                <span>基础开关</span>
                            </div>
                            <div class="text-sm text-gray-600">状态: {{ switchValue1 ? '开启' : '关闭' }}</div>
                        </div>
                    </div>

                    <div>
                        <h3 class="h-title text-lg font-medium mb-3">带自定义图标</h3>
                        <div class="flex items-center gap-4">
                            <div class="flex items-center gap-2">
                                <ui-switch v-model="switchValue2">
                                    <template #thumb-on>
                                        <SwitchOnIcon />
                                    </template>
                                    <template #thumb-off>
                                        <SwitchOffIcon />
                                    </template>
                                </ui-switch>
                                <span>自定义图标开关</span>
                            </div>
                            <div class="text-sm text-gray-600">状态: {{ switchValue2 ? '开启' : '关闭' }}</div>
                        </div>
                    </div>

                    <div>
                        <h3 class="h-title text-lg font-medium mb-3">禁用状态</h3>
                        <div class="flex items-center gap-4">
                            <div class="flex items-center gap-2">
                                <ui-switch v-model="switchValue3" disabled />
                                <span>禁用开关</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <ui-switch :model-value="true" disabled />
                                <span>禁用开关（开启）</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 class="h-titletext-lg font-medium mb-3">实际应用场景</h3>
                        <div class="space-y-3">
                            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <div class="font-medium">通知提醒</div>
                                    <div class="text-sm text-gray-600">接收系统通知</div>
                                </div>
                                <ui-switch v-model="notifications" />
                            </div>
                            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <div class="font-medium">自动保存</div>
                                    <div class="text-sm text-gray-600">编辑时自动保存</div>
                                </div>
                                <ui-switch v-model="autoSave" />
                            </div>
                            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <div class="font-medium">深色模式</div>
                                    <div class="text-sm text-gray-600">使用深色主题</div>
                                </div>
                                <ui-switch v-model="darkMode" />
                            </div>
                        </div>
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
import uiSelect from '@/components/ui/ui-select.vue'
import { SettingsIcon, LogOutIcon, ShareIcon, SwitchOnIcon, SwitchOffIcon } from '@/components/icons'

const switchValue1 = ref(false)
const switchValue2 = ref(true)
const switchValue3 = ref(false)
const notifications = ref(true)
const autoSave = ref(false)
const darkMode = ref(false)

// Select 组件相关数据
const selectValue1 = ref<string | number | null>(null)
const selectValue2 = ref<string | number | null>(null)
const selectValue3 = ref<string | number | null>(null)
const selectValue4 = ref<string | number | null>(null)

interface UserOption extends Record<string, unknown> {
    id: number
    name: string
    email: string
    role: string
}

const simpleOptions = ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7', '选项8', '选项9', '选项10']

const userOptions: UserOption[] = [
    { id: 1, name: '张三', email: 'zhang@example.com', role: '管理员' },
    { id: 2, name: '李四', email: 'li@example.com', role: '用户' },
    { id: 3, name: '王五', email: 'wang@example.com', role: '用户' },
    { id: 4, name: '赵六', email: 'zhao@example.com', role: '编辑' },
]

const getSelectedUserName = (id: string | number | null): string | null => {
    if (id === null) return null
    const user = userOptions.find(u => u.id === id)
    return user ? user.name : null
}

const handleClick = () => {
    console.log('按钮被点击')
}
</script>

<style scoped lang="less">
.base-components-container {
    background-color: var(--background);
}

.h-title {
    color: var(--foreground);
}
</style>
