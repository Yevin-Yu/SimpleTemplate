<template>
    <!-- 背景装饰元素 -->
    <div class="background-decoration">
        <div class="decoration-circle decoration-circle-1"></div>
        <div class="decoration-circle decoration-circle-2"></div>
        <div class="decoration-circle decoration-circle-3"></div>
        <div class="decoration-grid"></div>
    </div>
</template>

<script setup lang="ts">
/**
 * 登录页背景装饰组件
 *
 * 职责：
 * - 提供登录页的背景装饰效果
 * - 包含渐变背景、装饰圆圈和网格图案
 */
</script>

<style lang="less">
// 背景装饰元素容器
.background-decoration {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
}

// 装饰圆圈
.decoration-circle {
    position: absolute;
    border-radius: 50%;
    animation: float 20s ease-in-out infinite;

    &.decoration-circle-1 {
        width: 400px;
        height: 400px;
        top: -200px;
        right: -150px;
        border: 2px solid var(--primary);
        background: radial-gradient(circle, rgba(226, 169, 25, 0.08) 0%, transparent 70%);
        opacity: 0.6;
        animation-delay: 0s;
        box-shadow: 0 0 60px rgba(226, 169, 25, 0.15);
    }

    &.decoration-circle-2 {
        width: 300px;
        height: 300px;
        bottom: -100px;
        left: -80px;
        border: 2px solid var(--accent);
        background: radial-gradient(circle, rgba(132, 160, 223, 0.1) 0%, transparent 70%);
        opacity: 0.5;
        animation-delay: 5s;
        box-shadow: 0 0 50px rgba(132, 160, 223, 0.2);
    }

    &.decoration-circle-3 {
        width: 250px;
        height: 250px;
        top: 20%;
        left: 5%;
        border: 2px solid var(--primary);
        background: radial-gradient(circle, rgba(226, 169, 25, 0.06) 0%, transparent 70%);
        opacity: 0.4;
        animation-delay: 10s;
        box-shadow: 0 0 40px rgba(226, 169, 25, 0.12);
    }
}

// 网格装饰
.decoration-grid {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
        linear-gradient(rgba(226, 169, 25, 0.15) 1px, transparent 1px),
        linear-gradient(90deg, rgba(226, 169, 25, 0.15) 1px, transparent 1px),
        linear-gradient(rgba(132, 160, 223, 0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(132, 160, 223, 0.08) 1px, transparent 1px);
    background-size: 80px 80px, 80px 80px, 20px 20px, 20px 20px;
    background-position: 0 0, 0 0, 40px 40px, 40px 40px;
    opacity: 0.4;
    mask-image: radial-gradient(ellipse 90% 90% at center, black 30%, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse 90% 90% at center, black 30%, transparent 75%);
}

// 浮动动画
@keyframes float {
    0%,
    100% {
        transform: translate(0, 0) scale(1);
    }

    25% {
        transform: translate(20px, -20px) scale(1.05);
    }

    50% {
        transform: translate(-15px, 15px) scale(0.95);
    }

    75% {
        transform: translate(10px, 10px) scale(1.02);
    }
}
</style>

