import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CalendarIcon, Check, Copy, ExternalLink, Link2, Plus, Power, Trash2 } from 'lucide-react';
import { Button } from '@/shared/ui/Button/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/Dialog/Dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/Tooltip/Tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/Popover/Popover';
import { Calendar } from '@/shared/ui/Calendar/Calendar';
import { $api } from '@/shared/api/api';
import { useAppSelector } from '@/shared/lib/helpers/hooks/useAppSelector';
import { getUserData } from '@/entities/User';
import { cn } from '@/shared/lib/utils/utils';
import type { InviteLink } from '@/entities/InviteLink';

interface CreateLinkModalProps {
    quizId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

function generateToken() {
    return (
        Math.random().toString(36).slice(2, 7) +
        '-' +
        Math.random().toString(36).slice(2, 7) +
        '-' +
        Math.random().toString(36).slice(2, 7)
    );
}

export function CreateLinkModal({ quizId, open, onOpenChange }: CreateLinkModalProps) {
    const userData = useAppSelector(getUserData);

    const [links, setLinks] = useState<InviteLink[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const [label, setLabel] = useState('');
    const [maxUses, setMaxUses] = useState('');
    const [expiresAt, setExpiresAt] = useState<Date | undefined>(undefined);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        if (!open || !quizId) return;
        setIsFetching(true);
        $api
            .get<InviteLink[]>(`/inviteLinks?quizId=${quizId}`)
            .then((res) => setLinks(res.data))
            .finally(() => setIsFetching(false));
    }, [open, quizId]);

    function getLinkUrl(link: InviteLink) {
        return `${window.location.origin}/quiz/${link.token}`;
    }

    function handleCopy(link: InviteLink) {
        navigator.clipboard.writeText(getLinkUrl(link)).then(() => {
            setCopiedId(link.id);
            setTimeout(() => setCopiedId(null), 2000);
        });
    }

    async function handleToggle(link: InviteLink) {
        await $api.patch(`/inviteLinks/${link.id}`, { isActive: !link.isActive });
        setLinks((prev) => prev.map((l) => (l.id === link.id ? { ...l, isActive: !l.isActive } : l)));
    }

    async function handleDelete(id: string) {
        await $api.delete(`/inviteLinks/${id}`);
        setLinks((prev) => prev.filter((l) => l.id !== id));
    }

