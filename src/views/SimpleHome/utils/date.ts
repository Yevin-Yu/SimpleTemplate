const DAYS = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'] as const
const MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'] as const

export function formatTime(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
}

export function formatDate(date: Date): string {
    const day = DAYS[date.getDay()]
    const month = MONTHS[date.getMonth()]
    const dayNum = date.getDate()
    return `${day}，${month}${dayNum}日`
}

export function getGreeting(date: Date): string {
    const hour = date.getHours()
    if (hour < 12) return '早上好'
    if (hour < 18) return '下午好'
    return '晚上好'
}
