import { ref } from 'vue'

type InsertPosition = 'before' | 'after'

interface DragSortState {
    draggedIndex: number | null
    insertIndex: number | null
    insertPosition: InsertPosition
    isDragging: boolean
}

export function useDragSort() {
    const state = ref<DragSortState>({
        draggedIndex: null,
        insertIndex: null,
        insertPosition: 'after',
        isDragging: false,
    })

    function calculateInsertPosition(e: DragEvent, index: number): InsertPosition {
        if (state.value.draggedIndex === index) {
            return 'after'
        }

        const target = e.currentTarget as HTMLElement
        const rect = target.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2

        return e.clientX < centerX ? 'before' : 'after'
    }

    function calculateInsertIndex(targetIndex: number, position: InsertPosition, dragIndex: number): number {
        let insertIdx = position === 'before' ? targetIndex : targetIndex + 1

        if (dragIndex < insertIdx) {
            insertIdx -= 1
        }

        return insertIdx
    }

    function startDrag(index: number, e: DragEvent) {
        if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = 'move'
            e.dataTransfer.setData('text/plain', index.toString())
        }
        state.value.draggedIndex = index
        state.value.isDragging = true
    }

    function endDrag() {
        state.value.draggedIndex = null
        state.value.insertIndex = null
        state.value.isDragging = false
    }

    function updateInsertPosition(e: DragEvent, index: number) {
        if (e.dataTransfer) {
            e.dataTransfer.dropEffect = 'move'
        }

        if (state.value.draggedIndex !== null && state.value.draggedIndex !== index) {
            const position = calculateInsertPosition(e, index)
            state.value.insertPosition = position
            state.value.insertIndex = index
        }
    }

    function clearInsertPosition() {
        setTimeout(() => {
            if (!state.value.isDragging) {
                state.value.insertIndex = null
            }
        }, 50)
    }

    function handleDrop<T>(e: DragEvent, dropIndex: number, items: T[], onReorder: (newItems: T[]) => void) {
        const dragIndex = state.value.draggedIndex
        if (dragIndex === null) return

        if (e.dataTransfer) {
            e.dataTransfer.dropEffect = 'move'
        }

        const position = calculateInsertPosition(e, dropIndex)
        const insertIdx = calculateInsertIndex(dropIndex, position, dragIndex)

        if (insertIdx === dragIndex) {
            endDrag()
            return
        }

        const newItems = [...items]
        const [draggedItem] = newItems.splice(dragIndex, 1)
        newItems.splice(insertIdx, 0, draggedItem)

        onReorder(newItems)
        endDrag()
    }

    return {
        state,
        startDrag,
        endDrag,
        updateInsertPosition,
        clearInsertPosition,
        handleDrop,
    }
}
