import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LayoutGrid, List, Plus } from 'lucide-react';
import { cn } from '@/shared/lib/utils/utils';
import { QuizCard, QuizRow } from '@/entities/Quiz';
import type { Quiz } from '@/entities/Quiz';
import { CreateQuizModal } from '@/features/CreateQuiz';
import { EditQuizModal } from '@/features/EditQuiz';

type View = 'grid' | 'list';

const INITIAL_QUIZZES: Quiz[] = [
    { id: '1', title: 'UX/UI Best Practices Quiz', description: '', status: 'published', date: '12.10.2023', participants: 1240 },
    { id: '2', title: 'Design System Audit', description: '', status: 'draft', date: '12.10.2023', participants: 45 },
    { id: '3', title: 'Figma Shortcuts Masterclass', description: '', status: 'draft', date: '12.10.2023', participants: 389 }
];

export default function QuizzesPage() {
    const [view, setView] = useState<View>('grid');
    const [quizzes, setQuizzes] = useState<Quiz[]>(INITIAL_QUIZZES);
    const [createOpen, setCreateOpen] = useState(false);
    const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get('create') === 'true') {
            setCreateOpen(true);
            setSearchParams({}, { replace: true });
        }
    }, [searchParams, setSearchParams]);

    function handleCreate(data: Pick<Quiz, 'title' | 'description' | 'status'>) {
        const newQuiz: Quiz = {
            ...data,
            id: crypto.randomUUID(),
            date: new Date().toLocaleDateString('ru-RU'),
            participants: 0
        };
        setQuizzes((prev) => [...prev, newQuiz]);
    }

    function handleUpdate(data: Pick<Quiz, 'title' | 'description' | 'status'>) {
        if (!editingQuiz) return;
        setQuizzes((prev) => prev.map((q) => (q.id === editingQuiz.id ? { ...q, ...data } : q)));
        setEditingQuiz(null);
    }

    return (
        <main className='min-h-[calc(100vh-3.5rem)] bg-background'>
            <div className='mx-auto max-w-5xl px-6 py-10'>
                <div className='mb-6 inline-flex rounded-xl border border-border bg-muted p-1'>
                    <button
                        onClick={() => setView('grid')}
                        className={cn(
                            'rounded-lg p-2 transition-colors',
                            view === 'grid' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                        )}
                    >
                        <LayoutGrid className='size-4' />
                    </button>
                    <button
                        onClick={() => setView('list')}
                        className={cn(
                            'rounded-lg p-2 transition-colors',
                            view === 'list' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                        )}
                    >
                        <List className='size-4' />
                    </button>
                </div>

                {view === 'grid' ? (
                    <div className='grid grid-cols-3 gap-4'>
                        {quizzes.map((quiz) => (
                            <QuizCard key={quiz.id} quiz={quiz} onEdit={setEditingQuiz} />
                        ))}
                    </div>
                ) : (
                    <div className='space-y-3'>
                        {quizzes.map((quiz) => (
                            <QuizRow key={quiz.id} quiz={quiz} onEdit={setEditingQuiz} />
                        ))}
                    </div>
                )}

                <button
                    onClick={() => setCreateOpen(true)}
                    className='mt-4 flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border py-14 transition-colors hover:border-action/50'
                >
                    <div className='flex h-12 w-12 items-center justify-center rounded-full bg-action'>
                        <Plus className='size-5 text-background' />
                    </div>
                    <span className='font-semibold'>Создать новый тест</span>
                </button>
            </div>

            <CreateQuizModal open={createOpen} onOpenChange={setCreateOpen} onCreate={handleCreate} />
            <EditQuizModal
                quiz={editingQuiz}
                onOpenChange={(open) => {
                    if (!open) setEditingQuiz(null);
                }}
                onSave={handleUpdate}
            />
        </main>
    );
}
