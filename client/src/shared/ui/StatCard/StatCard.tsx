import { cn } from '@/shared/lib/utils/utils'
import { Card } from '@/shared/ui/Card/Card'
import { Progress } from '@/shared/ui/Progress/Progress'

interface StatCardProps {
    value: string | number
    label: string
    highlight?: boolean
    progress?: number
}

function StatCard({ value, label, highlight = false, progress }: StatCardProps) {
    return (
        <Card className="flex flex-col gap-1.5 p-5">
            <span className={cn('text-4xl font-bold leading-none', highlight && 'text-action')}>
                {value}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                {label}
            </span>
            {progress !== undefined && <Progress value={progress} className="mt-1 h-1.5" />}
        </Card>
    )
}

export { StatCard }
export type { StatCardProps }
