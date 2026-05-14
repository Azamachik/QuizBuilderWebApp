import { ArrowRight, BarChart2, CheckSquare, List, Lock, Shield, Timer, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/Button/Button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/Accordion/Accordion';
import { RoutePath, AppRoutes } from '@/shared/config/routeConfig/routeConfig';

const FEATURES = [
    { icon: List, title: 'Множественный выбор', desc: 'Удобные настройки вариантов ответов.' },
    { icon: Timer, title: 'Глубокая аналитика', desc: 'Следите за конверсией, временем прохождения и сложными вопросами.' },
    { icon: Lock, title: 'Приватность', desc: 'Ваши данные и ответы пользователей зашифрованы и надёжно защищены.' }
] as const;

const CASES = [
    {
        icon: Users,
        title: 'HR и онбординг',
        desc: 'Проверяйте знания новых сотрудников и упрощайте адаптацию с помощью интерактивных тестов.'
    },
    { icon: Zap, title: 'Образование', desc: 'Создавайте контрольные работы с мгновенной проверкой результатов.' },
    { icon: Shield, title: 'Маркетинг и вовлечение', desc: 'Квизы, опросы и викторины для захвата лидов и удержания аудитории.' }
] as const;

const PRICING = [
    {
        name: 'Бесплатно',
        price: '0 ₽',
        features: ['До 5 тестов', 'До 100 ответов в месяц', 'Базовая аналитика'],
        action: RoutePath[AppRoutes.REGISTER],
        primary: false
    },
    {
        name: 'Про',
        price: '990 ₽ / мес',
        features: ['Неограниченные тесты', 'Неограниченные ответы', 'Расширенная аналитика', 'Экспорт данных'],
        action: RoutePath[AppRoutes.REGISTER],
        primary: true
    },
    {
        name: 'Команда',
        price: '2 490 ₽ / мес',
        features: ['Всё из Про', 'До 10 пользователей', 'Совместная работа', 'Приоритетная поддержка'],
        action: RoutePath[AppRoutes.REGISTER],
        primary: false
    }
] as const;

const FAQ = [
    {
        q: 'Как добавить картинку в вопрос?',
        a: 'В редакторе вопроса нажмите на иконку вложения и выберите изображение с устройства или вставьте URL.'
    },
    {
        q: 'Можно ли интегрировать форму на сайт?',
        a: 'Да, после публикации теста вы получите ссылку и iframe-код для встраивания на любой сайт.'
    },
    {
        q: 'Сколько стоит использование?',
        a: 'Базовый план бесплатен. Для расширенной аналитики и неограниченного числа вопросов доступны платные тарифы.'
    }
] as const;

export function LandingPageMobile() {
    return (
        <div className='min-h-screen bg-background'>
            {/* Hero */}
            <section className='px-4 pb-12 pt-8 text-center'>
                <div className='mb-6 inline-flex items-center gap-2 rounded-full border border-action/30 bg-action/10 px-4 py-1.5 text-xs text-action'>
                    <span className='size-1.5 rounded-full bg-action' />
                    Новый конструктор тестов 1.0
                </div>

                <h1 className='mb-4 text-3xl font-extrabold leading-tight tracking-tight'>
                    Создавай тесты, которые <span className='text-action'>хочется проходить</span>
                </h1>

                <p className='mb-8 text-sm text-muted-foreground'>
                    Платформа для создания опросов, викторин и форм с элементами геймификации. Собирай ответы играючи.
                </p>

                <div className='flex flex-col gap-3'>
                    <Button variant='action' size='lg' className='w-full rounded-2xl' asChild>
                        <Link to={RoutePath[AppRoutes.REGISTER]}>
                            Начать бесплатно <ArrowRight className='size-4' />
                        </Link>
                    </Button>
                    <Button variant='outline' size='lg' className='w-full rounded-2xl' asChild>
                        <Link to={RoutePath[AppRoutes.QUIZZES]}>Смотреть демо</Link>
                    </Button>
                </div>

                <div className='mt-10 rounded-2xl bg-emerald-50 px-6 py-6 dark:bg-emerald-950/20'>
                    <div className='flex items-end justify-center gap-4'>
                        <div className='mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-white shadow-md dark:bg-card'>
                            <CheckSquare className='size-7 text-action' />
                        </div>
                        <div className='flex h-24 w-24 flex-col items-center justify-center gap-2 rounded-xl bg-white px-4 shadow-md dark:bg-card'>
                            <div className='h-2 w-full rounded-full bg-action/30' />
                            <div className='h-2 w-3/4 rounded-full bg-action' />
                            <div className='h-2 w-full rounded-full bg-action/30' />
                        </div>
                        <div className='mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-white shadow-md dark:bg-card'>
                            <BarChart2 className='size-7 text-action' />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id='features' className='px-4 py-10'>
                <h2 className='mb-1 text-2xl font-bold'>Все, что нужно для аналитики</h2>
                <p className='mb-6 text-sm text-muted-foreground'>Никакого визуального шума, только важные инструменты.</p>
                <div className='space-y-3'>
                    {FEATURES.map(({ icon: Icon, title, desc }) => (
                        <div key={title} className='flex gap-4 rounded-2xl border border-border p-4'>
                            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-action'>
                                <Icon className='size-5 text-action-foreground' />
                            </div>
                            <div>
                                <h3 className='mb-1 font-semibold'>{title}</h3>
                                <p className='text-sm text-muted-foreground'>{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Cases */}
            <section id='cases' className='bg-muted/40 px-4 py-10'>
                <h2 className='mb-1 text-2xl font-bold'>Кейсы использования</h2>
                <p className='mb-6 text-sm text-muted-foreground'>QuizBuilder подходит для самых разных задач.</p>
                <div className='space-y-3'>
                    {CASES.map(({ icon: Icon, title, desc }) => (
                        <div key={title} className='flex gap-4 rounded-2xl border border-border bg-card p-4'>
                            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-action/10'>
                                <Icon className='size-5 text-action' />
                            </div>
                            <div>
                                <h3 className='mb-1 font-semibold'>{title}</h3>
                                <p className='text-sm text-muted-foreground'>{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Pricing */}
            <section id='pricing' className='px-4 py-10'>
                <h2 className='mb-1 text-2xl font-bold'>Простые и честные цены</h2>
                <p className='mb-6 text-sm text-muted-foreground'>Начните бесплатно, масштабируйтесь по мере роста.</p>
                <div className='space-y-3'>
                    {PRICING.map(({ name, price, features, action, primary }) => (
                        <div key={name} className={`rounded-2xl border p-5 ${primary ? 'border-action bg-action/5' : 'border-border'}`}>
                            <div className='mb-3 flex items-center justify-between'>
                                <h3 className='font-bold'>{name}</h3>
                                <span className='text-xl font-extrabold'>{price}</span>
                            </div>
                            <ul className='mb-4 space-y-1.5'>
                                {features.map((f) => (
                                    <li key={f} className='flex items-center gap-2 text-sm text-muted-foreground'>
                                        <span className='size-1.5 shrink-0 rounded-full bg-action' />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <Button variant={primary ? 'action' : 'outline'} className='w-full' asChild>
                                <Link to={action}>Начать</Link>
                            </Button>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ */}
            <section className='bg-muted/40 px-4 py-10'>
                <h2 className='mb-6 text-2xl font-bold'>Вопрос — Ответ</h2>
                <Accordion type='single' collapsible className='space-y-3'>
                    {FAQ.map(({ q, a }) => (
                        <AccordionItem key={q} value={q}>
                            <AccordionTrigger>{q}</AccordionTrigger>
                            <AccordionContent>{a}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
        </div>
    );
}
