import { useState } from 'react';
import { CalendarDays, Share2 } from 'lucide-react';
import { Button } from '@/shared/ui/Button/Button';
import { StatCard } from '@/shared/ui/StatCard/StatCard';
import { ActivityHeatmap } from '../ActivityHeatmap/ActivityHeatmap';
import { EditProfileModal, type ProfileData } from '../EditProfileModal/EditProfileModal';
import { ShareModal } from '../ShareModal/ShareModal';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/Tooltip/Tooltip';

const INITIAL_PROFILE: ProfileData = {
    firstName: 'Elena',
    lastName: 'Sokolova',
    email: 'elena@mail.ru',
    avatarUrl: ''
};

function getInitials(firstName: string, lastName: string): string {
    return `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();
}

export default function ProfilePage() {
    const [profile, setProfile] = useState<ProfileData>(INITIAL_PROFILE);
    const [editOpen, setEditOpen] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);

    return (
        <main className='min-h-[calc(100vh-3.5rem)] bg-background'>
            <div className='mx-auto max-w-5xl space-y-5 px-6 py-10'>
                <div className='flex items-start justify-between'>
                    <div className='flex items-center gap-5'>
                        <div className='flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-muted'>
                            {profile.avatarUrl ? (
                                <img src={profile.avatarUrl} alt='avatar' className='h-full w-full object-cover' />
                            ) : (
                                <span className='text-2xl font-semibold text-muted-foreground'>
                                    {getInitials(profile.firstName, profile.lastName)}
                                </span>
                            )}
                        </div>
                        <div className='space-y-2'>
                            <h1 className='text-2xl font-bold'>
                                {profile.firstName} {profile.lastName}
                            </h1>
                            <p className='text-sm text-muted-foreground'>{profile.email}</p>
                            <div className='inline-flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1.5 text-xs text-muted-foreground'>
                                <CalendarDays className='size-3.5 shrink-0' />
                                <span>Дата регистрации 12.10.2023</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex shrink-0 items-center gap-2'>
                        <Button variant='action' onClick={() => setEditOpen(true)}>
                            Редактировать
                        </Button>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant='secondary' size='icon' onClick={() => setShareOpen(true)}>
                                    <Share2 />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Поделиться</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>

                <div className='grid grid-cols-5 gap-3'>
                    <StatCard value={42} label='Создано' />
                    <StatCard value={38} label='Опубликовано' />
                    <StatCard value={4} label='Черновики' />
                    <StatCard value={128} label='Прохождений' />
                    <StatCard value='94%' label='Средний результат' highlight progress={94} />
                </div>

                <ActivityHeatmap />
            </div>

            <EditProfileModal open={editOpen} onOpenChange={setEditOpen} initialData={profile} onSave={setProfile} />
            <ShareModal open={shareOpen} onOpenChange={setShareOpen} username={`${profile.firstName}.${profile.lastName}`.toLowerCase()} />
        </main>
    );
}
