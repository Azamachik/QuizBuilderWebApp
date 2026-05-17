import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link2, Plus, Save, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/shared/ui/Button/Button';
import { useDragSort } from '@/features/DragSort';
import { CreateLinkModal } from '@/features/CreateLink';
import {
    QuestionCard,
    questionReducer,
    reorderQuestions,
    addQuestionToForm,
    updateQuestionInForm,
    removeQuestionFromForm,
    fetchQuestions,
    saveQuestions,
    getQuestions,
    getQuestionsIsLoading,
    getQuestionsIsSaving
} from '@/entities/Question';
import type { Question } from '@/entities/Question';
import { quizReducer, fetchQuizById, toggleQuizStatus, getCurrentQuiz, getCurrentQuizIsLoading, getCurrentQuizError } from '@/entities/Quiz';
import { CreateQuestionModal } from '@/features/CreateQuestion';
import type { QuestionFormData } from '@/features/CreateQuestion';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/helpers/hooks/useAppSelector/useAppSelector';
import { useDynamicModuleLoader } from '@/shared/lib/helpers/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import type { ReducersList } from '@/shared/lib/helpers/hooks/useDynamicModuleLoader/useDynamicModuleLoader';

const reducers: ReducersList = { quizzes: quizReducer, questions: questionReducer };

