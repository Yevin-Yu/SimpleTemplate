<template>
    <!-- 默认布局 侧边栏 与 内容区域 -->
    <div class="default-layout">
        <!-- 侧边栏  顶部logo 与 主题切换按钮 下部菜单栏-->
        <div class="sidebar">
            <!-- 顶部logo 与 主题切换按钮 -->
            <div class="sidebar-header">
                <div class="title">Simple Template</div>
            </div>
            <!-- 下部菜单栏 -->
            <div class="sidebar-menu">
                <wb-menu v-model="activeMenu" :items="menuItems" @select="onMenuSelect" />
            </div>
            <!-- 底部Github -->
            <div class="footer-link">
                <wb-tag size="small" @click="toggleTheme">🎨</wb-tag>
                <wb-tag size="small" @click="goLink">🔗</wb-tag>
            </div>
        </div>
        <!-- 内容区域-->
        <div class="content">
            <!-- 路由出口 -->
            <router-view></router-view>
        </div>
    </div>
</template>
<script setup>
import wbTag from '@/atom/wb-tag.vue'

// 主题切换
import { useTheme } from '@/hooks/useTheme'
const { toggleTheme } = useTheme()
const goLink = () => {
    window.open('https://github.com/Yevin-Yu/SimpleTemplate', '_self')
}

// 侧边栏菜单栏
import wbMenu from '@/molecule/wb-menu.vue'
import { ref } from 'vue'
const menuItems = [
    {
        key: 'Home',
        label: '首页',
        icon: '🏠',
    },
    {
        key: 'atom',
        label: '原子组件',
        icon: '🧬',
        children: [
            { key: 'Button', label: '按钮组件', icon: '🔘' },
            { key: 'tag', label: '标签组件', icon: '🏷️' },
        ],
    },
]
const activeMenu = ref('home')
import { useRouter } from 'vue-router'
const router = useRouter()
function onMenuSelect(item) {
    if (item.key) {
        router.push({ name: item.key })
    }
}
</script>
<style scoped lang="less">
.default-layout {
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: var(--default-bg-color);
}

.sidebar {
    width: 200px;
    min-width: 200px;
    background-color: var(--theme-aside-bg-color);
    box-shadow: 3px 3px 0px var(--theme-aside-shadow-color);
    border-radius: 6px;
    margin: 10px;
    margin-right: 0;

    .sidebar-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 16px 0;
        margin: 0 6px;
        box-shadow: 0 1px 0px var(--default-shadow-color);

        .title {
            font-size: 18px;
            line-height: 1.5;
            color: var(--white-text-color);
        }
    }

    .sidebar-menu {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: calc(100% - 100px);
    }

    .footer-link {
        padding: 4px;
        margin: 0 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 -1px 0px var(--default-shadow-color);

        .wb-tag {
            font-size: 12px;
            padding: 4px 8px;
        }
    }
}

.content {
    flex: 1;
    height: 100%;
}
</style>
