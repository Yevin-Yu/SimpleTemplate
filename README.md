<div align="center">

# 🚀 Simple Template

**一个现代化的 Vue 3 项目模板，开箱即用，助您快速启动新项目**

[![Vue](https://img.shields.io/badge/Vue-3.5.24-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[特性](#-特性) • [快速开始](#-快速开始) • [项目结构](#-项目结构) • [文档](#-文档)

</div>

---

## ✨ 特性

- ⚡ **极速开发** - Vite 构建工具，毫秒级热更新
- 🎨 **主题系统** - 内置明暗主题切换，Pinia 状态管理，自动持久化
- 📦 **组件库** - 8+ 开箱即用的 UI 组件（按钮、卡片、开关、选择器等）
- 🏠 **双模块** - Simple Home（个人主页）和 Simple Template（模板展示）
- 🔍 **搜索功能** - 搜索框、历史记录、书签管理、快速访问
- 📊 **示例页面** - 表单、表格、卡片、仪表盘等完整示例
- 💾 **状态管理** - Pinia 状态管理，支持 localStorage 持久化
- 🎯 **类型安全** - 100% TypeScript，完整的类型定义
- 📱 **响应式** - 完美适配移动端和桌面端
- 🛠️ **开发体验** - ESLint + Prettier，代码质量保障

## 🚀 快速开始

### 安装

```bash
# 克隆项目
git clone <repository-url>
cd SimpleTemplate

# 安装依赖
npm install
```

### 开发

```bash
# 启动开发服务器
npm run dev
```

访问 [http://localhost:5173](http://localhost:5173)

### 构建

```bash
# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 📁 项目结构

```
src/
├── components/          # 组件库
│   ├── icons/          # 图标组件
│   ├── module/         # 模块组件（Header、Sidebar、User）
│   └── ui/             # UI 组件（Button、Card、Switch 等）
├── layout/             # 布局组件
├── router/             # 路由配置
│   └── modules/        # 路由模块
│   ├── paths.ts        # 路由 path 常量（避免字符串散落）
│   └── nav.ts          # 侧边栏导航（单一数据源）
├── features/           # 按业务域组织的纯逻辑/模型（推荐）
│   └── project/        # 项目选择：默认选项/兼容旧数据规范化
├── stores/             # Pinia 状态管理
│   ├── theme.ts        # 主题管理
│   └── project.ts      # 项目切换
├── shared/             # 跨域共享（storage keys、safe storage 等）
├── styles/             # 全局样式
├── theme/              # 主题配置
└── views/              # 页面组件
    ├── SimpleHome/     # Simple Home 模块
    └── SimpleTemplate/ # Simple Template 模块
        ├── Home.vue     # 首页
        ├── demo/        # 示例页面
        └── example/     # 组件示例
```

## 🎯 核心功能

### 主题切换

使用 Pinia 管理主题状态，支持明暗主题切换，自动保存到 localStorage。

```typescript
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

// 切换主题
themeStore.toggleTheme()

// 设置特定主题
themeStore.setTheme('dark')

// 检查是否为暗色主题
const isDark = themeStore.isDark
```

### 项目切换

支持在 Simple Home 和 Simple Template 两个模块之间切换。

```typescript
import { useProjectStore } from '@/stores/project'

const projectStore = useProjectStore()

// 设置选中的项目
projectStore.setSelectedProject('/simple-home')

// 获取项目路由
const route = projectStore.getProjectRoute()
```

### UI 组件使用

```vue
<template>
    <ui-button variant="primary" @click="handleClick"> 点击我 </ui-button>

    <ui-card>
        <h3>卡片标题</h3>
        <p>卡片内容</p>
    </ui-card>

    <ui-switch v-model="enabled" />
</template>
```

## 📚 文档

### 路由配置

路由采用模块化设计，在 `src/router/modules/` 目录下管理：

- `simpleHome.ts` - Simple Home 模块路由
- `simpleTemplate.ts` - Simple Template 模块路由

补充约定：

- **路由 path 常量**：统一在 `src/router/paths.ts`（避免字符串散落）
- **路由 meta.title**：统一维护页面标题（自动同步到 `document.title`，并可被菜单/下拉派生文案）
- **侧边栏导航**：结构在 `src/router/nav.ts`，叶子节点文案优先派生自路由 `meta.title`

### 状态管理

使用 Pinia 进行状态管理，所有 store 位于 `src/stores/` 目录：

- `theme.ts` - 主题管理（存储键：`simple-app-theme`）
- `project.ts` - 项目切换（存储键：`simple-template-selected-project`）

### 组件库

内置 UI 组件位于 `src/components/ui/`：

| 组件            | 说明                         |
| --------------- | ---------------------------- |
| `ui-button`     | 按钮组件，支持多种类型和尺寸 |
| `ui-card`       | 卡片组件，用于内容展示       |
| `ui-switch`     | 开关组件，支持自定义图标     |
| `ui-select`     | 选择器组件，支持自定义渲染   |
| `ui-code-block` | 代码块组件，支持语法高亮     |

## 🛠️ 技术栈

| 分类         | 技术                       |
| ------------ | -------------------------- |
| **框架**     | Vue 3.5.24                 |
| **语言**     | TypeScript 5.9.3           |
| **构建工具** | Vite 7.2.4                 |
| **路由**     | Vue Router 4.6.3           |
| **状态管理** | Pinia 3.0.4                |
| **样式**     | Tailwind CSS 4.1.17 + Less |
| **代码质量** | ESLint + Prettier          |
| **工具库**   | @vueuse/core, shiki        |

## 📦 可用命令

| 命令                   | 说明             |
| ---------------------- | ---------------- |
| `npm run dev`          | 启动开发服务器   |
| `npm run build`        | 构建生产版本     |
| `npm run preview`      | 预览生产构建     |
| `npm run lint`         | 运行 ESLint 检查 |
| `npm run format`       | 格式化代码       |
| `npm run format:check` | 检查代码格式     |

## 🎨 主题定制

项目使用 CSS 变量实现主题系统，主题配置位于 `src/theme/` 目录。

### 修改主题变量

编辑 `src/theme/CrafterStation.css` 文件，修改 CSS 变量：

```css
:root {
    --primary: #your-color;
    --background: #your-color;
    /* ... */
}
```

### 添加新主题

1. 在 `src/stores/theme.ts` 中添加新主题类型
2. 在 `src/theme/` 目录下创建主题 CSS 文件
3. 在 `themes.css` 中导入新主题

## 🌟 示例页面

项目包含以下示例页面，可直接查看源码学习：

- 📝 **表单示例** (`/form-example`) - 完整的表单组件示例
- 📊 **表格示例** (`/table-example`) - 数据表格展示
- 🎴 **卡片示例** (`/card-example`) - 卡片布局示例
- 📈 **仪表盘示例** (`/dashboard-example`) - 数据可视化仪表盘
- 🧩 **组件示例** (`/base-components`, `/form-components`) - UI 组件使用示例

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证。

## 🙏 致谢

感谢以下优秀的开源项目：

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Pinia](https://pinia.vuejs.org/) - Vue 状态管理库
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架

---

<div align="center">

**Made with ❤️ by Yevin**

⭐ 如果这个项目对你有帮助，请给个 Star！

</div>
