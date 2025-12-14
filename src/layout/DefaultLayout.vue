<template>
    <div class="default-layout h-full w-full">
        <HeaderModule />
        <div class="default-layout-content p-10 gap-4">
            <ui-button class="mr-2">Default Button</ui-button>
            <ui-button class="mr-2" type="primary">Primary Button</ui-button>

            <ui-button class="mr-2">
                <template #icon>
                    <SettingsIcon size="16" />
                </template>
                Manage Account
            </ui-button>
            <ui-button type="primary" class="mr-2">
                <template #icon>
                    <LogOutIcon size="16" />
                </template>
                Sign Out
            </ui-button>
            <ui-button type="blank" class="mr-2">
                <template #icon>
                    <LogOutIcon size="16" />
                </template>
                Sign Out
            </ui-button>
            <ui-button type="blank" class="mr-2"> Sign Out </ui-button>
            <ui-button class="mr-2">
                <template #icon>
                    <LogOutIcon size="16" />
                </template>
            </ui-button>
        </div>
    </div>
</template>
<script setup>
import HeaderModule from '@/components/module/HeaderModule.vue'
import { SettingsIcon, LogOutIcon } from '@/components/icons'
import uiButton from '@/components/ui/ui-button.vue'
</script>
<style scoped lang="less">
.default-layout {
    background-color: var(--background);
}
</style>
