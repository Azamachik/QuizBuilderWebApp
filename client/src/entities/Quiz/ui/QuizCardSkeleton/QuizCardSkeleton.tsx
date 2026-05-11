import { Card } from '@/shared/ui/Card/Card';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

export function QuizCardSkeleton() {
    return (
        <Card className='flex flex-col p-5'>
            <div className='flex items-center justify-between'>
                <Skeleton className='h-10 w-10 rounded-xl' />
                <Skeleton className='h-6 w-24 rounded-full' />
            </div>

            <div className='mt-5 flex-1 space-y-2'>
                <Skeleton className='h-5 w-3/4' />
                <Skeleton className='h-4 w-1/3' />
            </div>

            <div className='mt-6 flex items-center justify-between'>
                <Skeleton className='h-4 w-20' />
                <div className='flex items-center gap-1.5'>
                    <Skeleton className='h-8 w-8 rounded-xl' />
                    <Skeleton className='h-8 w-8 rounded-xl' />
                </div>
            </div>
        </Card>
    );
}
