import { useState } from 'react'
import { LayoutGrid, List, Plus } from 'lucide-react'
import { cn } from '@/shared/lib/utils/utils'
import { QuizCard } from './QuizCard'
import { QuizRow } from './QuizRow'
import { CreateTestModal } from './CreateTestModal'
import type { Quiz } from '../model/types/Quiz'

type View = 'grid' | 'list'

const INITIAL_QUIZZES: Quiz[] = [
    { id: '1', title: 'UX/UI Best Practices Quiz', description: '', status: 'published', date: '12.10.2023', participants: 1240 },
    { id: '2', title: 'Design System Audit', description: '', status: 'draft', date: '12.10.2023', participants: 45 },
    { id: '3', title: 'Figma Shortcuts Masterclass', description: '', status: 'draft', date: '12.10.2023', participants: 389 },
]

export default function QuizzesPage() {
    const [view, setView] = useState<View>('grid')
    const [quizzes, setQuizzes] = useState<Quiz[]>(INITIAL_QUIZZES)
    const [createOpen, setCreateOpen] = useState(false)

    function handleCreate(data: Pick<Quiz, 'title' | 'description' | 'status'>) {
        const newQuiz: Quiz = {
            ...data,
            id: crypto.randomUUID(),
            date: new Date().toLocaleDateString('ru-RU'),
            participants: 0,
        }
        setQuizzes(prev => [...prev, newQuiz])
    }

    return (
        <main className="min-h-[calc(100vh-3.5rem)] bg-background">
            <div className="mx-auto max-w-5xl px-6 py-10">

                {/* View toggle */}
                <div className="mb-6 inline-flex rounded-xl border border-border bg-muted p-1">
                    <button
                        onClick={() => setView('grid')}
                        className={cn(
                            'rounded-lg p-2 transition-colors',
                            view === 'grid'
                                ? 'bg-card text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                        )}
                    >
                        <LayoutGrid className="size-4" />
                    </button>
                    <button
                        onClick={() => setView('list')}
                        className={cn(
                            'rounded-lg p-2 transition-colors',
                            view === 'list'
                                ? 'bg-card text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                        )}
                    >
                        <List className="size-4" />
                    </button>
                </div>

                {/* Quizzes */}
                {view === 'grid' ? (
                    <div className="grid grid-cols-3 gap-4">
                        {quizzes.map(quiz => (
                            <QuizCard key={quiz.id} quiz={quiz} />
                        ))}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {quizzes.map(quiz => (
                            <QuizRow key={quiz.id} quiz={quiz} />
                        ))}
                    </div>
                )}

                {/* Create new test */}
                <button
                    onClick={() => setCreateOpen(true)}
                    className="mt-4 flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border py-14 transition-colors hover:border-action/50"
                >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-action">
                        <Plus className="size-5 text-action-foreground" />
                    </div>
                    <span className="font-semibold">Создать новый тест</span>
                </button>
            </div>

            <CreateTestModal
                open={createOpen}
                onOpenChange={setCreateOpen}
                onCreate={handleCreate}
            />
        </main>
    )
}
