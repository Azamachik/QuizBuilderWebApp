import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import {
    QuizCard,
    QuizCardSkeleton,
    quizReducer,
    fetchQuizzes,
    toggleQuizStatus,
    deleteQuiz,
    getQuizzes,
    getQuizzesIsLoading
} from '@/entities/Quiz';
import type { Quiz } from '@/entities/Quiz';
import { CreateQuizModal } from '@/features/CreateQuiz';
import { EditQuizModal } from '@/features/EditQuiz';
import { CreateLinkModal } from '@/features/CreateLink';
import { getUserData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/helpers/hooks/useAppSelector/useAppSelector';
import { useDynamicModuleLoader } from '@/shared/lib/helpers/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import type { ReducersList } from '@/shared/lib/helpers/hooks/useDynamicModuleLoader/useDynamicModuleLoader';

const reducers: ReducersList = { quizzes: quizReducer };
const SKELETON_COUNT = 3;

export function QuizzesPageMobile() {
    useDynamicModuleLoader(reducers, false);

    const dispatch = useAppDispatch();
    const userData = useAppSelector(getUserData);
    const quizzes = useAppSelector(getQuizzes);
    const isLoading = useAppSelector(getQuizzesIsLoading);

    const [createOpen, setCreateOpen] = useState(false);
    const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
    const [linkQuiz, setLinkQuiz] = useState<Quiz | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (userData?.id) dispatch(fetchQuizzes(userData.id));
    }, [dispatch, userData?.id]);

    useEffect(() => {
        if (searchParams.get('create') === 'true') {
            setCreateOpen(true);
            setSearchParams({}, { replace: true });
        }
    }, [searchParams, setSearchParams]);

    function handleToggleStatus(quiz: Quiz) {
        dispatch(toggleQuizStatus({ id: quiz.id, isPublished: quiz.isPublished }));
    }

    function handleDelete(id: string) {
        dispatch(deleteQuiz(id));
    }

    function handleCreateLink(quiz: Quiz) {
        if (!quiz.isPublished) {
            toast.warning('Опубликуйте тест перед созданием ссылки');
            return;
        }
        setLinkQuiz(quiz);
    }

    return (
        <main className='min-h-[calc(100vh-3.5rem)] bg-background'>
            <div className='px-4 py-6'>
                {isLoading ? (
                    <div className='space-y-4'>
                        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                            <QuizCardSkeleton key={i} />
                        ))}
                    </div>
                ) : (
                    <div className='space-y-4'>
                        {quizzes.map((quiz) => (
                            <QuizCard
                                key={quiz.id}
                                quiz={quiz}
                                onEdit={setEditingQuiz}
                                onToggleStatus={handleToggleStatus}
                                onCreateLink={handleCreateLink}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}

                <button
                    onClick={() => setCreateOpen(true)}
                    className='mt-4 flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border py-12 transition-colors hover:border-action/50'
                >
                    <div className='flex h-12 w-12 items-center justify-center rounded-full bg-action'>
                        <Plus className='size-5 text-background' />
                    </div>
                    <span className='font-semibold'>Создать новый тест</span>
                </button>
            </div>

            <CreateQuizModal open={createOpen} onOpenChange={setCreateOpen} />
            <EditQuizModal
                quiz={editingQuiz}
                onOpenChange={(open) => {
                    if (!open) setEditingQuiz(null);
                }}
            />
            <CreateLinkModal
                quizId={linkQuiz?.id ?? ''}
                open={!!linkQuiz}
                onOpenChange={(open) => {
                    if (!open) setLinkQuiz(null);
                }}
            />
        </main>
    );
}
