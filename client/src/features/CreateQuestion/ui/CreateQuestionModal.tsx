import * as React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/shared/ui/Button/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/Dialog/Dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/Select/Select';
import { Switch } from '@/shared/ui/Switch/Switch';
import { cn } from '@/shared/lib/utils/utils';
import Clip from '@/shared/assets/icons/clip.svg?react';
import { QUESTION_TYPE_LABELS } from '@/entities/Question';
import type { Question, QuestionType, Option } from '@/entities/Question';

interface CreateQuestionModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: Omit<Question, 'id' | 'order'>) => void;
    initialData?: Omit<Question, 'id' | 'order'>;
    title?: string;
}

type FormState = Omit<Question, 'id' | 'order'>;

function makeOption(text = ''): Option {
    return { id: crypto.randomUUID(), text, isCorrect: false };
}

const EMPTY: FormState = {
    text: '',
    type: 'single',
    options: [makeOption('Первый вариант'), makeOption('Второй вариант')],
    required: true,
    explanation: ''
};

const inputClass =
    'w-full rounded-xl border border-border bg-muted px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/30';

export function CreateQuestionModal({ open, onOpenChange, onSave, initialData, title = 'Новый вопрос' }: CreateQuestionModalProps) {
    const [form, setForm] = React.useState<FormState>(initialData ?? EMPTY);
    const [showExplanation, setShowExplanation] = React.useState(!!initialData?.explanation);

    React.useEffect(() => {
        if (open) {
            setForm(initialData ?? EMPTY);
            setShowExplanation(!!initialData?.explanation);
        }
    }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

    function handleTypeChange(type: QuestionType) {
        setForm((prev: FormState) => ({
            ...prev,
            type,
            options:
                type === 'text' ? [] : prev.options.length ? prev.options : [makeOption('Первый вариант'), makeOption('Второй вариант')]
        }));
    }

    function toggleCorrect(id: string) {
        setForm((prev: FormState) => ({
            ...prev,
            options:
                prev.type === 'single'
                    ? prev.options.map((o: Option) => ({ ...o, isCorrect: o.id === id }))
                    : prev.options.map((o: Option) => (o.id === id ? { ...o, isCorrect: !o.isCorrect } : o))
        }));
    }

    function updateOption(id: string, text: string) {
        setForm((prev: FormState) => ({
            ...prev,
            options: prev.options.map((o: Option) => (o.id === id ? { ...o, text } : o))
        }));
    }

    function removeOption(id: string) {
        setForm((prev: FormState) => ({
            ...prev,
            options: prev.options.filter((o: Option) => o.id !== id)
        }));
    }

    function addOption() {
        setForm((prev: FormState) => ({ ...prev, options: [...prev.options, makeOption()] }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!form.text.trim()) return;
        onSave({ ...form, text: form.text.trim(), explanation: form.explanation?.trim() || undefined });
        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='max-w-lg'>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className='space-y-5'>
                    {/* Text + type */}
                    <div className='grid grid-cols-[1fr_auto] gap-3'>
                        <div className='space-y-1.5'>
                            <label className='text-xs text-muted-foreground'>Текст вопроса</label>
                            <input
                                className={inputClass}
                                value={form.text}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setForm((prev: FormState) => ({ ...prev, text: e.target.value }))
                                }
                                placeholder='Введите вопрос'
                                required
                            />
                        </div>
                        <div className='space-y-1.5'>
                            <label className='text-xs text-muted-foreground'>Тип ответа</label>
                            <Select value={form.type} onValueChange={(v: string) => handleTypeChange(v as QuestionType)}>
                                <SelectTrigger className='w-44'>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {(Object.keys(QUESTION_TYPE_LABELS) as QuestionType[]).map((t) => (
                                        <SelectItem key={t} value={t}>
                                            {QUESTION_TYPE_LABELS[t]}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Options (choice types only) */}
                    {form.type !== 'text' && (
                        <div className='space-y-2'>
                            <label className='text-xs text-muted-foreground'>Варианты ответов</label>
                            {form.options.map((option) => (
                                <div key={option.id} className='flex items-center gap-2 rounded-xl border border-border px-3 py-2'>
                                    <button
                                        type='button'
                                        onClick={() => toggleCorrect(option.id)}
                                        className={cn(
                                            'shrink-0 transition-colors',
                                            form.type === 'single'
                                                ? cn(
                                                      'size-4 rounded-full border-2',
                                                      option.isCorrect ? 'border-action bg-action' : 'border-muted-foreground'
                                                  )
                                                : cn(
                                                      'flex size-4 items-center justify-center rounded border-2',
                                                      option.isCorrect ? 'border-action bg-action' : 'border-muted-foreground'
                                                  )
                                        )}
                                    >
                                        {form.type === 'multiple' && option.isCorrect && (
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
                                    </button>
                                    <input
                                        className='min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground'
                                        value={option.text}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateOption(option.id, e.target.value)}
                                        placeholder='Вариант ответа'
                                    />
                                    <button
                                        type='button'
                                        onClick={() => removeOption(option.id)}
                                        className='shrink-0 text-muted-foreground hover:text-foreground'
                                    >
                                        <X className='size-4' />
                                    </button>
                                </div>
                            ))}
                            <button
                                type='button'
                                onClick={addOption}
                                className='flex items-center gap-1.5 text-sm text-action hover:underline'
                            >
                                <span className='text-base leading-none'>+</span> Добавить вариант
                            </button>
                        </div>
                    )}

                    {/* Explanation — shared for all question types */}
                    {showExplanation ? (
                        <div className='space-y-1.5'>
                            <div className='flex items-center justify-between'>
                                <label className='text-xs text-muted-foreground'>Пояснение к ответу</label>
                                <button
                                    type='button'
                                    onClick={() => {
                                        setShowExplanation(false);
                                        setForm((prev) => ({ ...prev, explanation: '' }));
                                    }}
                                    className='text-xs text-muted-foreground hover:text-foreground'
                                >
                                    Убрать
                                </button>
                            </div>
                            <textarea
                                className={cn(inputClass, 'min-h-[72px] resize-none')}
                                value={form.explanation ?? ''}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                    setForm((prev) => ({ ...prev, explanation: e.target.value }))
                                }
                                placeholder='Введите пояснение к правильному ответу...'
                            />
                        </div>
                    ) : (
                        <button
                            type='button'
                            onClick={() => setShowExplanation(true)}
                            className='flex items-center gap-1.5 text-sm text-action hover:underline'
                        >
                            <Clip className='size-4' /> Добавить пояснение к ответу
                        </button>
                    )}

                    {/* Footer */}
                    <div className='flex items-center justify-between pt-1'>
                        <div className='flex items-center gap-2'>
                            <span className='text-sm'>Обязательный</span>
                            <Switch
                                checked={form.required}
                                onCheckedChange={(v: boolean) => setForm((prev: FormState) => ({ ...prev, required: v }))}
                            />
                        </div>
                        <div className='flex gap-2'>
                            <Button type='button' variant='destructive' onClick={() => onOpenChange(false)}>
                                Отмена
                            </Button>
                            <Button type='submit' variant='action'>
                                Сохранить
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
