import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronLeft, ChevronRight, ClipboardList } from 'lucide-react';
import { Button } from '@/shared/ui/Button/Button';
import { useDynamicModuleLoader } from '@/shared/lib/helpers/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import type { ReducersList } from '@/shared/lib/helpers/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/helpers/hooks/useAppSelector/useAppSelector';
import {
    inviteLinkReducer,
    fetchSessionByToken,
    getTakingSession,
    getTakingSessionIsLoading,
    getTakingSessionError
} from '@/entities/InviteLink';
import { attemptReducer, submitAttempt, setSessionQuestions, getAttemptIsSubmitting } from '@/entities/Attempt';
import type { Question, Option } from '@/entities/Question';
import type { AttemptAnswer } from '@/entities/Attempt';
import { RoutePath, AppRoutes } from '@/shared/config/routeConfig/routeConfig';
import { ToggleTheme } from '@/features/ToggleTheme';
// import './QuizTakingPage.css';

const reducers: ReducersList = { inviteLink: inviteLinkReducer, attempt: attemptReducer };

type Answers = Record<string, string[]>;

export default function QuizTakingPage() {
    useDynamicModuleLoader(reducers, false);

    const { token = '' } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const session = useAppSelector(getTakingSession);
    const isLoading = useAppSelector(getTakingSessionIsLoading);
    const error = useAppSelector(getTakingSessionError);
    const isSubmitting = useAppSelector(getAttemptIsSubmitting);

    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [answers, setAnswers] = React.useState<Answers>({});
    const [phase, setPhase] = React.useState<'taking' | 'complete'>('taking');
    const [requiredWarning, setRequiredWarning] = React.useState(false);

    React.useEffect(() => {
        if (token) dispatch(fetchSessionByToken(token));
    }, [dispatch, token]);

    const questions = session?.questions ?? [];
    const currentQuestion = questions[currentIndex];
    const totalCount = questions.length;
    const answeredCount = Object.keys(answers).length;

    function handleSingleSelect(question: Question, optionId: string) {
        setRequiredWarning(false);
        setAnswers((prev) => ({ ...prev, [question.id]: [optionId] }));
    }

    function handleMultiSelect(question: Question, optionId: string) {
        setRequiredWarning(false);
        setAnswers((prev) => {
            const current = prev[question.id] ?? [];
            const next = current.includes(optionId) ? current.filter((id) => id !== optionId) : [...current, optionId];
            return { ...prev, [question.id]: next };
        });
    }

    function handleTextAnswer(question: Question, value: string) {
        setRequiredWarning(false);
        setAnswers((prev) => ({ ...prev, [question.id]: [value] }));
    }

    function handleNext() {
        const q = questions[currentIndex];
        if (q?.required) {
            const answered = answers[q.id];
            const isEmpty = !answered || answered.length === 0 || (q.type === 'text' && !answered[0]?.trim());
            if (isEmpty) {
                setRequiredWarning(true);
                return;
            }
        }
        setRequiredWarning(false);
        if (currentIndex < totalCount - 1) {
            setCurrentIndex((i) => i + 1);
        } else {
            setPhase('complete');
        }
    }

    function handleBack() {
        setRequiredWarning(false);
        if (currentIndex > 0) setCurrentIndex((i) => i - 1);
    }

    async function handleSubmit() {
        if (!session) return;
        const { inviteLink, quiz } = session;

        const attemptAnswers: AttemptAnswer[] = questions.map((q) => {
            const selected = answers[q.id] ?? [];
            if (q.type === 'text') {
                return { questionId: q.id, selectedOptionIds: [], textAnswer: selected[0] ?? '' };
            }
            return { questionId: q.id, selectedOptionIds: selected };
        });

        const correctCount = questions.reduce((acc, q) => {
            if (q.type === 'text') return acc;
            const selected = new Set(answers[q.id] ?? []);
            const correct = new Set(q.options.filter((o: Option) => o.isCorrect).map((o: Option) => o.id));
            const isCorrect = selected.size === correct.size && [...correct].every((id) => selected.has(id));
            return acc + (isCorrect ? 1 : 0);
        }, 0);

        const scorableCount = questions.filter((q) => q.type !== 'text').length;

        const result = await dispatch(
            submitAttempt({
                quizId: quiz.id,
                quizTitle: quiz.title,
                inviteLinkToken: inviteLink.token,
                answers: attemptAnswers,
                score: correctCount,
                total: scorableCount,
                label: inviteLink.label,
                completedAt: new Date().toISOString()
            })
        );

        if (submitAttempt.fulfilled.match(result)) {
            dispatch(setSessionQuestions(questions));
            navigate(RoutePath[AppRoutes.QUIZ_RESULTS].replace(':token', token).replace(':attemptId', result.payload.id));
        }
    }

    if (isLoading) {
        return (
            <div className='flex min-h-screen items-center justify-center bg-background'>
                <div className='fixed top-4 right-4 z-50'><ToggleTheme /></div>
                <div className='w-full max-w-2xl space-y-4 px-6'>
                    <div className='h-6 w-1/3 animate-pulse rounded-lg bg-muted' />
                    <div className='h-48 animate-pulse rounded-3xl bg-muted' />
                    <div className='h-12 animate-pulse rounded-2xl bg-muted' />
                    <div className='h-12 animate-pulse rounded-2xl bg-muted' />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center'>
                <div className='fixed top-4 right-4 z-50'><ToggleTheme /></div>
                <ClipboardList className='size-12 text-muted-foreground' />
                <h1 className='text-2xl font-bold'>Тест недоступен</h1>
                <p className='text-muted-foreground'>{error}</p>
            </div>
        );
    }

    if (!session) return null;

    if (questions.length === 0) {
        return (
            <div className='flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center'>
                <div className='fixed top-4 right-4 z-50'><ToggleTheme /></div>
                <ClipboardList className='size-12 text-muted-foreground' />
                <h1 className='text-2xl font-bold'>{session.quiz.title}</h1>
                <p className='text-muted-foreground'>В этом тесте пока нет вопросов.</p>
            </div>
        );
    }

    if (phase === 'complete') {
        return (
            <div className='flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6'>
                <div className='fixed top-4 right-4 z-50'><ToggleTheme /></div>
                <div className='flex flex-col items-center gap-4 text-center'>
                    <div className='flex h-20 w-20 items-center justify-center rounded-full bg-action/10'>
                        <CheckCircle2 className='size-10 text-action' />
                    </div>
                    <h1 className='text-3xl font-bold'>Вы ответили на все вопросы!</h1>
                    <p className='max-w-md text-muted-foreground'>
                        Отправьте результаты, чтобы узнать свой счёт, или проверьте ответы прямо сейчас.
                    </p>
                    <p className='text-sm text-muted-foreground'>
                        Отвечено: {answeredCount} из {totalCount}
                    </p>
                </div>
                <div className='flex w-full max-w-sm flex-col gap-3'>
                    <Button
                        variant='action'
                        className='h-12 rounded-2xl text-base font-semibold'
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Отправляем...' : 'Отправить результаты'}
                    </Button>
                    <Button variant='outline' className='h-12 rounded-2xl text-base' onClick={handleSubmit} disabled={isSubmitting}>
                        Проверить ответы
                    </Button>
                    <Button
                        variant='ghost'
                        className='text-muted-foreground'
                        onClick={() => {
                            setPhase('taking');
                            setCurrentIndex(totalCount - 1);
                        }}
                    >
                        Вернуться к вопросам
                    </Button>
                </div>
            </div>
        );
    }

    const selected = answers[currentQuestion?.id] ?? [];

    return (
        <div className='flex min-h-screen flex-col bg-background'>
            <div className='border-b border-border bg-card px-4 py-4 md:px-6'>
                <div className='mx-auto max-w-2xl'>
                    <div className='flex items-center justify-between'>
                        <p className='text-sm text-muted-foreground'>{session.quiz.title}</p>
                        <ToggleTheme />
                    </div>
                    <div className='mt-2 flex items-center gap-2'>
                        <div className='h-1.5 flex-1 overflow-hidden rounded-full bg-muted'>
                            <div
                                className='h-full rounded-full bg-action transition-all duration-300'
                                style={{ width: `${((currentIndex + 1) / totalCount) * 100}%` }}
                            />
                        </div>
                        <span className='text-xs text-muted-foreground'>
                            {currentIndex + 1} / {totalCount}
                        </span>
                    </div>
                </div>
            </div>

            <div className='flex flex-1 flex-col'>
                <div className='mx-auto w-full max-w-2xl flex-1 px-4 py-6 md:px-6 md:py-8'>
                    {requiredWarning && (
                        <div className='mb-4 flex items-center gap-2 rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive'>
                            Этот вопрос обязателен — пожалуйста, ответьте перед продолжением.
                        </div>
                    )}

                    <div className={`mb-8 rounded-3xl border bg-card p-6 ${requiredWarning ? 'border-destructive/50' : 'border-border'}`}>
                        <p className='mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground'>
                            Вопрос {currentIndex + 1}
                        </p>
                        <h2 className='text-xl font-semibold leading-snug'>{currentQuestion.text}</h2>
                        {currentQuestion.required && <span className='mt-1 inline-block text-xs text-destructive'>* Обязательный</span>}
                    </div>

                    <div className='space-y-3'>
                        {currentQuestion.type === 'text' ? (
                            <textarea
                                className='w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none ring-action focus:ring-2'
                                rows={4}
                                placeholder='Введите ваш ответ...'
                                value={selected[0] ?? ''}
                                onChange={(e) => handleTextAnswer(currentQuestion, e.target.value)}
                            />
                        ) : (
                            currentQuestion.options.map((option: Option) => {
                                const isSelected = selected.includes(option.id);
                                return (
                                    <button
                                        key={option.id}
                                        type='button'
                                        onClick={() =>
                                            currentQuestion.type === 'single'
                                                ? handleSingleSelect(currentQuestion, option.id)
                                                : handleMultiSelect(currentQuestion, option.id)
                                        }
                                        className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-sm font-medium transition-colors ${
                                            isSelected
                                                ? 'border-action bg-action/10 text-action'
                                                : 'border-border bg-card hover:border-action/50 hover:bg-muted/50'
                                        }`}
                                    >
                                        <span
                                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                                                isSelected ? 'border-action bg-action' : 'border-muted-foreground'
                                            } ${currentQuestion.type === 'multiple' ? 'rounded-md' : 'rounded-full'}`}
                                        >
                                            {isSelected && <span className='block h-2 w-2 rounded-full bg-white' />}
                                        </span>
                                        {option.text}
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>

            <div className='sticky bottom-0 z-10 border-t border-border bg-card px-4 py-4 md:px-6'>
                <div className='mx-auto flex max-w-2xl items-center justify-between gap-3'>
                    <Button variant='outline' className='gap-2 rounded-xl' onClick={handleBack} disabled={currentIndex === 0}>
                        <ChevronLeft className='size-4' /> Назад
                    </Button>
                    <Button variant='action' className='bg-action gap-2 rounded-xl px-6' onClick={handleNext}>
                        {currentIndex < totalCount - 1 ? (
                            <>
                                Далее <ChevronRight className='size-4' />
                            </>
                        ) : (
                            'Завершить'
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
