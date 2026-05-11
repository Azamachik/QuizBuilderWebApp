import { Card } from '@/shared/ui/Card/Card';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

export function QuizRowSkeleton() {
    return (
        <Card className='flex items-center gap-4 px-5 py-4'>
            <Skeleton className='h-10 w-10 shrink-0 rounded-xl' />
            <div className='min-w-0 flex-1 space-y-1.5'>
                <Skeleton className='h-4 w-1/2' />
                <Skeleton className='h-3 w-1/4' />
            </div>
            <Skeleton className='h-6 w-24 rounded-full' />
            <Skeleton className='h-4 w-16' />
            <Skeleton className='h-8 w-8 shrink-0 rounded-xl' />
            <Skeleton className='h-8 w-8 shrink-0 rounded-xl' />
        </Card>
    );
}
