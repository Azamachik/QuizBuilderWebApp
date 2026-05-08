import { useState, useRef } from 'react';

interface Sortable {
    id: string;
    order: number;
}

interface DragHandlers {
    onDragStart: () => void;
    onDragEnter: () => void;
    onDrop: () => void;
    onDragEnd: () => void;
}

export function useDragSort<T extends Sortable>(
    sorted: T[],
    onReorder: (reordered: T[]) => void
): {
    draggingId: string | null;
    getDragHandlers: (index: number, id: string) => DragHandlers;
} {
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const dragSrcIdx = useRef<number | null>(null);
    const dragOverIdx = useRef<number | null>(null);

    function getDragHandlers(index: number, id: string): DragHandlers {
        return {
            onDragStart: () => {
                dragSrcIdx.current = index;
                setDraggingId(id);
            },
            onDragEnter: () => {
                dragOverIdx.current = index;
            },
            onDrop: () => {
                const src = dragSrcIdx.current;
                const over = dragOverIdx.current;
                if (src === null || over === null || src === over) return;

                const reordered = [...sorted];
                const [moved] = reordered.splice(src, 1);
                reordered.splice(over, 0, moved);
                onReorder(reordered.map((item, i) => ({ ...item, order: i + 1 })));
            },
            onDragEnd: () => {
                setDraggingId(null);
                dragSrcIdx.current = null;
                dragOverIdx.current = null;
            }
        };
    }

    return { draggingId, getDragHandlers };
}
