import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, RotateCcw, ClipboardList, ChevronDown, Home, AlertCircle } from 'lucide-react';
import { Button } from '@/shared/ui/Button/Button';
import { useDynamicModuleLoader } from '@/shared/lib/helpers/hooks/useDynamicModuleLoader';
import type { ReducersList } from '@/shared/lib/helpers/hooks/useDynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/helpers/hooks/useAppSelector';
import {
    inviteLinkReducer,
    fetchSessionByToken,
    getTakingSession,
    getTakingSessionIsLoading,
} from '@/entities/InviteLink';
import {
    attemptReducer,
    fetchAttemptById,
    getCurrentAttempt,
    getAttemptIsLoading,
    getAttemptSessionQuestions,
} from '@/entities/Attempt';
import type { Question, Option } from '@/entities/Question';
import { RoutePath, AppRoutes } from '@/shared/config/routeConfig/routeConfig';

const reducers: ReducersList = { inviteLink: inviteLinkReducer, attempt: attemptReducer };

export default function QuizResultsPage() {
    useDynamicModuleLoader(reducers, false);

    const { token = '', attemptId = '' } = useParams<{ token: string; attemptId: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const session = useAppSelector(getTakingSession);
    const sessionLoading = useAppSelector(getTakingSessionIsLoading);
    const attempt = useAppSelector(getCurrentAttempt);
    const attemptLoading = useAppSelector(getAttemptIsLoading);
    // Questions snapshotted at submission time — always available after taking the quiz
    const sessionQuestions = useAppSelector(getAttemptSessionQuestions);

    const [expandedExplanations, setExpandedExplanations] = React.useState<Set<string>>(new Set());
    const [retryBlocked, setRetryBlocked] = React.useState(false);

    React.useEffect(() => {
        if (token && !session) dispatch(fetchSessionByToken(token));
        if (attemptId) dispatch(fetchAttemptById(attemptId));
    }, [dispatch, token, attemptId]); // eslint-disable-line react-hooks/exhaustive-deps

    function toggleExplanation(questionId: string) {
        setExpandedExplanations((prev) => {
            const next = new Set(prev);
            next.has(questionId) ? next.delete(questionId) : next.add(questionId);
            return next;
        });
    }

    function handleRetry() {
        const link = session?.inviteLink;
        const exhausted =
            link?.maxUses !== null &&
            link?.maxUses !== undefined &&
            (link?.usedCount ?? 0) >= link.maxUses;

        if (exhausted) {
            setRetryBlocked(true);
            return;
        }
        navigate(RoutePath[AppRoutes.QUIZ_TAKING].replace(':token', token));
    }

    const isLoading = sessionLoading || attemptLoading;

    if (isLoading) {
        return (
            <div className='flex min-h-screen items-center justify-center bg-background'>
                <div className='w-full max-w-2xl space-y-4 px-6'>
                    <div className='h-32 animate-pulse rounded-3xl bg-muted' />
                    <div className='h-24 animate-pulse rounded-3xl bg-muted' />
                    <div className='h-24 animate-pulse rounded-3xl bg-muted' />
                </div>
            </div>
        );
    }

    if (!attempt) {
        return (
            <div className='flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center'>
                <ClipboardList className='size-12 text-muted-foreground' />
                <h1 className='text-2xl font-bold'>Результаты не найдены</h1>
                <Button variant='outline' className='gap-2' onClick={() => navigate('/')}>
                    <Home className='size-4' /> На главную
                </Button>
            </div>
        );
    }

    const percentage = attempt.total > 0 ? Math.round((attempt.score / attempt.total) * 100) : 0;

    // Prefer snapshotted questions (always available after taking), fall back to live session
    const questions: Question[] = sessionQuestions.length > 0 ? sessionQuestions : (session?.questions ?? []);

    const feedbackText =
        percentage >= 80
            ? 'Отличный результат!'
            : percentage >= 50
              ? 'Хороший результат!'
              : 'Есть над чем поработать';

    return (
        <div className='min-h-screen bg-background pb-16'>
            {/* Score card */}
            <div className='border-b border-border bg-card'>
                <div className='mx-auto max-w-2xl px-4 py-8 text-center md:px-6 md:py-10'>
                    <p className='mb-1 text-sm text-muted-foreground'>{attempt.quizTitle}</p>
                    <div className='relative mx-auto mb-4 flex h-32 w-32 items-center justify-center'>
                        <svg className='-rotate-90' viewBox='0 0 100 100' width='128' height='128'>
                            <circle cx='50' cy='50' r='42' fill='none' stroke='hsl(var(--muted))' strokeWidth='10' />
                            <circle
                                cx='50' cy='50' r='42'
                                fill='none'
                                stroke='hsl(var(--action))'
                                strokeWidth='10'
                                strokeLinecap='round'
                                strokeDasharray={`${2 * Math.PI * 42}`}
                                strokeDashoffset={`${2 * Math.PI * 42 * (1 - percentage / 100)}`}
                                className='transition-all duration-700'
                            />
                        </svg>
                        <span className='absolute text-3xl font-bold'>{percentage}%</span>
                    </div>
                    <h1 className='text-2xl font-bold'>{feedbackText}</h1>
                    <p className='mt-1 text-muted-foreground'>
                        Правильно: {attempt.score} из {attempt.total}
                    </p>
                </div>
            </div>

            {/* Answer breakdown */}
            {questions.length > 0 && (
                <div className='mx-auto max-w-2xl space-y-4 px-4 py-6 md:px-6 md:py-8'>
                    <h2 className='text-lg font-semibold'>Разбор ответов</h2>
                    {questions.map((q: Question, idx: number) => {
                        const answerRecord = attempt.answers.find((a) => a.questionId === q.id);
                        const selectedIds = new Set(answerRecord?.selectedOptionIds ?? []);
                        const isExpanded = expandedExplanations.has(q.id);

                        if (q.type === 'text') {
                            return (
                                <div key={q.id} className='rounded-3xl border border-border bg-card p-5'>
                                    <p className='mb-1 text-xs text-muted-foreground'>Вопрос {idx + 1}</p>
                                    <p className='mb-3 font-semibold'>{q.text}</p>
                                    <div className='rounded-xl bg-muted px-4 py-3 text-sm'>
                                        {answerRecord?.textAnswer || (
                                            <span className='text-muted-foreground'>Без ответа</span>
                                        )}
                                    </div>
                                    {q.explanation && (
                                        <ExplanationToggle
                                            isExpanded={isExpanded}
                                            onToggle={() => toggleExplanation(q.id)}
                                            text={q.explanation}
                                        />
                                    )}
                                </div>
                            );
                        }

                        const correctIds = new Set(
                            q.options.filter((o: Option) => o.isCorrect).map((o: Option) => o.id),
                        );
                        const isQuestionCorrect =
                            selectedIds.size === correctIds.size &&
                            [...correctIds].every((id) => selectedIds.has(id));

                        return (
                            <div
                                key={q.id}
                                className={`rounded-3xl border bg-card p-5 ${
                                    isQuestionCorrect ? 'border-emerald-500/40' : 'border-destructive/40'
                                }`}
                            >
                                <div className='mb-3 flex items-start gap-3'>
                                    {isQuestionCorrect ? (
                                        <CheckCircle2 className='mt-0.5 size-5 shrink-0 text-emerald-500' />
                                    ) : (
                                        <XCircle className='mt-0.5 size-5 shrink-0 text-destructive' />
                                    )}
                                    <div>
                                        <p className='text-xs text-muted-foreground'>Вопрос {idx + 1}</p>
                                        <p className='font-semibold'>{q.text}</p>
                                    </div>
                                </div>

                                <div className='space-y-2'>
                                    {q.options.map((option: Option) => {
                                        const userPicked = selectedIds.has(option.id);
                                        const isCorrect = correctIds.has(option.id);

                                        let cls = 'flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm';
                                        if (isCorrect) {
                                            cls += ' border-emerald-500/50 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400';
                                        } else if (userPicked && !isCorrect) {
                                            cls += ' border-destructive/50 bg-destructive/10 text-destructive';
                                        } else {
                                            cls += ' border-border bg-muted/30 text-muted-foreground';
                                        }

                                        return (
                                            <div key={option.id} className={cls}>
                                                <span className='flex-1'>{option.text}</span>
                                                {isCorrect && <CheckCircle2 className='size-4 text-emerald-500' />}
                                                {userPicked && !isCorrect && <XCircle className='size-4 text-destructive' />}
                                            </div>
                                        );
                                    })}
                                </div>

                                {q.explanation && (
                                    <ExplanationToggle
                                        isExpanded={isExpanded}
                                        onToggle={() => toggleExplanation(q.id)}
                                        text={q.explanation}
                                        withPrefix
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Actions */}
            <div className='mx-auto flex max-w-2xl flex-col gap-3 px-4 md:px-6'>
                <Button
                    variant='outline'
                    className='w-full gap-2 rounded-2xl'
                    onClick={handleRetry}
                >
                    <RotateCcw className='size-4' /> Пройти ещё раз
                </Button>

                {retryBlocked && (
                    <div className='flex items-start gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-400'>
                        <AlertCircle className='mt-0.5 size-4 shrink-0' />
                        Ссылка исчерпала лимит использований — повторное прохождение недоступно.
                    </div>
                )}

                <Button
                    variant='ghost'
                    className='w-full gap-2 rounded-2xl text-muted-foreground'
                    onClick={() => navigate('/')}
                >
                    <Home className='size-4' /> На главную
                </Button>
            </div>
        </div>
    );
}

function ExplanationToggle({
    isExpanded,
    onToggle,
    text,
    withPrefix = false,
}: {
    isExpanded: boolean;
    onToggle: () => void;
    text: string;
    withPrefix?: boolean;
}) {
    return (
        <div className='mt-3'>
            <button
                onClick={onToggle}
                className='flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground'
            >
                <ChevronDown className={`size-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                {isExpanded ? 'Скрыть пояснение' : 'Показать пояснение'}
            </button>
            {isExpanded && (
                <div className='mt-2 rounded-xl bg-muted px-4 py-3 text-sm text-muted-foreground'>
                    {withPrefix && <span className='font-medium'>Пояснение: </span>}
                    {text}
                </div>
            )}
        </div>
    );
}