export function QuizEditorPageMobile() {
    useDynamicModuleLoader(reducers, false);

    const { id: quizId = '' } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const currentQuiz = useAppSelector(getCurrentQuiz);
    const quizIsLoading = useAppSelector(getCurrentQuizIsLoading);
    const quizError = useAppSelector(getCurrentQuizError);
    const questions = useAppSelector(getQuestions);
    const questionsLoading = useAppSelector(getQuestionsIsLoading);
    const isSaving = useAppSelector(getQuestionsIsSaving);

    const [createOpen, setCreateOpen] = React.useState(false);
    const [editingQuestion, setEditingQuestion] = React.useState<Question | null>(null);
    const [linkOpen, setLinkOpen] = React.useState(false);

    React.useEffect(() => {
        if (quizId) {
            dispatch(fetchQuizById(quizId));
            dispatch(fetchQuestions(quizId));
        }
    }, [dispatch, quizId]);

    React.useEffect(() => {
        if (quizError) navigate('/not-found', { replace: true });
    }, [quizError, navigate]);

    const sorted = [...questions].sort((a, b) => a.order - b.order);

    const { draggingId, getDragHandlers } = useDragSort(sorted, (reordered) => {
        dispatch(reorderQuestions(reordered));
    });

    function handleCreate(data: QuestionFormData) {
        dispatch(
            addQuestionToForm({
                ...data,
                id: `temp_${Date.now()}`,
                quizId,
                order: questions.length + 1
            })
        );
    }

    function handleUpdate(id: string, data: QuestionFormData) {
        dispatch(updateQuestionInForm({ id, data }));
        setEditingQuestion(null);
    }

    function handleDelete(id: string) {
        dispatch(removeQuestionFromForm(id));
    }

    function handleDuplicate(id: string) {
        const src = [...questions].sort((a, b) => a.order - b.order).find((q) => q.id === id);
        if (!src) return;
        const { id: _id, ...rest } = src;
        dispatch(addQuestionToForm({ ...rest, id: `temp_${Date.now()}`, quizId, order: questions.length + 1 }));
    }

    function handleToggleRequired(id: string) {
        const q = questions.find((q) => q.id === id);
        if (!q) return;
        dispatch(updateQuestionInForm({ id, data: { required: !q.required } }));
    }

    async function handleSave() {
        const result = await dispatch(saveQuestions(quizId));
        if (saveQuestions.fulfilled.match(result)) {
            toast.success('Изменения сохранены');
        } else {
            toast.error('Ошибка при сохранении');
        }
    }

    async function handlePublish() {
        if (!currentQuiz) return;
        const result = await dispatch(toggleQuizStatus({ id: currentQuiz.id, isPublished: currentQuiz.isPublished }));
        if (toggleQuizStatus.fulfilled.match(result)) {
            const nowPublished = !currentQuiz.isPublished;
            toast.success(nowPublished ? 'Тест опубликован' : 'Тест снят с публикации');
        } else {
            toast.error('Ошибка смены статуса');
        }
    }

    const isLoading = quizIsLoading || questionsLoading;

    return (
        <div className='min-h-screen bg-background pb-32'>
            <div className='px-4 py-5'>
                {/* Quiz header */}
                <div className='mb-6 rounded-2xl border border-border bg-card p-4'>
                    {isLoading ? (
                        <div className='space-y-2'>
                            <div className='h-6 w-2/3 animate-pulse rounded-lg bg-muted' />
                            <div className='h-4 w-full animate-pulse rounded-lg bg-muted' />
                        </div>
                    ) : (
                        <>
                            <h1 className='mb-1 text-xl font-bold leading-snug'>{currentQuiz?.title ?? '—'}</h1>
                            <p className='text-sm text-muted-foreground'>{currentQuiz?.description}</p>
                        </>
                    )}
                </div>

                {/* Questions */}
                <div className='space-y-3'>
                    {sorted.map((q, index) => (
                        <QuestionCard
                            key={q.id}
                            question={q}
                            isDragging={draggingId === q.id}
                            isEditing={editingQuestion?.id === q.id}
                            onDelete={handleDelete}
                            onDuplicate={handleDuplicate}
                            onToggleRequired={handleToggleRequired}
                            onEdit={setEditingQuestion}
                            {...getDragHandlers(index, q.id)}
                        />
                    ))}

                    <Button
                        variant='ghost'
                        className='flex h-auto w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border py-8 hover:border-action/50 hover:bg-transparent'
                        onClick={() => setCreateOpen(true)}
                    >
                        <div className='flex h-9 w-9 items-center justify-center rounded-full bg-action'>
                            <Plus className='size-4 text-action-foreground' />
                        </div>
                        <span className='text-sm font-semibold'>Добавить вопрос</span>
                    </Button>
                </div>
            </div>

            {/* Fixed bottom bar — two rows on mobile */}
            <div className='fixed bottom-0 left-0 right-0 border-t border-border bg-card px-4 py-3'>
                <div className='mb-2 flex gap-2'>
                    <Button variant='outline' className='flex-1 gap-1.5 text-xs' onClick={handleSave} disabled={isSaving}>
                        <Save className='size-3.5' />
                        {isSaving ? 'Сохраняем...' : 'Сохранить'}
                    </Button>
                    <Button
                        variant='outline'
                        className={`flex-1 gap-1.5 text-xs${!currentQuiz?.isPublished ? ' opacity-50' : ''}`}
                        onClick={() => {
                            if (!currentQuiz?.isPublished) {
                                toast.warning('Опубликуйте тест перед созданием ссылки');
                                return;
                            }
                            setLinkOpen(true);
                        }}
                    >
                        <Link2 className='size-3.5' /> Создать ссылку
                    </Button>
                </div>
                <Button variant='action' className='w-full gap-2' onClick={handlePublish} disabled={!currentQuiz}>
                    <Send className='size-4' />
                    {currentQuiz?.isPublished ? 'Снять с публикации' : 'Опубликовать'}
                </Button>
            </div>

            <CreateQuestionModal open={createOpen} onOpenChange={setCreateOpen} onSave={handleCreate} />
            <CreateQuestionModal
                open={!!editingQuestion}
                onOpenChange={(open) => {
                    if (!open) setEditingQuestion(null);
                }}
                onSave={(data: QuestionFormData) => {
                    if (!editingQuestion) return;
                    handleUpdate(editingQuestion.id, data);
                }}
                initialData={editingQuestion ? (({ id: _id, quizId: _qid, order: _ord, ...rest }) => rest)(editingQuestion) : undefined}
                title='Редактировать вопрос'
            />
            <CreateLinkModal quizId={quizId} open={linkOpen} onOpenChange={setLinkOpen} />
        </div>
    );
}
