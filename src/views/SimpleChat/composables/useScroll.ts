import { ref, nextTick } from 'vue'

const SCROLL_THRESHOLD = 100
const AUTO_SCROLL_THRESHOLD = 200
const SCROLL_COMPLETE_DELAY = 300

/**
 * 滚动管理 Composable
 * 处理消息列表的滚动行为和滚动到底部按钮的显示
 */
export function useScroll(containerRef: { value: HTMLElement | undefined }) {
    const showScrollToBottom = ref(false)
    const isScrollingToBottom = ref(false)

    async function scrollToBottom() {
        isScrollingToBottom.value = true
        await nextTick()

        if (containerRef.value) {
            const scroll = () => {
                if (containerRef.value) {
                    containerRef.value.scrollTop = containerRef.value.scrollHeight
                    showScrollToBottom.value = false
                }
            }
            scroll()
            requestAnimationFrame(() => {
                scroll()
                setTimeout(() => {
                    isScrollingToBottom.value = false
                }, SCROLL_COMPLETE_DELAY)
            })
        } else {
            setTimeout(() => {
                isScrollingToBottom.value = false
            }, SCROLL_COMPLETE_DELAY)
        }
    }

    function handleScroll() {
        if (isScrollingToBottom.value || !containerRef.value) return

        const { scrollTop, scrollHeight, clientHeight } = containerRef.value
        const distanceFromBottom = scrollHeight - scrollTop - clientHeight
        showScrollToBottom.value = distanceFromBottom > SCROLL_THRESHOLD
    }

    function shouldAutoScroll(): boolean {
        if (!containerRef.value) return false

        const { scrollTop, scrollHeight, clientHeight } = containerRef.value
        const distanceFromBottom = scrollHeight - scrollTop - clientHeight
        return distanceFromBottom < AUTO_SCROLL_THRESHOLD
    }

    return {
        showScrollToBottom,
        scrollToBottom,
        handleScroll,
        shouldAutoScroll,
    }
}

