import { useState, useEffect, type FormEvent } from 'react';
import { Button } from '@/shared/ui/Button/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/Dialog/Dialog';
import { cn } from '@/shared/lib/utils/utils';
import { updateQuiz } from '@/entities/Quiz';
import type { Quiz } from '@/entities/Quiz';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';

interface EditQuizModalProps {
    quiz: Quiz | null;
    onOpenChange: (open: boolean) => void;
}

const inputClass =
    'w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30';

export function EditQuizModal({ quiz, onOpenChange }: EditQuizModalProps) {
    const dispatch = useAppDispatch();
    const [form, setForm] = useState({ title: '', description: '' });

    useEffect(() => {
        if (quiz) setForm({ title: quiz.title, description: quiz.description ?? '' });
    }, [quiz]);

    function handleChange(field: keyof typeof form) {
        return (e: { target: { value: string } }) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!form.title.trim() || !quiz) return;
        await dispatch(updateQuiz({ id: quiz.id, data: { title: form.title.trim(), description: form.description.trim() } }));
        onOpenChange(false);
    }

    return (
        <Dialog open={!!quiz} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Редактировать тест</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='space-y-1.5'>
                        <label className='text-sm font-medium'>Название</label>
                        <input
                            className={inputClass}
                            value={form.title}
                            onChange={handleChange('title')}
                            placeholder='Введите название теста'
                            required
                        />
                    </div>
                    <div className='space-y-1.5'>
                        <label className='text-sm font-medium'>Описание</label>
                        <textarea
                            className={cn(inputClass, 'min-h-[88px] resize-none')}
                            value={form.description}
                            onChange={handleChange('description')}
                            placeholder='Краткое описание (необязательно)'
                        />
                    </div>
                    <div className='flex justify-end gap-2 pt-2'>
                        <Button type='button' variant='destructive' onClick={() => onOpenChange(false)}>
                            Отмена
                        </Button>
                        <Button type='submit' variant='action'>
                            Сохранить
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
