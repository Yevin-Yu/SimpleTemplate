<template>
    <div class="simple-home">
        <div class="home-container">
            <!-- 搜索框 -->
            <SearchBox :history="searchHistory" :bookmarks="bookmarks" @search="handleSearchAdd" @select-history="handleHistorySelect" />

            <!-- 常用网站 -->
            <QuickAccess :sites="quickAccessSites" @open-url="openUrl" @reorder="handleSiteReorder" />

            <!-- 书签 -->
            <Bookmarks :bookmarks="bookmarks" @add-bookmark="showAddBookmarkDialog = true" @open-url="openUrl" />

            <!-- 搜索记录 -->
            <SearchHistory :history="searchHistory" :format-time="formatTime" @select-history="handleHistorySelect" @delete-history="deleteHistory" />
        </div>

        <!-- 添加书签对话框 -->
        <AddBookmarkDialog :visible="showAddBookmarkDialog" @close="showAddBookmarkDialog = false" @submit="handleAddBookmark" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useBookmarks } from './composables/useBookmarks'
import { useQuickAccess } from './composables/useQuickAccess'
import { useSearchHistory } from './composables/useSearchHistory'
import SearchBox from './components/SearchBox.vue'
import QuickAccess from './components/QuickAccess.vue'
import Bookmarks from './components/Bookmarks.vue'
import SearchHistory from './components/SearchHistory.vue'
import AddBookmarkDialog from './components/AddBookmarkDialog.vue'

const { bookmarks, addBookmark } = useBookmarks()
const { quickAccessSites, reorder: reorderSite } = useQuickAccess()
const { searchHistory, addHistory, deleteHistory, formatTime } = useSearchHistory()

const showAddBookmarkDialog = ref(false)

const openUrl = (url: string) => {
    let finalUrl = url
    if (!/^https?:\/\//.test(url)) {
        finalUrl = `https://${url}`
    }
    window.open(finalUrl, '_blank')
}

const handleSearchAdd = (query: string) => {
    addHistory(query)
}

const handleHistorySelect = (query: string) => {
    // 搜索历史被选中时，添加到历史记录
    addHistory(query)
}

const handleAddBookmark = (data: { title: string; url: string }) => {
    addBookmark(data.title, data.url)
}

const handleSiteReorder = (fromIndex: number, toIndex: number) => {
    reorderSite(fromIndex, toIndex)
}
</script>

<style scoped lang="less">
.simple-home {
    height: 100%;
    background: linear-gradient(135deg, var(--background) 0%, var(--muted) 100%);
    padding: 40px 20px;
    overflow: auto;
}

.home-container {
    max-width: 1200px;
    margin: 0 auto;
}
</style>
