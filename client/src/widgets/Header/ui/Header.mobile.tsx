import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Menu, Plus, User, X } from 'lucide-react';
import { ToggleTheme } from '@/features/ToggleTheme';
import Favicon from '@/shared/assets/icons/favicon.svg?react';
import { Button } from '@/shared/ui/Button/Button';
import { NavLink } from '@/shared/ui/NavLink/NavLink';
import { RoutePath, AppRoutes } from '@/shared/config/routeConfig/routeConfig';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/helpers/hooks/useAppSelector/useAppSelector';
import { getUserData, logout } from '@/entities/User';

const NAV_LINKS = [
    { label: 'Возможности', href: '/#features' },
    { label: 'Кейсы', href: '/#cases' },
    { label: 'Цены', href: '/#pricing' }
] as const;

export function HeaderMobile() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userData = useAppSelector(getUserData);
    const [open, setOpen] = useState(false);

    function handleLogout() {
        dispatch(logout());
        navigate(RoutePath[AppRoutes.MAIN]);
        setOpen(false);
    }

    function close() {
        setOpen(false);
    }

    return (
        <header className='sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm'>
            <div className='flex h-14 items-center justify-between px-4'>
                <Link to={RoutePath[AppRoutes.MAIN]} onClick={close}>
                    <Favicon />
                </Link>
                <div className='flex items-center gap-2'>
                    <ToggleTheme />
                    <button
                        onClick={() => setOpen((v) => !v)}
                        className='flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground'
                    >
                        {open ? <X className='size-5' /> : <Menu className='size-5' />}
                    </button>
                </div>
            </div>

            {open && (
                <div className='border-t border-border bg-background px-4 pb-4 pt-3'>
                    {userData ? (
                        <div className='space-y-2'>
                            <Button variant='action' className='w-full gap-2' asChild>
                                <Link to={`${RoutePath[AppRoutes.QUIZZES]}?create=true`} onClick={close}>
                                    <Plus className='size-4' /> Создать тест
                                </Link>
                            </Button>
                            <NavLink to={RoutePath[AppRoutes.QUIZZES]} onClick={close} className='block w-full py-2 text-center text-sm'>
                                Мои тесты
                            </NavLink>
                            <div className='flex gap-2 pt-1'>
                                <Button variant='outline' className='flex-1 gap-2' asChild>
                                    <Link to={RoutePath[AppRoutes.PROFILE]} onClick={close}>
                                        <User className='size-4' /> Профиль
                                    </Link>
                                </Button>
                                <Button variant='outline' className='flex-1 gap-2' onClick={handleLogout}>
                                    <LogOut className='size-4' /> Выйти
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className='space-y-2'>
                            <nav className='flex flex-col gap-1 pb-2'>
                                {NAV_LINKS.map(({ label, href }) => (
                                    <a
                                        key={href}
                                        href={href}
                                        onClick={close}
                                        className='py-2 text-sm text-muted-foreground hover:text-foreground'
                                    >
                                        {label}
                                    </a>
                                ))}
                            </nav>
                            <Button variant='outline' className='w-full' asChild>
                                <Link to={RoutePath[AppRoutes.LOGIN]} onClick={close}>
                                    Войти
                                </Link>
                            </Button>
                            <Button variant='action' className='w-full' asChild>
                                <Link to={RoutePath[AppRoutes.REGISTER]} onClick={close}>
                                    Регистрация
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}
