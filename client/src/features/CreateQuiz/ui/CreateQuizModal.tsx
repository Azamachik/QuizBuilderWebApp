import { useState, type FormEvent } from 'react';
import { Button } from '@/shared/ui/Button/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/Dialog/Dialog';
import { cn } from '@/shared/lib/utils/utils';
import { createQuiz } from '@/entities/Quiz';
import { getUserData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/helpers/hooks/useAppSelector/useAppSelector';

interface CreateQuizModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const inputClass =
    'w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30';

const EMPTY = { title: '', description: '' };

export function CreateQuizModal({ open, onOpenChange }: CreateQuizModalProps) {
    const dispatch = useAppDispatch();
    const userData = useAppSelector(getUserData);
    const [form, setForm] = useState(EMPTY);

    function handleChange(field: keyof typeof form) {
        return (e: { target: { value: string } }) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!form.title.trim() || !userData?.id) return;
        await dispatch(createQuiz({ title: form.title.trim(), description: form.description.trim(), authorId: userData.id }));
        setForm(EMPTY);
        onOpenChange(false);
    }

    function handleClose() {
        setForm(EMPTY);
        onOpenChange(false);
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(v) => {
                if (!v) handleClose();
                else onOpenChange(v);
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Новый тест</DialogTitle>
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
                        <Button type='button' variant='destructive' onClick={handleClose}>
                            Отмена
                        </Button>
                        <Button type='submit' variant='action'>
                            Создать
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
