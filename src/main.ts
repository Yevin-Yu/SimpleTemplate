import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/styles/index.css'
import router from '@/router'
import App from './App.vue'
import { useThemeStore, applyTheme } from '@/stores/theme'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// 提前初始化主题 store，确保在应用挂载前应用主题
const themeStore = useThemeStore()
// 应用保存的主题
applyTheme(themeStore.currentTheme)

app.mount('#app')
