<template>
    <button class="ui-button gap-2" :class="[`ui-button-${type}`, { 'only-icon': !$slots.default }, { 'is-disabled': disabled }]">
        <div class="icon" v-if="$slots.icon">
            <slot name="icon"></slot>
        </div>
        <div class="content" v-if="$slots.default">
            <slot></slot>
        </div>
        <div class="disabled-overlay" v-if="disabled"></div>
    </button>
</template>
<script setup>
// 接受参数
defineProps({
    // primary, default, blank
    type: {
        type: String,
        default: 'default',
    },
    size: {
        type: String,
        default: 'medium',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
})
</script>
<style scoped>
.ui-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0px 10px;
    cursor: pointer;
    border: 1px solid transparent;
    color: var(--foreground);
    line-height: 32px;
    font-family: Geist, sans-serif;
    vertical-align: middle;
}

.ui-button-default {
    background-color: var(--white);
    box-shadow: var(--shadow-xs);
    border: 1px solid var(--border);
    &:hover {
        background-color: var(--accent);
    }
}

.ui-button-primary {
    background-color: var(--primary);
    color: var(--primary-foreground);
    &:hover {
        background-color: var(--pr imary);
        filter: brightness(1.05);
    }
}

.ui-button-blank {
    background-color: transparent;
    &:hover {
        background-color: var(--accent);
    }
}

.ui-button.only-icon {
    padding: 8px;
}

.ui-button.is-disabled {
    background-color: var(--muted);
    cursor: not-allowed;
    opacity: 0.8;
}

.icon {
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
