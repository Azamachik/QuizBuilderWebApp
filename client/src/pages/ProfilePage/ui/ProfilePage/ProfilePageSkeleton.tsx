import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

export function ProfilePageSkeleton() {
    return (
        <main className='min-h-[calc(100vh-3.5rem)] bg-background'>
            <div className='mx-auto max-w-5xl space-y-5 px-6 py-10'>
                {/* Profile header row */}
                <div className='flex items-start justify-between'>
                    <div className='flex items-center gap-5'>
                        {/* Avatar */}
                        <Skeleton className='h-24 w-24 shrink-0 rounded-2xl' />

                        {/* Name / email / date */}
                        <div className='space-y-2.5'>
                            <Skeleton className='h-7 w-52' />
                            <Skeleton className='h-4 w-40' />
                            <Skeleton className='h-6 w-56 rounded-lg' />
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className='flex shrink-0 items-center gap-2'>
                        <Skeleton className='h-9 w-36 rounded-4xl' />
                        <Skeleton className='h-9 w-9 rounded-4xl' />
                    </div>
                </div>

                {/* Stat cards */}
                <div className='grid grid-cols-5 gap-3'>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className='h-[88px] rounded-2xl' />
                    ))}
                </div>

                {/* Activity heatmap */}
                <Skeleton className='h-44 rounded-2xl' />
            </div>
        </main>
    );
}
