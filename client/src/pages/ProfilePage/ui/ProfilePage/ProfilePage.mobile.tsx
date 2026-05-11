import { useState, useEffect } from 'react';
import { CalendarDays, Share2 } from 'lucide-react';
import { Button } from '@/shared/ui/Button/Button';
import { StatCard } from '@/shared/ui/StatCard/StatCard';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/helpers/hooks/useAppSelector';
import { useDynamicModuleLoader, type ReducersList } from '@/shared/lib/helpers/hooks/useDynamicModuleLoader';
import {
    getProfileData,
    getProfileIsLoading,
    getProfileCreatedAt,
    profileReducer,
    fetchProfileData,
    updateProfileData,
} from '@/entities/Profile';
import type { Profile } from '@/entities/Profile';
import {
    quizReducer,
    fetchQuizzes,
    getProfileStats,
    getQuizzesCreatedDates,
} from '@/entities/Quiz';
import { getUserData } from '@/entities/User';
import { ActivityHeatmap } from '../ActivityHeatmap/ActivityHeatmap';
import { EditProfileModal } from '../EditProfileModal/EditProfileModal';
import { ShareModal } from '../ShareModal/ShareModal';
import { ProfilePageSkeleton } from './ProfilePageSkeleton';

const reducers: ReducersList = { profile: profileReducer, quizzes: quizReducer };

function getInitials(firstName: string, lastName: string): string {
    return `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();
}

export function ProfilePageMobile() {
    useDynamicModuleLoader(reducers, false);

    const dispatch = useAppDispatch();
    const userData = useAppSelector(getUserData);
    const profileData = useAppSelector(getProfileData);
    const isLoading = useAppSelector(getProfileIsLoading);
    const createdAt = useAppSelector(getProfileCreatedAt);
    const stats = useAppSelector(getProfileStats);
    const quizDates = useAppSelector(getQuizzesCreatedDates);

    const [editOpen, setEditOpen] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);

    useEffect(() => {
        if (userData?.id) {
            dispatch(fetchProfileData(userData.id));
            dispatch(fetchQuizzes(userData.id));
        }
    }, [dispatch, userData?.id]);

    if (isLoading || !profileData) {
        return <ProfilePageSkeleton />;
    }

    const display: Profile = profileData;
    const displayDate = createdAt || userData?.createdAt || '—';

    function handleSave(data: Profile) {
        if (!userData?.id) return;
        dispatch(updateProfileData({
            userId: userData.id,
            data: { firstName: data.firstName, lastName: data.lastName, avatarUrl: data.avatarUrl },
        }));
    }

    const displayName = display.firstName || display.lastName
        ? `${display.firstName} ${display.lastName}`.trim()
        : userData?.username ?? '—';

    const shareUsername = `${display.firstName}.${display.lastName}`
        .toLowerCase()
        .replace(/^\.+|\.+$/g, '') || userData?.username || 'user';

    return (
        <main className='min-h-[calc(100vh-3.5rem)] bg-background'>
            <div className='space-y-4 px-4 py-6'>
                {/* Avatar + name row */}
                <div className='flex items-center gap-4'>
                    <div className='flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-muted'>
                        {display.avatarUrl ? (
                            <img src={display.avatarUrl} alt='avatar' className='h-full w-full object-cover' />
                        ) : (
                            <span className='text-xl font-semibold text-muted-foreground'>
                                {getInitials(display.firstName, display.lastName) || (userData?.username?.[0]?.toUpperCase() ?? '?')}
                            </span>
                        )}
                    </div>
                    <div className='min-w-0 flex-1'>
                        <h1 className='truncate text-lg font-bold'>{displayName}</h1>
                        <p className='truncate text-xs text-muted-foreground'>{userData?.email}</p>
                        <div className='mt-1 inline-flex items-center gap-1 rounded-lg bg-muted px-2 py-1 text-xs text-muted-foreground'>
                            <CalendarDays className='size-3 shrink-0' />
                            <span>С {displayDate}</span>
                        </div>
                    </div>
                </div>

                {/* Action buttons */}
                <div className='flex gap-2'>
                    <Button variant='action' className='flex-1' onClick={() => setEditOpen(true)}>
                        Редактировать
                    </Button>
                    <Button variant='secondary' size='icon' onClick={() => setShareOpen(true)}>
                        <Share2 className='size-4' />
                    </Button>
                </div>

                {/* Stats — 2 columns */}
                <div className='grid grid-cols-2 gap-3'>
                    <StatCard value={stats.created} label='Создано' />
                    <StatCard value={stats.published} label='Опубликовано' />
                    <StatCard value={stats.drafts} label='Черновики' />
                    <StatCard value={stats.attempts} label='Прохождений' />
                </div>

                {/* Heatmap — scrolls horizontally on mobile */}
                <ActivityHeatmap quizDates={quizDates} />
            </div>

            <EditProfileModal open={editOpen} onOpenChange={setEditOpen} initialData={display} onSave={handleSave} />
            <ShareModal open={shareOpen} onOpenChange={setShareOpen} username={shareUsername} />
        </main>
    );
}
