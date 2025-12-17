<template>
    <div class="home-container">
        <!-- 欢迎横幅 -->
        <section class="hero-section">
            <div class="hero-content">
                <h1 class="hero-title">
                    <HomeIcon :size="48" class="hero-icon" />
                    <span>欢迎使用 Simple Template</span>
                </h1>
                <p class="hero-description">
                    一个现代化的 Vue 3 单页应用模板，集成了 TypeScript、Vite、Vue Router、Pinia、Tailwind CSS 等最佳实践工具，助您快速启动新项目。
                </p>
                <div class="hero-actions">
                    <ui-button variant="primary" @click="scrollToFeatures">
                        <template #icon>
                            <ExampleIcon :size="16" />
                        </template>
                        查看功能
                    </ui-button>
                    <ui-button @click="scrollToQuickStart">
                        <template #icon>
                            <ComponentsIcon :size="16" />
                        </template>
                        快速开始
                    </ui-button>
                </div>
            </div>
        </section>

        <!-- 技术栈展示 -->
        <section class="tech-stack-section">
            <h2 class="section-title">技术栈</h2>
            <div class="tech-grid">
                <ui-card v-for="tech in techStack" :key="tech.name" class="tech-card">
                    <div class="tech-icon">{{ tech.icon }}</div>
                    <h3 class="tech-name">{{ tech.name }}</h3>
                    <p class="tech-desc">{{ tech.description }}</p>
                </ui-card>
            </div>
        </section>

        <!-- 功能特性 -->
        <section id="features" class="features-section">
            <h2 class="section-title">功能特性</h2>
            <div class="features-grid">
                <ui-card v-for="feature in features" :key="feature.title" class="feature-card">
                    <div class="feature-header">
                        <component :is="feature.icon" :size="24" class="feature-icon" />
                        <h3 class="feature-title">{{ feature.title }}</h3>
                    </div>
                    <p class="feature-description">{{ feature.description }}</p>
                </ui-card>
            </div>
        </section>

        <!-- 快速开始 -->
        <section id="quick-start" class="quick-start-section">
            <h2 class="section-title">快速开始</h2>
            <ui-card class="quick-start-card">
                <div class="steps">
                    <div v-for="(step, index) in quickStartSteps" :key="index" class="step-item">
                        <div class="step-number">{{ index + 1 }}</div>
                        <div class="step-content">
                            <h3 class="step-title">{{ step.title }}</h3>
                            <p class="step-description">{{ step.description }}</p>
                            <ui-code-block v-if="step.command" :code="step.command" language="bash" :show-copy="true" />
                        </div>
                    </div>
                </div>
            </ui-card>
        </section>

        <!-- 项目统计 -->
        <section class="stats-section">
            <div class="stats-grid">
                <ui-card v-for="stat in stats" :key="stat.label" class="stat-card">
                    <div class="stat-value">{{ stat.value }}</div>
                    <div class="stat-label">{{ stat.label }}</div>
                </ui-card>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import uiCard from '@/components/ui/ui-card.vue'
import uiButton from '@/components/ui/ui-button.vue'
import uiCodeBlock from '@/components/ui/ui-code-block.vue'
import { HomeIcon, ExampleIcon, ComponentsIcon, FormIcon, TableIcon, CardIcon, DashboardIcon } from '@/components/icons'

const techStack = [
    {
        name: 'Vue 3',
        icon: '⚡',
        description: '渐进式 JavaScript 框架',
    },
    {
        name: 'TypeScript',
        icon: '📘',
        description: '类型安全的 JavaScript 超集',
    },
    {
        name: 'Vite',
        icon: '🚀',
        description: '下一代前端构建工具',
    },
    {
        name: 'Vue Router',
        icon: '🧭',
        description: '官方路由管理器',
    },
    {
        name: 'Pinia',
        icon: '🍍',
        description: '直观的状态管理库',
    },
    {
        name: 'Tailwind CSS',
        icon: '🎨',
        description: '实用优先的 CSS 框架',
    },
]

