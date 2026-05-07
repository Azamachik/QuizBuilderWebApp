import * as React from 'react'
import { Progress as ProgressPrimitive } from 'radix-ui'
import { cn } from '@/shared/lib/utils/utils'

interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
    value?: number
}

function Progress({ className, value = 0, ...props }: ProgressProps) {
    return (
        <ProgressPrimitive.Root
            data-slot="progress"
            className={cn('relative h-2 w-full overflow-hidden rounded-full bg-muted', className)}
            value={value}
            {...props}
        >
            <ProgressPrimitive.Indicator
                data-slot="progress-indicator"
                className="h-full bg-action transition-all duration-300 ease-in-out"
                style={{ transform: `translateX(-${100 - value}%)` }}
            />
        </ProgressPrimitive.Root>
    )
}

export { Progress }
