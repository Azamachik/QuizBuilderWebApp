import { cn } from '@/shared/lib/utils/utils';

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div className={cn('animate-pulse rounded-lg bg-muted', className)} />
    );
}
