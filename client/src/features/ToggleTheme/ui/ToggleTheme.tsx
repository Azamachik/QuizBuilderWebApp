import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/shared/lib/helpers/hooks/useTheme/useTheme';
import { Button } from '@/shared/ui/Button/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/ui/DropdownMenu/DropdownMenu';

export function ToggleTheme() {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='secondary' size='icon'>
                    <Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
                    <Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={() => setTheme('light')}>Светлая</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>Темная</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>Как в системе</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
