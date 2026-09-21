import { Shield, Users, Mail, CalendarDays, Crown } from 'lucide-react';
import { useGetAllUsersQuery } from '@/entities/User/api/userApi';
import type { User } from '@/entities/User';

function RoleBadge({ role }: { role?: string }) {
    if (role === 'admin') {
        return (
            <span className='inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'>
                <Crown className='size-3' />
                Администратор
            </span>
        );
    }
    return (
        <span className='inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground'>
            <Users className='size-3' />
            Пользователь
        </span>
    );
}

function UserRow({ user }: { user: User }) {
    return (
        <tr className='border-b border-border transition-colors hover:bg-muted/40'>
            <td className='py-3 pl-4 pr-3'>
                <div className='flex items-center gap-3'>
                    <div className='flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted'>
                        {user.avatar ? (
                            <img src={user.avatar} alt={user.username} className='h-full w-full object-cover' />
                        ) : (
                            <span className='text-sm font-semibold text-muted-foreground'>
                                {user.username?.[0]?.toUpperCase() ?? '?'}
                            </span>
                        )}
                    </div>
                    <div>
                        <p className='text-sm font-medium text-foreground'>{user.username}</p>
                        <p className='text-xs text-muted-foreground'>ID: {user.id}</p>
                    </div>
                </div>
            </td>
            <td className='px-3 py-3'>
                <div className='flex items-center gap-1.5 text-sm text-muted-foreground'>
                    <Mail className='size-3.5 shrink-0' />
                    {user.email ?? '—'}
                </div>
            </td>
            <td className='px-3 py-3'>
                <RoleBadge role={user.role} />
            </td>
            <td className='px-3 py-3 text-sm text-muted-foreground'>
                <div className='flex items-center gap-1.5'>
                    <CalendarDays className='size-3.5 shrink-0' />
                    {user.createdAt ?? '—'}
                </div>
            </td>
        </tr>
    );
}

function AdminPageSkeleton() {
    return (
        <main className='min-h-[calc(100vh-4rem)] bg-background'>
            <div className='mx-auto max-w-5xl space-y-6 px-5 py-10'>
                <div className='h-8 w-48 animate-pulse rounded-lg bg-muted' />
                <div className='overflow-hidden rounded-2xl border border-border'>
                    <div className='h-12 animate-pulse bg-muted' />
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className='flex items-center gap-3 border-t border-border px-4 py-3'>
                            <div className='h-9 w-9 animate-pulse rounded-xl bg-muted' />
                            <div className='flex-1 space-y-1.5'>
                                <div className='h-4 w-32 animate-pulse rounded bg-muted' />
                                <div className='h-3 w-20 animate-pulse rounded bg-muted' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default function AdminPage() {
    const { data: users, isLoading, isError } = useGetAllUsersQuery();

    if (isLoading) return <AdminPageSkeleton />;

    if (isError) {
        return (
            <main className='min-h-[calc(100vh-4rem)] bg-background'>
                <div className='mx-auto max-w-5xl px-5 py-10'>
                    <p className='text-sm text-destructive'>Ошибка загрузки пользователей</p>
                </div>
            </main>
        );
    }

    const total = users?.length ?? 0;
    const admins = users?.filter((u) => u.role === 'admin').length ?? 0;
    const regular = total - admins;

    return (
        <main className='min-h-[calc(100vh-4rem)] bg-background'>
            <div className='mx-auto max-w-5xl space-y-6 px-5 py-10'>

                {/* Заголовок */}
                <div className='flex items-center gap-3'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30'>
                        <Shield className='size-5 text-amber-600 dark:text-amber-400' />
                    </div>
                    <div>
                        <h1 className='text-2xl font-bold text-foreground'>Панель администратора</h1>
                        <p className='text-sm text-muted-foreground'>Управление пользователями системы</p>
                    </div>
                </div>

                {/* Статистика */}
                <div className='grid grid-cols-3 gap-3'>
                    <div className='rounded-2xl border border-border bg-card p-4'>
                        <p className='text-2xl font-bold text-foreground'>{total}</p>
                        <p className='text-sm text-muted-foreground'>Всего пользователей</p>
                    </div>
                    <div className='rounded-2xl border border-border bg-card p-4'>
                        <p className='text-2xl font-bold text-amber-600 dark:text-amber-400'>{admins}</p>
                        <p className='text-sm text-muted-foreground'>Администраторов</p>
                    </div>
                    <div className='rounded-2xl border border-border bg-card p-4'>
                        <p className='text-2xl font-bold text-foreground'>{regular}</p>
                        <p className='text-sm text-muted-foreground'>Обычных пользователей</p>
                    </div>
                </div>

                {/* Таблица */}
                <div className='overflow-hidden rounded-2xl border border-border bg-card'>
                    <div className='flex items-center gap-2 border-b border-border px-4 py-3'>
                        <Users className='size-4 text-muted-foreground' />
                        <h2 className='text-sm font-semibold text-foreground'>Список пользователей</h2>
                        <span className='ml-auto rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground'>{total}</span>
                    </div>

                    {!users || users.length === 0 ? (
                        <div className='py-12 text-center text-sm text-muted-foreground'>Пользователей не найдено</div>
                    ) : (
                        <div className='overflow-x-auto'>
                            <table className='w-full text-left'>
                                <thead>
                                    <tr className='border-b border-border bg-muted/50 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
                                        <th className='py-2.5 pl-4 pr-3'>Пользователь</th>
                                        <th className='px-3 py-2.5'>Email</th>
                                        <th className='px-3 py-2.5'>Роль</th>
                                        <th className='px-3 py-2.5'>Дата регистрации</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <UserRow key={user.id} user={user} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>
        </main>
    );
}
