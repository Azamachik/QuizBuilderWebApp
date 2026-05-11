interface StatusBadgeProps {
    status: boolean;
    onClick?: () => void;
}

export function StatusBadge({ status, onClick }: StatusBadgeProps) {
    const label = status ? 'Опубликован' : 'Черновик';

    if (onClick) {
        return (
            <button
                onClick={onClick}
                className='rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted/70'
            >
                {label}
            </button>
        );
    }

    return <span className='rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground'>{label}</span>;
}
