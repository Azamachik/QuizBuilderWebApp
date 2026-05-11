import { useState } from 'react';
import { Check, Copy, Link2 } from 'lucide-react';
import { Button } from '@/shared/ui/Button/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/Dialog/Dialog';

interface CreateLinkModalProps {
    quizId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreateLinkModal({ quizId, open, onOpenChange }: CreateLinkModalProps) {
    const [copied, setCopied] = useState(false);
    const link = `${window.location.origin}/quiz/${quizId}`;

    function handleCopy() {
        navigator.clipboard.writeText(link).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='max-w-md'>
                <DialogHeader>
                    <DialogTitle className='flex items-center gap-2'>
                        <Link2 className='size-5' /> Поделиться тестом
                    </DialogTitle>
                </DialogHeader>

                <p className='text-sm text-muted-foreground'>
                    Отправьте эту ссылку участникам, чтобы они могли пройти тест.
                </p>

                <div className='flex items-center gap-2 rounded-xl border border-border bg-muted px-3 py-2'>
                    <span className='min-w-0 flex-1 truncate text-sm'>{link}</span>
                    <Button variant='ghost' size='icon-sm' onClick={handleCopy}>
                        {copied ? <Check className='size-4 text-green-500' /> : <Copy className='size-4' />}
                    </Button>
                </div>

                <div className='flex justify-end'>
                    <Button variant='outline' onClick={() => onOpenChange(false)}>
                        Закрыть
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
