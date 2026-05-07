import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/shared/ui/Button/Button'
import Favicon from '@/shared/assets/icons/favicon.svg?react'

const inputClass =
    'w-full rounded-2xl bg-muted px-4 py-3.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/30'

export default function RegisterPage() {
    const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' })

    function handleChange(field: keyof typeof form) {
        return (e: { target: { value: string } }) =>
            setForm(prev => ({ ...prev, [field]: e.target.value }))
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
            <div className="w-full max-w-[400px] space-y-7">

                <div className="flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
                        <Favicon className="h-10 w-10" />
                    </div>
                </div>

                <div className="space-y-1.5 text-center">
                    <h1 className="text-2xl font-bold">Регистрация в системе</h1>
                    <p className="text-sm text-muted-foreground">Создайте аккаунт, чтобы создавать тесты</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="space-y-1.5">
                        <label className="text-sm">Имя пользователя</label>
                        <input
                            className={inputClass}
                            value={form.username}
                            onChange={handleChange('username')}
                            placeholder="root"
                            required
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm">Адрес эл.почты</label>
                        <input
                            type="email"
                            className={inputClass}
                            value={form.email}
                            onChange={handleChange('email')}
                            placeholder="name@example.com"
                            required
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm">Пароль</label>
                        <input
                            type="password"
                            className={inputClass}
                            value={form.password}
                            onChange={handleChange('password')}
                            required
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm">Подтвердите пароль</label>
                        <input
                            type="password"
                            className={inputClass}
                            value={form.confirm}
                            onChange={handleChange('confirm')}
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="action"
                        className="mt-2 h-12 w-full rounded-2xl text-sm font-semibold"
                    >
                        Зарегистрироваться
                    </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                    Уже есть аккаунт?{' '}
                    <Link to="/login" className="text-action hover:underline">
                        Войти
                    </Link>
                </p>
            </div>
        </div>
    )
}
