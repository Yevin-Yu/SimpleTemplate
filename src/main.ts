import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/styles/index.css'
import router from './router'
import App from './App.vue'
import { useProjectStore } from './stores/project'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// 初始化项目路由 - 在路由就绪后，如果当前路径是根路径则跳转
router.isReady().then(() => {
    const projectStore = useProjectStore()
    const savedRoute = projectStore.getProjectRoute()

    // 如果当前路径是根路径，则跳转到保存的项目路由
    if (router.currentRoute.value.path === '/') {
        router.replace(savedRoute)
    }
})

app.mount('#app')
