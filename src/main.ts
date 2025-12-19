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

const themeStore = useThemeStore()
applyTheme(themeStore.currentTheme)

app.mount('#app')
