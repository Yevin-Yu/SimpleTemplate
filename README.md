# Vue 3 + TypeScript + Vite 项目模板

这是一个现代化的 Vue 3 单页应用模板，集成了 TypeScript、Vite、Vue Router、Pinia、Tailwind CSS、ESLint 和 Prettier，旨在为快速启动新项目提供最佳实践和开发体验。

## 技术栈

- **Vue 3** – 渐进式 JavaScript 框架
- **TypeScript** – 类型安全的 JavaScript 超集
- **Vite** – 下一代前端构建工具，极速热更新
- **Vue Router** – 官方路由管理器
- **Pinia** – 直观的 Vue 状态管理库
- **Tailwind CSS** – 实用优先的 CSS 框架
- **ESLint** – 代码质量检查
- **Prettier** – 代码格式化工具
- **PostCSS** – CSS 处理工具
- **Autoprefixer** – 自动添加 CSS 前缀

## 项目结构

```
.
├── public/                 # 静态资源（如图标）
├── src/
│   ├── App.vue            # 根组件
│   ├── main.ts            # 应用入口
│   ├── router/            # 路由配置
│   │   └── index.ts
│   ├── stores/            # Pinia 状态管理
│   │   └── counter.ts
│   ├── styles/            # 全局样式
│   │   ├── index.css      # 主样式文件（引入 Tailwind）
│   │   └── normalize.css  # 样式重置
│   ├── theme/             # 主题变量（预留）
│   └── views/             # 页面组件
│       ├── Home.vue
│       └── About.vue
├── index.html             # HTML 入口
├── package.json           # 项目依赖和脚本
├── vite.config.ts         # Vite 配置
├── tailwind.config.js     # Tailwind 配置
├── postcss.config.js      # PostCSS 配置
├── eslint.config.js       # ESLint 配置
├── .prettierrc            # Prettier 配置
├── tsconfig.json          # TypeScript 配置
└── README.md              # 项目说明
```

## 主要文件说明

- **`src/App.vue`** – 应用根组件，包含导航、路由视图和 Pinia 计数器示例。
- **`src/main.ts`** – 应用初始化，注册 Pinia、Router 和全局样式。
- **`src/router/index.ts`** – 定义路由（Home 和 About 页面）。
- **`src/stores/counter.ts`** – Pinia store 示例，演示状态管理。
- **`src/styles/index.css`** – 引入 Tailwind CSS 的基础层、组件层和工具层。
- **`vite.config.ts`** – Vite 配置，包含 Vue 插件和路径别名 `@` 指向 `src`。
- **`tailwind.config.js`** – Tailwind 配置，指定内容文件路径。
- **`eslint.config.js`** – ESLint 配置，集成 Vue 和 TypeScript 规则。
- **`.prettierrc`** – Prettier 配置，确保代码风格统一。

## 运行命令

在项目根目录下执行以下命令：

| 命令                   | 描述                               |
| ---------------------- | ---------------------------------- |
| `npm install`          | 安装项目依赖                       |
| `npm run dev`          | 启动开发服务器（默认端口 5173）    |
| `npm run build`        | 构建生产版本（输出到 `dist` 目录） |
| `npm run preview`      | 预览生产构建                       |
| `npm run lint`         | 运行 ESLint 检查代码问题           |
| `npm run format`       | 使用 Prettier 格式化所有文件       |
| `npm run format:check` | 检查代码格式是否符合 Prettier 规则 |

## 快速开始

1. **克隆或下载本项目**

    ```bash
    git clone <repository-url>
    cd simple-template
    ```

2. **安装依赖**

    ```bash
    npm install
    ```

3. **启动开发服务器**

    ```bash
    npm run dev
    ```

    打开浏览器访问 [http://localhost:5173](http://localhost:5173)。

4. **开始开发**
    - 修改 `src/views/` 下的页面组件。
    - 在 `src/stores/` 中创建新的 Pinia store。
    - 通过 `src/router/index.ts` 添加路由。
    - 使用 Tailwind CSS 类名快速样式化。

## 配置说明

### TypeScript

- `tsconfig.json` 和 `tsconfig.app.json` 提供了严格的类型检查配置，支持 Vue 单文件组件。

### 路径别名

- 在代码中可以使用 `@` 代表 `src` 目录，例如 `import '@/styles/index.css'`。

### 代码质量

- ESLint 配置了 Vue 3 推荐规则和 TypeScript 规则，确保代码规范。
- Prettier 与 ESLint 集成，保存时自动格式化（需编辑器支持）。

### 样式

- Tailwind CSS 已完全配置，可直接使用其工具类。
- 通过 `src/styles/index.css` 可以添加自定义 CSS。

## 许可证

MIT
