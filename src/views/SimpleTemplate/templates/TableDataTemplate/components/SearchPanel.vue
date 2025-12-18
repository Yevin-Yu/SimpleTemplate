<template>
    <ui-card class="p-6">
        <div class="flex flex-col gap-4">
            <!-- 标题行：单独一行、居左 -->
            <div class="header">
                <div class="h-title text-lg font-semibold">搜索</div>
                <div class="header-desc">按关键词 / 角色 / 状态筛选</div>
            </div>

            <!-- 控件行：单独一行、居左 -->
            <div class="flex items-center gap-3 flex-wrap justify-start">
                <!-- 关键词 -->
                <div class="field">
                    <ui-input
                        v-model="model.keyword"
                        type="text"
                        size="small"
                        placeholder="关键词（姓名 / 邮箱）"
                        aria-label="关键词"
                        :disabled="loading"
                    >
                        <template #prefix>
                            <SearchIcon :size="16" />
                        </template>
                    </ui-input>
                </div>

                <!-- 角色 -->
                <div class="field">
                    <ui-select
                        v-model="model.role"
                        :options="roleOptions"
                        option-label="label"
                        option-value="value"
                        placeholder="角色"
                        :disabled="loading"
                        size="small"
                    />
                </div>

                <!-- 状态 -->
                <div class="field">
                    <ui-select
                        v-model="model.status"
                        :options="statusOptions"
                        option-label="label"
                        option-value="value"
                        placeholder="状态"
                        :disabled="loading"
                        size="small"
                    />
                </div>

                <div class="flex items-center gap-2">
                    <ui-button variant="primary" :disabled="loading" @click="emit('submit')">查询</ui-button>
                    <ui-button variant="default" :disabled="loading" @click="emit('reset')">重置</ui-button>
                </div>
            </div>
        </div>
    </ui-card>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import uiCard from '@/components/ui/ui-card.vue'
import uiButton from '@/components/ui/ui-button.vue'
import uiSelect from '@/components/ui/ui-select.vue'
import uiInput from '@/components/ui/ui-input.vue'
import { SearchIcon } from '@/components/icons'
import type { SearchFormState } from '../types'

/**
 * SearchPanel（搜索区）
 *
 * 职责：
 * - 只管理表单输入与触发事件，不直接发请求
 * - 通过 v-model 将表单状态交由父组件/数据层统一管理
 */

const props = defineProps<{
    modelValue: SearchFormState
    loading: boolean
}>()

const emit = defineEmits<{
    'update:modelValue': [value: SearchFormState]
    submit: []
    reset: []
}>()

/**
 * 注意：不要直接修改 props.modelValue 的内部字段（会造成“隐式改 props”）
 * 这里使用 local state + watch 同步，是更稳健的前端工程实践。
 */
const model = reactive<SearchFormState>({
    keyword: '',
    role: 'all',
    status: 'all',
})

const roleOptions = [
    { label: '全部角色', value: 'all' },
    { label: '管理员', value: 'admin' },
    { label: '编辑', value: 'editor' },
    { label: '用户', value: 'user' },
] as const

const statusOptions = [
    { label: '全部状态', value: 'all' },
    { label: '启用', value: 'active' },
    { label: '停用', value: 'inactive' },
] as const

watch(
    () => props.modelValue,
    v => {
        model.keyword = v.keyword
        model.role = v.role
        model.status = v.status
    },
    { immediate: true, deep: true }
)

watch(
    model,
    v => {
        emit('update:modelValue', { ...v })
    },
    { deep: true }
)
</script>

<style scoped lang="less">
.h-title {
    color: var(--foreground);
}

.header {
    display: inline-flex;
    align-items: baseline;
    gap: 10px;
    flex-wrap: wrap;
}

.header-desc {
    font-size: 14px;
    color: var(--muted-foreground);
}

.field {
    display: inline-flex;
    flex-direction: column;
}

.field :deep(.ui-input-wrapper) {
    min-width: 120px;
}
</style>
