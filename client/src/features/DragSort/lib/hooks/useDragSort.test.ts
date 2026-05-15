import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDragSort } from './useDragSort';

const items = [
    { id: 'a', order: 1 },
    { id: 'b', order: 2 },
    { id: 'c', order: 3 },
];

describe('useDragSort', () => {
    describe('initial state', () => {
        it('draggingId is null initially', () => {
            const { result } = renderHook(() => useDragSort(items, vi.fn()));
            expect(result.current.draggingId).toBeNull();
        });
    });

    describe('drag lifecycle', () => {
        it('onDragStart sets draggingId to the dragged item id', () => {
            const { result } = renderHook(() => useDragSort(items, vi.fn()));
            act(() => { result.current.getDragHandlers(0, 'a').onDragStart(); });
            expect(result.current.draggingId).toBe('a');
        });

        it('onDragEnd clears draggingId', () => {
            const { result } = renderHook(() => useDragSort(items, vi.fn()));
            act(() => { result.current.getDragHandlers(0, 'a').onDragStart(); });
            act(() => { result.current.getDragHandlers(0, 'a').onDragEnd(); });
            expect(result.current.draggingId).toBeNull();
        });
    });

    describe('onDrop reordering', () => {
        it('moves item from lower index to higher index', () => {
            const onReorder = vi.fn();
            const { result } = renderHook(() => useDragSort(items, onReorder));

            act(() => {
                result.current.getDragHandlers(0, 'a').onDragStart();
                result.current.getDragHandlers(2, 'c').onDragEnter();
                result.current.getDragHandlers(0, 'a').onDrop();
            });

            expect(onReorder).toHaveBeenCalledTimes(1);
            const reordered = onReorder.mock.calls[0][0] as typeof items;
            expect(reordered.map((i) => i.id)).toEqual(['b', 'c', 'a']);
        });

        it('moves item from higher index to lower index', () => {
            const onReorder = vi.fn();
            const { result } = renderHook(() => useDragSort(items, onReorder));

            act(() => {
                result.current.getDragHandlers(2, 'c').onDragStart();
                result.current.getDragHandlers(0, 'a').onDragEnter();
                result.current.getDragHandlers(2, 'c').onDrop();
            });

            const reordered = onReorder.mock.calls[0][0] as typeof items;
            expect(reordered.map((i) => i.id)).toEqual(['c', 'a', 'b']);
        });

        it('reordered items have sequential 1-based order values', () => {
            const onReorder = vi.fn();
            const { result } = renderHook(() => useDragSort(items, onReorder));

            act(() => {
                result.current.getDragHandlers(0, 'a').onDragStart();
                result.current.getDragHandlers(2, 'c').onDragEnter();
                result.current.getDragHandlers(0, 'a').onDrop();
            });

            const reordered = onReorder.mock.calls[0][0] as typeof items;
            expect(reordered.map((i) => i.order)).toEqual([1, 2, 3]);
        });

        it('does nothing when src and over are the same index', () => {
            const onReorder = vi.fn();
            const { result } = renderHook(() => useDragSort(items, onReorder));

            act(() => {
                result.current.getDragHandlers(1, 'b').onDragStart();
                result.current.getDragHandlers(1, 'b').onDragEnter();
                result.current.getDragHandlers(1, 'b').onDrop();
            });

            expect(onReorder).not.toHaveBeenCalled();
        });

        it('does nothing when onDrop is called without a preceding onDragStart', () => {
            const onReorder = vi.fn();
            const { result } = renderHook(() => useDragSort(items, onReorder));

            act(() => {
                result.current.getDragHandlers(0, 'a').onDrop();
            });

            expect(onReorder).not.toHaveBeenCalled();
        });

        it('does nothing after onDragEnd resets state', () => {
            const onReorder = vi.fn();
            const { result } = renderHook(() => useDragSort(items, onReorder));

            act(() => {
                result.current.getDragHandlers(0, 'a').onDragStart();
                result.current.getDragHandlers(2, 'c').onDragEnter();
                result.current.getDragHandlers(0, 'a').onDragEnd();
                result.current.getDragHandlers(0, 'a').onDrop();
            });

            expect(onReorder).not.toHaveBeenCalled();
        });
    });
});
