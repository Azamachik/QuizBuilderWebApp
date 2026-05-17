import { useState, useEffect } from 'react';
import { CalendarDays, Share2 } from 'lucide-react';
import { Button } from '@/shared/ui/Button/Button';
import { StatCard } from '@/shared/ui/StatCard/StatCard';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/Tooltip/Tooltip';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/helpers/hooks/useAppSelector/useAppSelector';
import { useDynamicModuleLoader, type ReducersList } from '@/shared/lib/helpers/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import { useIsMobile } from '@/shared/lib/helpers/hooks/useIsMobile/useIsMobile';
import {
    getProfileData,
    getProfileIsLoading,
    getProfileCreatedAt,
    profileReducer,
    fetchProfileData,
    updateProfileData
} from '@/entities/Profile';
import type { Profile } from '@/entities/Profile';
import { quizReducer, fetchQuizzes, getProfileStats, getQuizzesCreatedDates } from '@/entities/Quiz';
import { getUserData } from '@/entities/User';
import { ActivityHeatmap } from '../ActivityHeatmap/ActivityHeatmap';
import { EditProfileModal } from '../EditProfileModal/EditProfileModal';
import { ShareModal } from '../ShareModal/ShareModal';
import { ProfilePageSkeleton } from './ProfilePageSkeleton';
import { ProfilePageMobile } from './ProfilePage.mobile';

const reducers: ReducersList = { profile: profileReducer, quizzes: quizReducer };

function getInitials(firstName: string, lastName: string): string {
    return `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();
}

export default function ProfilePage() {
    const isMobile = useIsMobile();
    return isMobile ? <ProfilePageMobile /> : <ProfilePageDesktop />;
}

function ProfilePageDesktop() {
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
        dispatch(
            updateProfileData({
                userId: userData.id,
                data: { firstName: data.firstName, lastName: data.lastName, avatarUrl: data.avatarUrl }
            })
        );
    }

    const displayName =
        display.firstName || display.lastName ? `${display.firstName} ${display.lastName}`.trim() : (userData?.username ?? '—');

    const shareUsername =
        `${display.firstName}.${display.lastName}`.toLowerCase().replace(/^\.+|\.+$/g, '') || userData?.username || 'user';

    return (
        <main className='min-h-[calc(100vh-4rem)] bg-background'>
            <div className='mx-auto max-w-5xl space-y-5 px-5 py-10'>
                <div className='flex items-start justify-between'>
                    <div className='flex items-center gap-5'>
                        <div className='flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-muted'>
                            {display.avatarUrl ? (
                                <img src={display.avatarUrl} alt='avatar' className='h-full w-full object-cover' />
                            ) : (
                                <span className='text-2xl font-semibold text-muted-foreground'>
                                    {getInitials(display.firstName, display.lastName) || (userData?.username?.[0]?.toUpperCase() ?? '?')}
                                </span>
                            )}
                        </div>
                        <div className='space-y-2'>
                            <h1 className='text-2xl font-bold'>{displayName}</h1>
                            <p className='text-sm text-muted-foreground'>{userData?.email}</p>
                            <div className='inline-flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1.5 text-xs text-muted-foreground'>
                                <CalendarDays className='size-3.5 shrink-0' />
                                <span>Дата регистрации {displayDate}</span>
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
                            <TooltipContent>Поделиться</TooltipContent>
                        </Tooltip>
                    </div>
                </div>

                <div className='grid grid-cols-5 gap-3'>
                    <StatCard value={stats.created} label='Создано' />
                    <StatCard value={stats.published} label='Опубликовано' />
                    <StatCard value={stats.drafts} label='Черновики' />
                    <StatCard value={stats.attempts} label='Прохождений' />
                    <StatCard
                        value={display.avgScore != null ? `${display.avgScore}%` : '—'}
                        label='Средний результат'
                    />
                </div>

                <ActivityHeatmap quizDates={quizDates} />
            </div>

            <EditProfileModal open={editOpen} onOpenChange={setEditOpen} initialData={display} onSave={handleSave} />
            <ShareModal open={shareOpen} onOpenChange={setShareOpen} username={shareUsername} />
        </main>
    );
}
