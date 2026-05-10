import { type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui/Button/Button';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/helpers/hooks/useAppSelector';
import { useDynamicModuleLoader, type ReducersList } from '@/shared/lib/helpers/hooks/useDynamicModuleLoader';
import { RoutePath, AppRoutes } from '@/shared/config/routeConfig/routeConfig';
import { loginByEmail } from '../model/services/loginByEmail';
import { loginReducer, setEmail, setPassword } from '../model/slice/loginSlice';
import { getLoginEmail, getLoginPassword, getLoginIsLoading, getLoginError } from '../model/selectors/getLogin';

const reducers: ReducersList = { login: loginReducer };

const inputClass =
    'w-full rounded-2xl bg-muted px-4 py-3.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/30';

export function LoginForm() {
    useDynamicModuleLoader(reducers, false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const email = useAppSelector(getLoginEmail);
    const password = useAppSelector(getLoginPassword);
    const isLoading = useAppSelector(getLoginIsLoading);
    const error = useAppSelector(getLoginError);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const result = await dispatch(loginByEmail({ email, password }));
        if (loginByEmail.fulfilled.match(result)) {
            navigate(RoutePath[AppRoutes.QUIZZES]);
        }
    }

    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            {error && (
                <p className='rounded-xl bg-destructive/10 px-4 py-2.5 text-sm text-destructive'>
                    {error}
                </p>
            )}
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
            <Button
                type='submit'
                variant='action'
                className='mt-1 h-12 w-full rounded-2xl text-sm font-semibold'
                disabled={isLoading}
            >
                {isLoading ? 'Вход...' : 'Продолжить'}
            </Button>
        </form>
    );
}
