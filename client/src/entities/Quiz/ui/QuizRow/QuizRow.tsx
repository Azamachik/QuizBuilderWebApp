import { ArrowRight, ClipboardList, FileQuestion, Globe, GlobeLock, Link2, Pencil, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/shared/ui/Card/Card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/Tooltip/Tooltip';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import type { Quiz } from '../../model/types/Quiz';

interface QuizRowProps {
    quiz: Quiz;
    onEdit: (quiz: Quiz) => void;
    onToggleStatus: (quiz: Quiz) => void;
    onCreateLink: (quiz: Quiz) => void;
}

export function QuizRow({ quiz, onEdit, onToggleStatus, onCreateLink }: QuizRowProps) {
    const date = new Date(quiz.createdAt).toLocaleDateString('ru-RU');

    return (
        <Card className='flex items-center gap-4 px-5 py-4'>
            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-action/10'>
                <ClipboardList className='size-5 text-action' />
            </div>

            <div className='min-w-0 flex-1'>
                <p className='font-semibold leading-snug'>{quiz.title}</p>
                <p className='text-sm text-muted-foreground'>{date}</p>
            </div>

            <StatusBadge status={quiz.isPublished} onClick={() => onToggleStatus(quiz)} />

            <div className='flex items-center gap-1.5 text-sm text-muted-foreground'>
                <FileQuestion className='size-4 shrink-0' />
                <span>{quiz.questionsCount} вопр.</span>
            </div>

            <div className='flex items-center gap-1.5 text-sm text-muted-foreground'>
                <Users className='size-4 shrink-0' />
                <span>{quiz.attemptsCount.toLocaleString('ru-RU')}</span>
            </div>

            <div className='flex items-center gap-1'>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            onClick={() => onEdit(quiz)}
                            className='flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground'
                        >
                            <Pencil className='size-3.5' />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>Редактировать</TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            onClick={() => onToggleStatus(quiz)}
                            className='flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground'
                        >
                            {quiz.isPublished
                                ? <GlobeLock className='size-3.5' />
                                : <Globe className='size-3.5' />
                            }
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>{quiz.isPublished ? 'Снять с публикации' : 'Опубликовать'}</TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            onClick={() => onCreateLink(quiz)}
                            className='flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground'
                        >
                            <Link2 className='size-3.5' />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>Создать ссылку</TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            to={`/quizzes/${quiz.id}`}
                            className='flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-action/10 text-action transition-colors hover:bg-action/20'
                        >
                            <ArrowRight className='size-4' />
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>Открыть редактор</TooltipContent>
                </Tooltip>
            </div>
        </Card>
    );
}