const features = [
    {
        title: '示例演示',
        description: '提供表单、表格、卡片、仪表盘等多种示例页面，帮助您快速了解项目结构和使用方式。',
        icon: ExampleIcon,
    },
    {
        title: '组件库',
        description: '内置丰富的 UI 组件，包括按钮、卡片、开关等，开箱即用，支持自定义主题。',
        icon: ComponentsIcon,
    },
    {
        title: '表单组件',
        description: '完善的表单组件集合，支持各种输入类型和验证规则，提升开发效率。',
        icon: FormIcon,
    },
    {
        title: '表格组件',
        description: '功能强大的表格组件，支持排序、筛选、分页等常用功能。',
        icon: TableIcon,
    },
    {
        title: '卡片组件',
        description: '灵活的卡片布局组件，适用于各种内容展示场景。',
        icon: CardIcon,
    },
    {
        title: '仪表盘',
        description: '数据可视化仪表盘模板，快速构建数据分析界面。',
        icon: DashboardIcon,
    },
]

const quickStartSteps = [
    {
        title: '安装依赖',
        description: '使用 npm 或 yarn 安装项目所需的所有依赖包。',
        command: 'npm install',
    },
    {
        title: '启动开发服务器',
        description: '运行开发命令，启动本地开发服务器，默认端口为 5173。',
        command: 'npm run dev',
    },
    {
        title: '开始开发',
        description: '修改 src/views/ 下的页面组件，在 src/stores/ 中创建新的 Pinia store，通过 src/router/index.ts 添加路由。',
        command: null,
    },
]

const stats = [
    { value: '8+', label: 'UI 组件' },
    { value: '10+', label: '图标组件' },
    { value: '100%', label: 'TypeScript' },
    { value: 'MIT', label: '开源协议' },
]

const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToQuickStart = () => {
    document.getElementById('quick-start')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped lang="less">
.home-container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 32px 24px;
}

// 欢迎横幅
.hero-section {
    margin-bottom: 64px;
    text-align: center;
}

.hero-content {
    max-width: 800px;
    margin: 0 auto;
}

.hero-title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 24px;
    color: var(--foreground);
}

.hero-icon {
    color: var(--primary);
}

.hero-description {
    font-size: 18px;
    line-height: 1.6;
    color: var(--muted-foreground);
    margin-bottom: 32px;
}

.hero-actions {
    display: flex;
    gap: 16px;
    justify-content: center;
}

// 技术栈
.tech-stack-section {
    margin-bottom: 64px;
}

.section-title {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 32px;
    text-align: center;
    color: var(--foreground);
}

.tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 24px;
}

.tech-card {
    padding: 24px;
    text-align: center;
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-md);
    }
}

.tech-icon {
    font-size: 48px;
    margin-bottom: 16px;
}

.tech-name {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--foreground);
}

.tech-desc {
    font-size: 14px;
    color: var(--muted-foreground);
    line-height: 1.5;
}

// 功能特性
.features-section {
    margin-bottom: 64px;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
}

.feature-card {
    padding: 24px;
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-md);
    }
}

.feature-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
}

.feature-icon {
    color: var(--primary);
    flex-shrink: 0;
}

.feature-title {
    font-size: 20px;
    font-weight: 600;
    color: var(--foreground);
}

.feature-description {
    font-size: 14px;
    line-height: 1.6;
    color: var(--muted-foreground);
}

// 快速开始
.quick-start-section {
    margin-bottom: 64px;
}

.quick-start-card {
    padding: 32px;
}

.steps {
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.step-item {
    display: flex;
    gap: 24px;
    align-items: flex-start;
}

.step-number {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--primary);
    color: var(--primary-foreground);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 18px;
    flex-shrink: 0;
}

.step-content {
    flex: 1;
}

.step-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--foreground);
}

.step-description {
    font-size: 14px;
    line-height: 1.6;
    color: var(--muted-foreground);
    margin-bottom: 12px;
}

.step-content :deep(.code-block-wrapper) {
    margin-top: 12px;
}

// 项目统计
.stats-section {
    margin-bottom: 32px;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 24px;
}

.stat-card {
    padding: 32px;
    text-align: center;
    transition: transform 0.2s ease;

    &:hover {
        transform: translateY(-4px);
    }
}

.stat-value {
    font-size: 48px;
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 8px;
}

.stat-label {
    font-size: 16px;
    color: var(--muted-foreground);
}

@media (max-width: 768px) {
    .hero-title {
        font-size: 32px;
        flex-direction: column;
    }

    .hero-icon {
        margin-bottom: 8px;
    }

    .tech-grid,
    .features-grid,
    .stats-grid {
        grid-template-columns: 1fr;
    }

    .hero-actions {
        flex-direction: column;
        align-items: stretch;
    }
}
</style>
