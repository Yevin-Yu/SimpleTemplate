<template>
    <div class="header-info">
        <div class="header-left">
            <div class="greeting">
                <span class="greeting-text">{{ greeting }}</span>
            </div>
        </div>
        <div class="header-right">
            <div class="time">{{ formattedTime }}</div>
            <div class="date">{{ formattedDate }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { formatTime, formatDate, getGreeting } from '../utils/date'

const currentTime = ref(new Date())
const timeInterval = ref<number | null>(null)

const greeting = ref(getGreeting(currentTime.value))
const formattedTime = ref(formatTime(currentTime.value))
const formattedDate = ref(formatDate(currentTime.value))

function updateTime() {
    currentTime.value = new Date()
    formattedTime.value = formatTime(currentTime.value)
    formattedDate.value = formatDate(currentTime.value)
    greeting.value = getGreeting(currentTime.value)
}

onMounted(() => {
    updateTime()
    timeInterval.value = setInterval(updateTime, 1000)
})

onUnmounted(() => {
    if (timeInterval.value) {
        clearInterval(timeInterval.value)
    }
})
</script>

<style scoped lang="less">
.header-info {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 24px 32px;
    position: relative;
    z-index: 10;
    min-height: 80px;
}

.header-left {
    .greeting {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .greeting-text {
        font-size: 20px;
        font-weight: 500;
        color: var(--foreground);
    }
}

.header-right {
    text-align: right;
    
    .time {
        font-size: 32px;
        font-weight: 600;
        color: var(--foreground);
        line-height: 1.2;
        margin-bottom: 4px;
    }
    
    .date {
        font-size: 12px;
        color: var(--muted-foreground);
        letter-spacing: 0.5px;
    }
}
</style>
