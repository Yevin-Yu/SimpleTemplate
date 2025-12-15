<template>
    <div class="header flex justify-between items-center">
        <!-- logo & title -->
        <div class="flex items-center">
            <div class="logo">
                <img class="rounded-sm" width="24" src="/logo.jpg" alt="Logo" />
            </div>
            <div class="title pl-4">SimpleTemplate</div>
        </div>
        <!-- user & link -->
        <div class="flex justify-between items-center gap-1">
            <ui-switch v-model="isDark" @change="toggleTheme">
                <template #thumb-on>
                    <SwitchOffIcon />
                </template>
                <template #thumb-off>
                    <SwitchOnIcon />
                </template>
            </ui-switch>
            <div class="line"></div>
            <ui-button @click="goGithub" type="blank" size="small">
                <template #icon>
                    <GitHubIcon size="24" />
                </template>
            </ui-button>
            <div class="line"></div>
            <UserModule />
        </div>
    </div>
</template>

<script setup>
import UiButton from '@/components/ui/ui-button.vue'
import uiSwitch from '@/components/ui/ui-switch.vue'
import UserModule from '@/components/module/UserModule.vue'
import { GitHubIcon, SwitchOnIcon, SwitchOffIcon } from '@/components/icons'
import { ref, watch } from 'vue'

// Github跳转
const goGithub = () => {
    window.open('https://github.com/yevin-yu/simpletemplate', '_blank')
}

// 主题切换
import { useTheme } from '@/hooks/useTheme'
const { currentTheme, toggleTheme } = useTheme()
const isDark = ref(false)
watch(currentTheme, newVal => {
    isDark.value = newVal === 'dark'
})
</script>

<style scoped lang="less">
.header {
    border-bottom: 1px solid var(--border);
    height: 48px;
    padding: 0 16px;
    color: var(--foreground);
}

.line {
    width: 0px;
    height: 32px;
    border-left: 1px solid var(--border);
    margin: 0 4.5px;
}
</style>
