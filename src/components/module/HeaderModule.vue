<template>
    <div class="header flex justify-between items-center">
        <!-- logo & title -->
        <div class="flex items-center">
            <div class="logo" aria-label="Site logo">
                <img class="rounded-sm" width="24" src="/logo.jpg" alt="Logo" />
            </div>
            <div class="line line-left"></div>
            <div class="logo-title">Welcome to Yevin's Home</div>
        </div>
        <!-- user & link -->
        <div class="flex justify-between items-center gap-1">
            <ui-select class="project-select" option-label="label" option-value="value" v-model="selectedProject"
                :options="projectOptions" placeholder="选择项目" @change="goProject">
                <template #selected="{ option }">
                    <div v-if="option" class="project-selected">
                        <component :is="iconMap[(option as ProjectOption).icon] || defaultIcon" class="project-icon" />
                        <span>{{ (option as ProjectOption).label }}</span>
                    </div>
                    <span v-else class="placeholder">选择项目</span>
                </template>
                <template #option="{ option, selected }">
                    <div class="project-option" :class="{ selected }">
                        <component :is="iconMap[(option as ProjectOption).icon] || defaultIcon" class="project-icon" />
                        <span>{{ (option as ProjectOption).label }}</span>
                    </div>
                </template>
            </ui-select>
            <div class="line"></div>
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

<script setup lang="ts">
import UiButton from '@/components/ui/ui-button.vue'
import uiSwitch from '@/components/ui/ui-switch.vue'
import uiSelect from '@/components/ui/ui-select.vue'
import UserModule from '@/components/module/UserModule.vue'
import { GitHubIcon, SwitchOnIcon, SwitchOffIcon, HomeIcon, DashboardIcon } from '@/components/icons'
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectStore } from '@/stores/project'
import type { Component } from 'vue'
import type { ProjectOption } from '@/stores/project'

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

// 项目切换
const projectStore = useProjectStore()
const router = useRouter()
const selectedProject = computed<string>({
    get: () => projectStore.selectedProject,
    set: value => {
        projectStore.setSelectedProject(value)
    },
})

const projectOptions = computed<ProjectOption[]>(() => projectStore.projectOptions)

const goProject = (value: string | number | null) => {
    if (typeof value !== 'string') return
    projectStore.setSelectedProject(value)
    router.push(value)
}

const iconMap: Record<string, Component> = {
    home: HomeIcon,
    template: DashboardIcon,
}
const defaultIcon = HomeIcon
</script>

<style scoped lang="less">
.header {
    border-bottom: 1px solid var(--border);
    height: 48px;
    padding: 0 16px;
    color: var(--foreground);

    .project-select {
        width: 200px;
    }

    .project-selected {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: var(--foreground);
    }

    .project-option {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--foreground);

        .project-icon {
            width: 16px;
            height: 16px;
        }

        &.selected {
            font-weight: 600;
        }
    }

    .logo-title {
        font-size: 18px;
        font-weight: 600;
        background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 50%, var(--primary) 100%);
        background-size: 200% 200%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: gradient-shift 3s ease infinite;
        position: relative;
        letter-spacing: 0.5px;
        text-shadow: 0 0 20px rgba(226, 169, 25, 0.3);
        transition: all 0.3s ease;

        &::before {
            content: "Yevin's Home";
            position: absolute;
            top: 0;
            left: 0;
            background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            filter: blur(8px);
            opacity: 0.6;
            z-index: -1;
            animation: gradient-shift 3s ease infinite;
        }

        &:hover {
            transform: scale(1.05);
            animation-duration: 1.5s;
        }
    }

    @keyframes gradient-shift {
        0% {
            background-position: 0% 50%;
        }

        50% {
            background-position: 100% 50%;
        }

        100% {
            background-position: 0% 50%;
        }
    }
}

.line {
    width: 0px;
    height: 32px;
    border-left: 1px solid var(--border);
    margin: 0 4.5px;
}

.line-left {
    height: 24px;
    margin: 0 12px;
}
</style>
