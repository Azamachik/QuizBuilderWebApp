import { ArrowRight, ClipboardList, Users } from 'lucide-react'
import { Card } from '@/shared/ui/Card/Card'
import { StatusBadge } from './StatusBadge'
import type { Quiz } from '../types'

export function QuizRow({ quiz }: { quiz: Quiz }) {
    return (
        <Card className="flex items-center gap-4 px-5 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-action/10">
                <ClipboardList className="size-5 text-action" />
            </div>

            <div className="min-w-0 flex-1">
                <p className="font-semibold leading-snug">{quiz.title}</p>
                <p className="text-sm text-muted-foreground">{quiz.date}</p>
            </div>

            <StatusBadge status={quiz.status} />

            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Users className="size-4 shrink-0" />
                <span>{quiz.participants.toLocaleString('ru-RU')}</span>
            </div>

            <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-action/10 text-action transition-colors hover:bg-action/20">
                <ArrowRight className="size-4" />
            </button>
        </Card>
    )
}
