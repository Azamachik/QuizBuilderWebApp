import type { Quiz } from '../types'

export function StatusBadge({ status }: { status: Quiz['status'] }) {
    return (
        <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
            {status === 'published' ? 'Опубликовано' : 'Черновик'}
        </span>
    )
}
