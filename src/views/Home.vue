<template>
    <div class="home-container h-full w-full">
        <ui-card class="p-4 m-4 w-md">
            <h1>Button Component</h1>
            <ui-button class="m-2">Default</ui-button>
            <ui-button class="m-2" type="primary">Primary</ui-button>
            <ui-button class="m-2" type="blank">Blank</ui-button>
            <br />
            <ui-button class="m-2">
                <template #icon>
                    <SettingsIcon size="16" />
                </template>
                Default
            </ui-button>
            <ui-button type="primary" class="m-2">
                <template #icon>
                    <LogOutIcon size="16" />
                </template>
                Primary
            </ui-button>
            <ui-button type="blank" class="m-2">
                <template #icon>
                    <ShareIcon size="16" />
                </template>
                Blank
            </ui-button>
            <br />
            <ui-button class="m-2">
                <template #icon>
                    <SettingsIcon size="16" />
                </template>
            </ui-button>
            <ui-button type="primary" class="m-2">
                <template #icon>
                    <LogOutIcon size="16" />
                </template>
            </ui-button>
            <ui-button type="blank" class="m-2">
                <template #icon>
                    <ShareIcon size="16" />
                </template>
            </ui-button>
        </ui-card>
    </div>
</template>

<script setup lang="ts">
import uiButton from '@/components/ui/ui-button.vue'
import uiCard from '@/components/ui/ui-card.vue'
import { SettingsIcon, LogOutIcon, ShareIcon } from '@/components/icons'
</script>

<style scoped lang="less"></style>
