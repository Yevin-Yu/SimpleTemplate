## UI 组件约定（src/components/ui）

### 命名

- **文件名**：`ui-xxx.vue`（保持现有项目约定）
- **组件导入名**：`UiXxx`（PascalCase）
- **模板使用名**：推荐 `<ui-xxx />`（kebab-case，符合 Vue 模板习惯）

### Props / Emits / Slots 注释规范

- **只注释对外 API**：props/emits/slots 的语义、默认值、注意事项
- **避免实现细节注释**：实现细节尽量通过清晰命名表达

### v-model 约定

- 统一使用 `modelValue` + `update:modelValue`
- 额外事件（如 `change`）用于业务侧监听，不替代 v-model

### 设计目标

- **类型安全**：`script setup lang="ts"` + 明确的 props/emits 类型
- **可访问性**：组件尽量提供基础的 aria/键盘交互（例如 Switch/Select）

### 迁移提示（Breaking Change）

- **`ui-button`**：props `type` 已规范为 **`variant`**（`default/primary/blank`）。
