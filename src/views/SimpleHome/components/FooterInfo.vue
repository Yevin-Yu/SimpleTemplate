<template>
    <div class="footer-info">
        <div class="footer-center">
            <div class="shortcuts">
                <div v-for="shortcut in SHORTCUTS" :key="shortcut.key" class="shortcut-item">
                    <ui-tag variant="neutral" class="shortcut-key-tag">
                        <span class="shortcut-key">{{ shortcut.key }}</span>
                    </ui-tag>
                    <span class="shortcut-label">{{ shortcut.label }}</span>
                </div>
            </div>
            <div class="config-actions">
                <ui-button variant="blank" size="small" @click="handleExport">
                    <template #icon>
                        <DownloadIcon :size="14" />
                    </template>
                    <span>导出</span>
                </ui-button>
                <ui-button variant="blank" size="small" @click="handleImportClick">
                    <template #icon>
                        <UploadIcon :size="14" />
                    </template>
                    <span>导入</span>
                </ui-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import UiTag from '@/components/ui/ui-tag.vue'
import UiButton from '@/components/ui/ui-button.vue'
import { DownloadIcon, UploadIcon } from '@/components/icons'
import { SHORTCUTS } from '../constants'
import { useConfigImportExport } from '../composables/useConfigImportExport'
import { toast } from '@/shared'

const { exportConfig, handleImportClick } = useConfigImportExport()

function handleExport() {
    try {
        exportConfig()
        toast.success('配置导出成功')
    } catch (error) {
        toast.error(error instanceof Error ? error.message : '导出配置失败')
    }
}
</script>

<style scoped lang="less">
.footer-info {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px 32px;
    position: relative;
    z-index: 10;
    min-height: 60px;
}

.footer-center {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;

    .shortcuts {
        display: flex;
        gap: 12px;
        align-items: center;
    }

    .config-actions {
        display: flex;
        gap: 8px;
        align-items: center;

        :deep(.ui-button) {
            font-size: 12px;
            color: var(--muted-foreground);
            transition: all 0.2s ease;

            &:hover {
                color: var(--foreground);
                background-color: var(--muted);
            }
        }
    }

    .shortcut-item {
        display: flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;
        transition: all 0.2s ease;
        user-select: none;

        &:hover {
            .shortcut-key-tag {
                background: var(--muted);
                transform: translateY(-1px);
                box-shadow: var(--shadow-sm);
            }
        }

        .shortcut-key-tag {
            .shortcut-key {
                font-size: 12px;
                font-weight: 600;
                color: var(--muted-foreground);
                font-family: var(--font-mono);
            }
        }

        .shortcut-label {
            font-size: 12px;
            color: var(--foreground);
        }
    }
}
</style>
