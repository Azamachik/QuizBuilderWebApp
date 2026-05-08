import { ArrowRight, BarChart2, CheckSquare, List, Lock, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/Button/Button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/Accordion/Accordion';
import { RoutePath, AppRoutes } from '@/shared/config/routeConfig/routeConfig';

const FEATURES = [
    {
        icon: List,
        title: 'Множественный выбор',
        desc: 'Удобные настройки вариантов ответов с поддержкой медиафайлов.'
    },
    {
        icon: Timer,
        title: 'Глубокая аналитика',
        desc: 'Следите за конверсией, временем прохождения и сложными вопросами.'
    },
    {
        icon: Lock,
        title: 'Приватность',
        desc: 'Ваши данные и ответы пользователей зашифрованы и надёжно защищены.'
    }
];

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
];

export default function LandingPage() {
    return (
        <div className='min-h-screen bg-background'>
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

            <section className='mx-auto max-w-4xl px-6 py-8 text-center'>
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

            <section className='mx-auto max-w-2xl px-6 py-8'>
                <h2 className='mb-10 text-center text-3xl font-bold'>Вопрос — Ответ</h2>
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
