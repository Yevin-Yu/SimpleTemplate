import { createApp, type App } from 'vue'
import UiToast from '@/components/ui/ui-toast.vue'

interface ToastOptions {
    type?: 'success' | 'error' | 'warning' | 'info'
    duration?: number
}

class ToastManager {
    private container: HTMLElement | null = null
    private apps: App[] = []

    private ensureContainer() {
        if (!this.container) {
            this.container = document.createElement('div')
            this.container.className = 'toast-container'
            this.container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 12px;
                pointer-events: none;
            `
            document.body.appendChild(this.container)
        }
        return this.container
    }

    show(message: string, options: ToastOptions = {}) {
        const container = this.ensureContainer()
        const toastDiv = document.createElement('div')
        toastDiv.style.pointerEvents = 'auto'
        container.appendChild(toastDiv)

        const app = createApp(UiToast, {
            message,
            type: options.type || 'info',
            duration: options.duration || 3000,
        })

        app.mount(toastDiv)
        this.apps.push(app)

        // 自动清理
        const duration = options.duration || 3000
        if (duration > 0) {
            setTimeout(() => {
                this.remove(app, toastDiv)
            }, duration + 300) // 加上动画时间
        }
    }

    private remove(app: App, element: HTMLElement) {
        app.unmount()
        element.remove()
        this.apps = this.apps.filter(a => a !== app)
    }

    success(message: string, duration?: number) {
        this.show(message, { type: 'success', duration })
    }

    error(message: string, duration?: number) {
        this.show(message, { type: 'error', duration: duration || 5000 })
    }

    warning(message: string, duration?: number) {
        this.show(message, { type: 'warning', duration })
    }

    info(message: string, duration?: number) {
        this.show(message, { type: 'info', duration })
    }
}

export const toast = new ToastManager()

