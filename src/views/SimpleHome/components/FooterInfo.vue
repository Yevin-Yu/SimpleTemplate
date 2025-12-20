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
        </div>
    </div>
</template>

<script setup lang="ts">
import UiTag from '@/components/ui/ui-tag.vue'
import { SHORTCUTS } from '../constants'
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

    .shortcuts {
        display: flex;
        gap: 12px;
        align-items: center;
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
