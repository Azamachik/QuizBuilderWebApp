import { type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui/Button/Button';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/helpers/hooks/useAppSelector';
import { useDynamicModuleLoader, type ReducersList } from '@/shared/lib/helpers/hooks/useDynamicModuleLoader';
import { RoutePath, AppRoutes } from '@/shared/config/routeConfig/routeConfig';
import { registerByEmail } from '../model/services/registerByEmail';
import { registerReducer, setUsername, setEmail, setPassword, setConfirm } from '../model/slice/registerSlice';
import {
    getRegisterUsername,
    getRegisterEmail,
    getRegisterPassword,
    getRegisterConfirm,
    getRegisterIsLoading,
    getRegisterError,
} from '../model/selectors/getRegister';

const reducers: ReducersList = { register: registerReducer };

const inputClass =
    'w-full rounded-2xl bg-muted px-4 py-3.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/30';

export function RegisterForm() {
    useDynamicModuleLoader(reducers, false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const username = useAppSelector(getRegisterUsername);
    const email = useAppSelector(getRegisterEmail);
    const password = useAppSelector(getRegisterPassword);
    const confirm = useAppSelector(getRegisterConfirm);
    const isLoading = useAppSelector(getRegisterIsLoading);
    const error = useAppSelector(getRegisterError);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (password !== confirm) return;
        const result = await dispatch(registerByEmail({ username, email, password }));
        if (registerByEmail.fulfilled.match(result)) {
            navigate(RoutePath[AppRoutes.QUIZZES]);
        }
    }

    return (
        <form onSubmit={handleSubmit} className='space-y-3'>
            {error && (
                <p className='rounded-xl bg-destructive/10 px-4 py-2.5 text-sm text-destructive'>
                    {error}
                </p>
            )}
            <div className='space-y-1.5'>
                <label className='text-sm'>Имя пользователя</label>
                <input
                    className={inputClass}
                    value={username}
                    onChange={(e) => dispatch(setUsername(e.target.value))}
                    placeholder='root'
                    required
                    disabled={isLoading}
                />
            </div>
            <div className='space-y-1.5'>
                <label className='text-sm'>Адрес эл.почты</label>
                <input
                    type='email'
                    className={inputClass}
                    value={email}
                    onChange={(e) => dispatch(setEmail(e.target.value))}
                    placeholder='name@example.com'
                    required
                    disabled={isLoading}
                />
            </div>
            <div className='space-y-1.5'>
                <label className='text-sm'>Пароль</label>
                <input
                    type='password'
                    className={inputClass}
                    value={password}
                    onChange={(e) => dispatch(setPassword(e.target.value))}
                    required
                    disabled={isLoading}
                />
            </div>
            <div className='space-y-1.5'>
                <label className='text-sm'>Подтвердите пароль</label>
                <input
                    type='password'
                    className={inputClass}
                    value={confirm}
                    onChange={(e) => dispatch(setConfirm(e.target.value))}
                    required
                    disabled={isLoading}
                />
                {password && confirm && password !== confirm && (
                    <p className='text-xs text-destructive'>Пароли не совпадают</p>
                )}
            </div>
            <Button
                type='submit'
                variant='action'
                className='mt-2 h-12 w-full rounded-2xl text-sm font-semibold'
                disabled={isLoading || (!!confirm && password !== confirm)}
            >
                {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
            </Button>
        </form>
    );
}