    async function handleCreate() {
        if (!label.trim()) return;
        setIsCreating(true);
        try {
            const payload: Omit<InviteLink, 'id'> = {
                quizId,
                token: generateToken(),
                label: label.trim(),
                maxUses: maxUses ? parseInt(maxUses, 10) : null,
                usedCount: 0,
                expiresAt: expiresAt ? expiresAt.toISOString() : null,
                isActive: true,
                createdAt: new Date().toISOString(),
                createdBy: userData?.id ?? '',
            };
            const res = await $api.post<InviteLink>('/inviteLinks', payload);
            setLinks((prev) => [...prev, res.data]);
            setLabel('');
            setMaxUses('');
            setExpiresAt(undefined);
        } finally {
            setIsCreating(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='max-w-lg'>
                <DialogHeader>
                    <DialogTitle className='flex items-center gap-2'>
                        <Link2 className='size-5' /> Ссылки на тест
                    </DialogTitle>
                </DialogHeader>

                {/* Existing links */}
                <div className='max-h-56 space-y-2 overflow-y-auto pr-1'>
                    {isFetching ? (
                        <>
                            <div className='h-16 animate-pulse rounded-xl bg-muted' />
                            <div className='h-16 animate-pulse rounded-xl bg-muted' />
                        </>
                    ) : links.length === 0 ? (
                        <p className='py-4 text-center text-sm text-muted-foreground'>
                            Ссылок пока нет
                        </p>
                    ) : (
                        links.map((link) => (
                            <div
                                key={link.id}
                                className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 transition-opacity ${
                                    link.isActive
                                        ? 'border-border bg-card'
                                        : 'border-border bg-muted/30 opacity-60'
                                }`}
                            >
                                <div className='min-w-0 flex-1'>
                                    <p className='truncate text-sm font-medium'>{link.label}</p>
                                    <p className='truncate text-xs text-muted-foreground'>{getLinkUrl(link)}</p>
                                    <div className='mt-0.5 flex items-center gap-2'>
                                        {link.maxUses !== null ? (
                                            <span className='text-xs text-muted-foreground'>
                                                {link.usedCount}/{link.maxUses} исп.
                                            </span>
                                        ) : (
                                            <span className='text-xs text-muted-foreground'>Безлимит</span>
                                        )}
                                        {link.expiresAt && (
                                            <span className='text-xs text-muted-foreground'>
                                                · до {new Date(link.expiresAt).toLocaleDateString('ru-RU')}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <a
                                            href={getLinkUrl(link)}
                                            target='_blank'
                                            rel='noreferrer'
                                            className='flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted'
                                        >
                                            <ExternalLink className='size-3.5' />
                                        </a>
                                    </TooltipTrigger>
                                    <TooltipContent>Перейти по ссылке</TooltipContent>
                                </Tooltip>

                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            onClick={() => handleCopy(link)}
                                            className='flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted'
                                        >
                                            {copiedId === link.id ? (
                                                <Check className='size-3.5 text-emerald-500' />
                                            ) : (
                                                <Copy className='size-3.5' />
                                            )}
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {copiedId === link.id ? 'Скопировано!' : 'Скопировать ссылку'}
                                    </TooltipContent>
                                </Tooltip>

                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            onClick={() => handleToggle(link)}
                                            className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors ${
                                                link.isActive
                                                    ? 'text-muted-foreground hover:bg-muted'
                                                    : 'text-action hover:bg-action/10'
                                            }`}
                                        >
                                            <Power className='size-3.5' />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>{link.isActive ? 'Отключить' : 'Включить'}</TooltipContent>
                                </Tooltip>

                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            onClick={() => handleDelete(link.id)}
                                            className='flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive'
                                        >
                                            <Trash2 className='size-3.5' />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>Удалить ссылку</TooltipContent>
                                </Tooltip>
                            </div>
                        ))
                    )}
                </div>

                {/* Create form */}
                <div className='space-y-3 border-t border-border pt-4'>
                    <p className='text-sm font-semibold'>Создать новую ссылку</p>

                    <input
                        type='text'
                        placeholder='Название (напр. «Для студентов»)'
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        className='w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none ring-action focus:ring-2'
                    />

                    <div className='flex gap-2'>
                        <input
                            type='number'
                            placeholder='Лимит использований (∞ если пусто)'
                            value={maxUses}
                            onChange={(e) => setMaxUses(e.target.value)}
                            min={1}
                            className='flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none ring-action focus:ring-2'
                        />

                        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                            <PopoverTrigger asChild>
                                <button
                                    type='button'
                                    className={cn(
                                        'flex flex-1 items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-left text-sm outline-none ring-action focus:ring-2',
                                        !expiresAt && 'text-muted-foreground',
                                    )}
                                >
                                    <CalendarIcon className='size-4 shrink-0' />
                                    {expiresAt
                                        ? format(expiresAt, 'd MMM yyyy', { locale: ru })
                                        : 'Срок (не обяз.)'}
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className='p-0'>
                                <Calendar
                                    mode='single'
                                    selected={expiresAt}
                                    onSelect={(date) => {
                                        setExpiresAt(date);
                                        setCalendarOpen(false);
                                    }}
                                    disabled={{ before: new Date() }}
                                    locale={ru}
                                />
                                {expiresAt && (
                                    <div className='border-t border-border p-2'>
                                        <button
                                            onClick={() => { setExpiresAt(undefined); setCalendarOpen(false); }}
                                            className='w-full rounded-lg px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted'
                                        >
                                            Сбросить дату
                                        </button>
                                    </div>
                                )}
                            </PopoverContent>
                        </Popover>
                    </div>

                    <Button
                        variant='action'
                        className='w-full gap-2'
                        onClick={handleCreate}
                        disabled={!label.trim() || isCreating}
                    >
                        <Plus className='size-4' />
                        {isCreating ? 'Создание...' : 'Создать ссылку'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
