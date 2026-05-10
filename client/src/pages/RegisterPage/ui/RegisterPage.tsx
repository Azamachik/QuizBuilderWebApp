import { Link } from 'react-router-dom';
import { RoutePath, AppRoutes } from '@/shared/config/routeConfig/routeConfig';
import Favicon from '@/shared/assets/icons/favicon.svg?react';
import { RegisterForm } from '@/features/RegisterByEmail';

export default function RegisterPage() {
    return (
        <div className='flex min-h-screen flex-col items-center justify-center bg-background px-4'>
            <div className='w-full max-w-[400px] space-y-7'>
                <div className='flex justify-center'>
                    <Link to={RoutePath[AppRoutes.MAIN]}>
                        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-white transition-opacity hover:opacity-80'>
                            <Favicon className='h-10 w-10' />
                        </div>
                    </Link>
                </div>

                <div className='space-y-1.5 text-center'>
                    <h1 className='text-2xl font-bold'>Регистрация в системе</h1>
                    <p className='text-sm text-muted-foreground'>Создайте аккаунт, чтобы создавать тесты</p>
                </div>

                <RegisterForm />

                <p className='text-center text-sm text-muted-foreground'>
                    Уже есть аккаунт?{' '}
                    <Link to='/login' className='text-action hover:underline'>
                        Войти
                    </Link>
                </p>
            </div>
        </div>
    );
}
