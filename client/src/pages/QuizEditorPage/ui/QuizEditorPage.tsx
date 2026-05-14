import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Link2, Plus, Save, Send } from 'lucide-react';
import { toast } from 'sonner';
import { useIsMobile } from '@/shared/lib/helpers/hooks/useIsMobile/useIsMobile';
import { QuizEditorPageMobile } from './QuizEditorPage.mobile';
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
import { quizReducer, fetchQuizById, toggleQuizStatus, getCurrentQuiz, getCurrentQuizIsLoading } from '@/entities/Quiz';
import { CreateQuestionModal } from '@/features/CreateQuestion';
import type { QuestionFormData } from '@/features/CreateQuestion';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/helpers/hooks/useAppSelector/useAppSelector';
import { useDynamicModuleLoader } from '@/shared/lib/helpers/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import type { ReducersList } from '@/shared/lib/helpers/hooks/useDynamicModuleLoader/useDynamicModuleLoader';

const reducers: ReducersList = { quizzes: quizReducer, questions: questionReducer };

export default function QuizEditorPage() {
    const isMobile = useIsMobile();
    if (isMobile) return <QuizEditorPageMobile />;
    return <QuizEditorPageDesktop />;
}

function QuizEditorPageDesktop() {
    useDynamicModuleLoader(reducers, false);

    const { id: quizId = '' } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    const currentQuiz = useAppSelector(getCurrentQuiz);
    const quizIsLoading = useAppSelector(getCurrentQuizIsLoading);
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
        <div className='min-h-screen bg-background pb-24'>
            <div className='mx-auto max-w-4xl px-6 py-8'>
                <div className='mb-8 rounded-3xl border border-border bg-card p-6'>
                    {isLoading ? (
                        <div className='space-y-2'>
                            <div className='h-8 w-1/2 animate-pulse rounded-lg bg-muted' />
                            <div className='h-4 w-3/4 animate-pulse rounded-lg bg-muted' />
                        </div>
                    ) : (
                        <>
                            <h1 className='mb-2 text-3xl font-bold'>{currentQuiz?.title ?? '—'}</h1>
                            <p className='text-sm text-muted-foreground'>{currentQuiz?.description}</p>
                        </>
                    )}
                </div>

                <div className='space-y-4'>
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
                        className='flex h-auto w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border py-10 hover:border-action/50 hover:bg-transparent'
                        onClick={() => setCreateOpen(true)}
                    >
                        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-action'>
                            <Plus className='size-5 text-action-foreground' />
                        </div>
                        <span className='font-semibold'>Добавить новый вопрос</span>
                        <span className='text-xs text-muted-foreground'>Или выберите другой тип контента</span>
                    </Button>
                </div>
            </div>

            <div className='fixed bottom-0 left-0 right-0 flex items-center justify-center gap-3 border-t border-border bg-card px-6 py-3'>
                <Button variant='outline' className='gap-2' onClick={handleSave} disabled={isSaving}>
                    <Save className='size-4' />
                    {isSaving ? 'Сохранение...' : 'Сохранить'}
                </Button>
                <Button variant='outline' className='gap-2' onClick={() => setLinkOpen(true)}>
                    <Link2 className='size-4' /> Создать ссылку
                </Button>
                <Button variant='action' className='gap-2' onClick={handlePublish} disabled={!currentQuiz}>
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
