import { Link, useNavigate } from 'react-router-dom';
import { ToggleTheme } from '@/features/ToggleTheme';
import Favicon from '@/shared/assets/icons/favicon.svg?react';
import Logout from '@/shared/assets/icons/logout.svg?react';
import User from '@/shared/assets/icons/user.svg?react';
import { Button } from '@/shared/ui/Button/Button';
import { NavLink } from '@/shared/ui/NavLink/NavLink';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/Tooltip/Tooltip';
import { RoutePath, AppRoutes } from '@/shared/config/routeConfig/routeConfig';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/helpers/hooks/useAppSelector';
import { getUserData, logout } from '@/entities/User';
import './Header.css';

const NAV_LINKS = [
    { label: 'Возможности', href: '/#features' },
    { label: 'Кейсы',       href: '/#cases'    },
    { label: 'Цены',        href: '/#pricing'  },
] as const;

const navLinkClass =
    'text-sm text-muted-foreground transition-colors hover:text-foreground';

export function Header() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userData = useAppSelector(getUserData);

    function handleLogout() {
        dispatch(logout());
        navigate(RoutePath[AppRoutes.MAIN]);
    }

    if (userData) {
        return (
            <header className='sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm'>
                <div className='mx-auto flex h-15 max-w-screen-xl items-center justify-between px-36'>
                    <Link to={RoutePath[AppRoutes.MAIN]} className='font-semibold tracking-tight'>
                        <Favicon />
                    </Link>

                    <div className='flex items-center gap-4'>
                        <Button variant='action' asChild>
                            <Link to={`${RoutePath[AppRoutes.QUIZZES]}?create=true`}>+ Создать тест</Link>
                        </Button>
                        <NavLink to={RoutePath[AppRoutes.QUIZZES]}>Тесты</NavLink>
                    </div>

                    <div className='flex items-center gap-2'>
                        <ToggleTheme />
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant='secondary' size='icon' asChild>
                                    <Link to={RoutePath[AppRoutes.PROFILE]}>
                                        <User />
                                    </Link>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Профиль</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant='secondary' size='icon' onClick={handleLogout}>
                                    <Logout />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Выйти</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <header className='sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm'>
            <div className='mx-auto flex h-14 max-w-screen-xl items-center justify-between px-6'>
                <Link to={RoutePath[AppRoutes.MAIN]} className='font-semibold tracking-tight'>
                    <Favicon />
                </Link>

                <nav className='flex gap-6'>
                    {NAV_LINKS.map(({ label, href }) => (
                        <a key={href} href={href} className={navLinkClass}>
                            {label}
                        </a>
                    ))}
                </nav>

                <div className='flex items-center gap-2'>
                    <ToggleTheme />
                    <Button variant='outline' asChild>
                        <Link to={RoutePath[AppRoutes.LOGIN]}>Войти</Link>
                    </Button>
                    <Button variant='action' asChild>
                        <Link to={RoutePath[AppRoutes.REGISTER]}>Регистрация</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
