import { ToggleTheme } from '@/features/ToggleTheme'
import Favicon from '@/shared/assets/icons/favicon.svg?react';
import Logout from '@/shared/assets/icons/logout.svg?react';
import User from '@/shared/assets/icons/user.svg?react';
import { Button } from '@/shared/ui/Button/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/Tooltip/Tooltip';
import './Header.css'

export function Header() {
    const user = true;
    if (user) {
        return (
            <header className='flex h-14 items-center justify-between border-b border-border px-6'>
                <div className='font-semibold tracking-tight'>
                    <Favicon />
                </div>
                <div className='flex items-center gap-4'>
                    <Button variant='action'>+ Создать тест</Button>
                    <span>Тесты</span>
                </div>
                <div className='flex items-center gap-2'>
                    <ToggleTheme />
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant='secondary' size='icon'>
                                <User />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Профиль</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant='secondary' size='icon'>
                                <Logout />
                            </Button>    
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Выйти</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </header>
        );
    }
    return (
        <header className='flex h-14 items-center justify-between border-b border-border px-6'>
            <div className='font-semibold tracking-tight'>
                <Favicon />
            </div>
            <div className='flex gap-4'>
                <span>Возможности</span>
                <span>Кейсы</span>
                <span>Цены</span>
            </div>
            <div className='flex items-center gap-2'>
                <ToggleTheme />
                <Button>Войти</Button>
                <Button>Регистрация</Button>
            </div>
        </header>
    )
}

