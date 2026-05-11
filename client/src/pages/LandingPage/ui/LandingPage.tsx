import { ArrowRight, BarChart2, CheckSquare, List, Lock, Timer, Users, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/Button/Button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/Accordion/Accordion';
import { RoutePath, AppRoutes } from '@/shared/config/routeConfig/routeConfig';
import { useIsMobile } from '@/shared/lib/helpers/hooks/useIsMobile';
import { LandingPageMobile } from './LandingPage.mobile';

const FEATURES = [
    {
        icon: List,
        title: 'Множественный выбор',
        desc: 'Удобные настройки вариантов ответов с поддержкой медиафайлов.',
    },
    {
        icon: Timer,
        title: 'Глубокая аналитика',
        desc: 'Следите за конверсией, временем прохождения и сложными вопросами.',
    },
    {
        icon: Lock,
        title: 'Приватность',
        desc: 'Ваши данные и ответы пользователей зашифрованы и надёжно защищены.',
    },
];

const CASES = [
    {
        icon: Users,
        title: 'HR и онбординг',
        desc: 'Проверяйте знания новых сотрудников и упрощайте адаптацию с помощью интерактивных тестов.',
    },
    {
        icon: Zap,
        title: 'Образование',
        desc: 'Создавайте курсы и контрольные работы с мгновенной проверкой результатов.',
    },
    {
        icon: Shield,
        title: 'Маркетинг и вовлечение',
        desc: 'Квизы, опросы и викторины для захвата лидов и удержания аудитории.',
    },
];

const PRICING = [
    {
        name: 'Бесплатно',
        price: '0 ₽',
        features: ['До 5 тестов', 'До 100 ответов в месяц', 'Базовая аналитика'],
        action: RoutePath[AppRoutes.REGISTER],
        primary: false,
    },
    {
        name: 'Про',
        price: '990 ₽ / мес',
        features: ['Неограниченные тесты', 'Неограниченные ответы', 'Расширенная аналитика', 'Экспорт данных'],
        action: RoutePath[AppRoutes.REGISTER],
        primary: true,
    },
    {
        name: 'Команда',
        price: '2 490 ₽ / мес',
        features: ['Всё из Про', 'До 10 пользователей', 'Совместная работа', 'Приоритетная поддержка'],
        action: RoutePath[AppRoutes.REGISTER],
        primary: false,
    },
];

const FAQ = [
    {
        q: 'Как добавить картинку в вопрос?',
        a: 'В редакторе вопроса нажмите на иконку вложения и выберите изображение с устройства или вставьте URL.',
    },
    {
        q: 'Можно ли интегрировать форму на сайт?',
        a: 'Да, после публикации теста вы получите ссылку и iframe-код для встраивания на любой сайт.',
    },
    {
        q: 'Сколько стоит использование?',
        a: 'Базовый план бесплатен. Для расширенной аналитики и неограниченного числа вопросов доступны платные тарифы.',
    },
];

export default function LandingPage() {
    const isMobile = useIsMobile();
    if (isMobile) return <LandingPageMobile />;
    return (
        <div className='min-h-screen bg-background'>
            {/* Hero */}
            <section className='mx-auto max-w-4xl px-6 pb-16 pt-8 text-center'>
                <div className='mb-8 inline-flex items-center gap-2 rounded-full border border-action/30 bg-action/10 px-4 py-1.5 text-xs text-action'>
                    <span className='size-1.5 rounded-full bg-action' />
                    Новый конструктор тестов 1.0
                </div>

                <h1 className='mb-5 text-5xl font-extrabold leading-tight tracking-tight'>
                    Создавай тесты, которые
                    <br />
                    <span className='text-action'>хочется проходить</span>
                </h1>

                <p className='mx-auto mb-10 max-w-lg text-base text-muted-foreground'>
                    Платформа для создания опросов, викторин и форм с элементами геймификации. Собирай ответы играючи.
                </p>

                <div className='flex items-center justify-center gap-3'>
                    <Button variant='action' size='lg' className='rounded-2xl' asChild>
                        <Link to={RoutePath[AppRoutes.REGISTER]}>
                            Начать бесплатно
                            <ArrowRight className='size-4' />
                        </Link>
                    </Button>
                    <Button variant='outline' size='lg' className='rounded-2xl' asChild>
                        <Link to={RoutePath[AppRoutes.QUIZZES]}>Смотреть демо</Link>
                    </Button>
                </div>

                <div className='mt-14 rounded-3xl bg-emerald-50 px-10 py-8 dark:bg-emerald-950/20'>
                    <div className='flex items-end justify-center gap-6'>
                        <div className='mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-white shadow-md dark:bg-card'>
                            <CheckSquare className='size-9 text-action' />
                        </div>
                        <div className='flex h-32 w-32 flex-col items-center justify-center gap-2 rounded-2xl bg-white px-5 shadow-md dark:bg-card'>
                            <div className='h-2 w-full rounded-full bg-action/30' />
                            <div className='h-2 w-3/4 rounded-full bg-action' />
                            <div className='h-2 w-full rounded-full bg-action/30' />
                        </div>
                        <div className='mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-white shadow-md dark:bg-card'>
                            <BarChart2 className='size-9 text-action' />
                        </div>
                    </div>
                </div>
            </section>

            {/* Возможности */}
            <section id='features' className='mx-auto max-w-4xl px-6 py-16 text-center'>
                <h2 className='mb-2 text-3xl font-bold'>Все, что нужно для аналитики</h2>
                <p className='mb-12 text-muted-foreground'>Никакого визуального шума, только важные инструменты.</p>

                <div className='grid grid-cols-3 gap-4'>
                    {FEATURES.map(({ icon: Icon, title, desc }) => (
                        <div key={title} className='rounded-2xl border border-border p-6 text-left'>
                            <div className='mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-action'>
                                <Icon className='size-5 text-action-foreground' />
                            </div>
                            <h3 className='mb-2 font-semibold'>{title}</h3>
                            <p className='text-sm text-muted-foreground'>{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Кейсы */}
            <section id='cases' className='bg-muted/40 py-16'>
                <div className='mx-auto max-w-4xl px-6 text-center'>
                    <h2 className='mb-2 text-3xl font-bold'>Кейсы использования</h2>
                    <p className='mb-12 text-muted-foreground'>QuizBuilder подходит для самых разных задач.</p>

                    <div className='grid grid-cols-3 gap-4'>
                        {CASES.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className='rounded-2xl border border-border bg-card p-6 text-left'>
                                <div className='mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-action/10'>
                                    <Icon className='size-5 text-action' />
                                </div>
                                <h3 className='mb-2 font-semibold'>{title}</h3>
                                <p className='text-sm text-muted-foreground'>{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Цены */}
            <section id='pricing' className='mx-auto max-w-4xl px-6 py-16 text-center'>
                <h2 className='mb-2 text-3xl font-bold'>Простые и честные цены</h2>
                <p className='mb-12 text-muted-foreground'>Начните бесплатно, масштабируйтесь по мере роста.</p>

                <div className='grid grid-cols-3 gap-4'>
                    {PRICING.map(({ name, price, features, action, primary }) => (
                        <div
                            key={name}
                            className={`flex flex-col rounded-2xl border p-6 text-left ${
                                primary ? 'border-action bg-action/5' : 'border-border'
                            }`}
                        >
                            <h3 className='mb-1 font-bold'>{name}</h3>
                            <p className='mb-6 text-2xl font-extrabold'>{price}</p>
                            <ul className='mb-8 flex-1 space-y-2'>
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
            <section className='bg-muted/40 py-16'>
                <div className='mx-auto max-w-2xl px-6'>
                    <h2 className='mb-10 text-center text-3xl font-bold'>Вопрос — Ответ</h2>
                    <Accordion type='single' collapsible className='space-y-3'>
                        {FAQ.map(({ q, a }) => (
                            <AccordionItem key={q} value={q}>
                                <AccordionTrigger>{q}</AccordionTrigger>
                                <AccordionContent>{a}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>
        </div>
    );
}
