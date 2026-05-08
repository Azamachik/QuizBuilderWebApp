import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/Button/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/Dialog/Dialog';
import { RoutePath, AppRoutes } from '@/shared/config/routeConfig/routeConfig';
import Favicon from '@/shared/assets/icons/favicon.svg?react';

const inputClass =
    'w-full rounded-2xl bg-muted px-4 py-3.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/30';

export default function LoginPage() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [warningOpen, setWarningOpen] = useState(false);

    function handleChange(field: keyof typeof form) {
        return (e: { target: { value: string } }) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
    }

    return (
        <div className='flex min-h-screen flex-col items-center justify-center bg-background px-4'>
            <div className='w-full max-w-[440px] space-y-7'>
                <div className='flex justify-center'>
                    <Link to={RoutePath[AppRoutes.MAIN]}>
                        <div className='flex h-20 w-20 items-center justify-center rounded-full bg-white transition-opacity hover:opacity-80'>
                            <Favicon className='h-12 w-12' />
                        </div>
                    </Link>
                </div>

                <div className='space-y-1.5 text-center'>
                    <h1 className='text-2xl font-bold'>Вход в систему</h1>
                    <p className='text-sm text-muted-foreground'>Войдите, чтобы создавать и проходить тесты</p>
                </div>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='space-y-1.5'>
                        <label className='text-sm'>Адрес эл.почты</label>
                        <input
                            type='email'
                            className={inputClass}
                            value={form.email}
                            onChange={handleChange('email')}
                            placeholder='name@example.com'
                            required
                        />
                    </div>
                    <div className='space-y-1.5'>
                        <label className='text-sm'>Пароль</label>
                        <input type='password' className={inputClass} value={form.password} onChange={handleChange('password')} required />
                    </div>
                    <Button type='submit' variant='action' className='mt-1 h-12 w-full rounded-2xl text-sm font-semibold'>
                        Продолжить
                    </Button>
                </form>

                <div className='flex items-center gap-3'>
                    <div className='flex-1 border-t border-border' />
                    <span className='text-xs text-muted-foreground'>Или войти через</span>
                    <div className='flex-1 border-t border-border' />
                </div>

                <div className='flex justify-center gap-3'>
                    <button
                        type='button'
                        onClick={() => setWarningOpen(true)}
                        className='flex h-12 w-12 items-center justify-center rounded-full border border-border text-sm font-semibold transition-colors hover:bg-yandex hover:text-white cursor-pointer'
                    >
                        Я
                    </button>
                    <button
                        type='button'
                        onClick={() => setWarningOpen(true)}
                        className='flex h-12 w-12 items-center justify-center rounded-full border border-border text-sm font-semibold transition-colors hover:bg-vk hover:text-white cursor-pointer'
                    >
                        VK
                    </button>
                </div>

                <p className='text-center text-sm text-muted-foreground'>
                    Нет аккаунта?{' '}
                    <Link to='/register' className='text-action hover:underline'>
                        Зарегистрироваться
                    </Link>
                </p>
            </div>

            <Dialog open={warningOpen} onOpenChange={setWarningOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Сервис временно недоступен</DialogTitle>
                    </DialogHeader>
                    <p className='text-sm text-muted-foreground'>
                        Вход через внешние сервисы временно не работает. Пожалуйста, используйте email и пароль.
                    </p>
                </DialogContent>
            </Dialog>
        </div>
    );
}
