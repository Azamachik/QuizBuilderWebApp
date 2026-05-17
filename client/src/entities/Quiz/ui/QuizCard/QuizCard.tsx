import { useState } from 'react';
import { ArrowRight, ClipboardList, FileQuestion, Globe, GlobeLock, Link2, Pencil, Trash2, Users, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/shared/ui/Card/Card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/Tooltip/Tooltip';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import type { Quiz } from '../../model/types/Quiz';

interface QuizCardProps {
    quiz: Quiz;
    onEdit: (quiz: Quiz) => void;
    onToggleStatus: (quiz: Quiz) => void;
    onCreateLink: (quiz: Quiz) => void;
    onDelete: (id: string) => void;
}

export function QuizCard({ quiz, onEdit, onToggleStatus, onCreateLink, onDelete }: QuizCardProps) {
    const date = new Date(quiz.createdAt).toLocaleDateString('ru-RU');
    const [confirming, setConfirming] = useState(false);

    function handleDeleteClick() {
        if (confirming) {
            onDelete(quiz.id);
        } else {
            setConfirming(true);
        }
    }

    return (
        <Card className='flex flex-col p-5'>
            <div className='flex items-center justify-between'>
                <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-action/10'>
                    <ClipboardList className='size-5 text-action' />
                </div>
                <StatusBadge status={quiz.isPublished} onClick={() => onToggleStatus(quiz)} />
            </div>

            <div className='mt-5 flex-1 space-y-1'>
                <h3 className='text-base font-bold leading-snug'>{quiz.title}</h3>
                <p className='text-sm text-muted-foreground'>{date}</p>
            </div>

            <div className='mt-4 flex items-center gap-3 text-sm text-muted-foreground'>
                <div className='flex items-center gap-1.5'>
                    <FileQuestion className='size-4 shrink-0' />
                    <span>{quiz.questionsCount} вопр.</span>
                </div>
                <div className='flex items-center gap-1.5'>
                    <Users className='size-4 shrink-0' />
                    <span>{quiz.attemptsCount.toLocaleString('ru-RU')}</span>
                </div>
            </div>

            <div className='mt-4 flex items-center justify-end gap-1'>
                {confirming ? (
                    <>
                        <span className='mr-1 text-xs text-destructive'>Удалить?</span>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={handleDeleteClick}
                                    className='flex h-8 w-8 items-center justify-center rounded-xl bg-destructive/10 text-destructive transition-colors hover:bg-destructive/20'
                                >
                                    <Trash2 className='size-3.5' />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>Подтвердить</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={() => setConfirming(false)}
                                    className='flex h-8 w-8 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground'
                                >
                                    <X className='size-3.5' />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>Отмена</TooltipContent>
                        </Tooltip>
                    </>
                ) : (
                    <>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={() => onToggleStatus(quiz)}
                                    className='flex h-8 w-8 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground'
                                >
                                    {quiz.isPublished ? <GlobeLock className='size-3.5' /> : <Globe className='size-3.5' />}
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>{quiz.isPublished ? 'Снять с публикации' : 'Опубликовать'}</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    data-testid='btn-create-link'
                                    onClick={() => onCreateLink(quiz)}
                                    className={`flex h-8 w-8 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground${!quiz.isPublished ? ' opacity-50' : ''}`}
                                >
                                    <Link2 className='size-3.5' />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>Создать ссылку</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={() => onEdit(quiz)}
                                    className='flex h-8 w-8 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground'
                                >
                                    <Pencil className='size-3.5' />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>Редактировать</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={handleDeleteClick}
                                    className='flex h-8 w-8 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive'
                                >
                                    <Trash2 className='size-3.5' />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>Удалить</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    to={`/quizzes/${quiz.id}`}
                                    className='flex h-8 w-8 items-center justify-center rounded-xl bg-action/10 text-action transition-colors hover:bg-action/20'
                                >
                                    <ArrowRight className='size-4' />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>Открыть редактор</TooltipContent>
                        </Tooltip>
                    </>
                )}
            </div>
        </Card>
    );
}
