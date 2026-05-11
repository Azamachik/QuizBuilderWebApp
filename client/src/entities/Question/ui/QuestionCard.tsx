import { Copy, GripVertical, Trash2, Pencil } from 'lucide-react';
import { cn } from '@/shared/lib/utils/utils';
import { Button } from '@/shared/ui/Button/Button';
import { Switch } from '@/shared/ui/Switch/Switch';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/Tooltip/Tooltip';
import Clip from '@/shared/assets/icons/clip.svg?react';
import { QUESTION_TYPE_LABELS } from '../model/types/Question';
import type { Question } from '../model/types/Question';

interface QuestionCardProps {
    question: Question;
    isDragging: boolean;
    isEditing: boolean;
    onDelete: (id: string) => void;
    onDuplicate: (id: string) => void;
    onToggleRequired: (id: string) => void;
    onEdit: (question: Question) => void;
    onDragStart: () => void;
    onDragEnter: () => void;
    onDrop: () => void;
    onDragEnd: () => void;
}

export function QuestionCard({
    question,
    isDragging,
    isEditing,
    onDelete,
    onDuplicate,
    onToggleRequired,
    onEdit,
    onDragStart,
    onDragEnter,
    onDrop,
    onDragEnd
}: QuestionCardProps) {
    return (
        <div
            className={cn('group relative flex gap-2 transition-opacity', isDragging && 'opacity-40')}
            draggable
            onDragStart={onDragStart}
            onDragEnter={onDragEnter}
            onDrop={(e) => {
                e.preventDefault();
                onDrop();
            }}
            onDragEnd={onDragEnd}
            onDragOver={(e) => e.preventDefault()}
        >
            <div className='flex cursor-grab items-center opacity-0 transition-opacity group-hover:opacity-100 active:cursor-grabbing'>
                <GripVertical className='size-5 text-muted-foreground' />
            </div>

            <div className='relative flex-1 overflow-hidden rounded-2xl border border-border bg-card'>
                <div
                    className={cn(
                        'absolute inset-y-0 left-0 w-1 rounded-l-2xl transition-opacity',
                        isEditing ? 'bg-action opacity-100' : 'opacity-0'
                    )}
                />

                <div className='p-5'>
                    <div className='mb-4 flex items-start gap-4 border-b border-border pb-3'>
                        <p className='flex-1 text-sm font-medium leading-relaxed'>
                            {question.text || <span className='text-muted-foreground'>Вопрос без текста</span>}
                        </p>
                        <span className='shrink-0 rounded-lg bg-muted px-3 py-1.5 text-xs text-muted-foreground'>
                            {QUESTION_TYPE_LABELS[question.type]}
                        </span>
                    </div>

                    {question.type === 'text' ? (
                        <div className='mb-4'>
                            <div className='rounded-xl border border-dashed border-border px-4 py-3 text-sm text-muted-foreground'>
                                Развернутый ответ
                            </div>
                        </div>
                    ) : (
                        <div className='mb-4 space-y-2'>
                            {question.options.map((option) => (
                                <div key={option.id} className='flex items-center gap-3'>
                                    {question.type === 'single' ? (
                                        <div
                                            className={cn(
                                                'size-4 shrink-0 rounded-full border-2',
                                                option.isCorrect ? 'border-action bg-action' : 'border-muted-foreground'
                                            )}
                                        />
                                    ) : (
                                        <div
                                            className={cn(
                                                'flex size-4 shrink-0 items-center justify-center rounded border-2',
                                                option.isCorrect ? 'border-action bg-action' : 'border-muted-foreground'
                                            )}
                                        >
                                            {option.isCorrect && (
                                                <svg viewBox='0 0 10 8' className='size-2.5'>
                                                    <path
                                                        d='M1 4l3 3 5-6'
                                                        stroke='white'
                                                        strokeWidth='1.5'
                                                        fill='none'
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                    )}
                                    <span className='text-sm'>{option.text}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {question.explanation && (
                        <div className='mb-4 flex items-start gap-2.5 rounded-xl bg-muted px-4 py-3'>
                            <span className='mt-px text-sm'>
                                <Clip />
                            </span>
                            <div>
                                <p className='mb-0.5 text-xs font-medium text-muted-foreground'>Пояснение</p>
                                <p className='text-sm text-muted-foreground'>{question.explanation}</p>
                            </div>
                        </div>
                    )}

                    <div className='mb-3 border-t border-border' />

                    <div className='flex items-center justify-end gap-1'>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant='ghost' size='icon-sm' onClick={() => onDuplicate(question.id)}>
                                    <Copy className='size-4' />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Дублировать</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant='ghost'
                                    size='icon-sm'
                                    onClick={() => onEdit(question)}
                                    className={cn(isEditing && 'text-action')}
                                >
                                    <Pencil className='size-4' />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Редактировать</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant='ghost'
                                    size='icon-sm'
                                    onClick={() => onDelete(question.id)}
                                    className='hover:text-destructive'
                                >
                                    <Trash2 className='size-4' />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Удалить</TooltipContent>
                        </Tooltip>

                        <div className='mx-1 h-4 w-px bg-border' />

                        <div className='flex items-center gap-2'>
                            <span className='text-sm text-muted-foreground'>Обязательный</span>
                            <Switch checked={question.required} onCheckedChange={() => onToggleRequired(question.id)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
