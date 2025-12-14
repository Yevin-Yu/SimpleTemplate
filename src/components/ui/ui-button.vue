<template>
    <button class="ui-button gap-2">
        <div class="icon" v-if="$slots.icon">
            <slot name="icon"></slot>
        </div>
        <div class="content">
            <slot></slot>
        </div>
    </button>
</template>
<style scoped>
.ui-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 10px;
    cursor: pointer;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-xs);
    line-height: 32px;
    font-family: Geist, sans-serif;
}

.ui-button:hover {
    background-color: var(--accent);
}
.icon {
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
