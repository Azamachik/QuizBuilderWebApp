import type { Meta, StoryObj } from '@storybook/react-vite';
import { quizReducer } from '@/entities/Quiz';
import QuizzesPage from './QuizzesPage';
import { BrowserDecorator } from '@/shared/config/storybook/decorators/BrowserDecorator';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';
import { TooltipDecorator } from '@/shared/config/storybook/decorators/TooltipDecorator';

const mockQuizzes = [
    { id: '1', title: 'UX/UI Best Practices Quiz', description: 'Проверьте свои знания в области UX/UI дизайна', authorId: '1', isPublished: true, createdAt: '2023-10-12T00:00:00.000Z', attemptsCount: 1240, questionsCount: 5 },
    { id: '2', title: 'Figma Shortcuts Masterclass', description: '', authorId: '1', isPublished: false, createdAt: '2023-10-12T00:00:00.000Z', attemptsCount: 389, questionsCount: 12 },
    { id: '3', title: 'TypeScript Advanced Patterns', description: 'Продвинутые паттерны TypeScript', authorId: '1', isPublished: true, createdAt: '2024-03-01T00:00:00.000Z', attemptsCount: 5600, questionsCount: 30 },
];

const authUser = { id: '1', username: 'admin', email: 'root@mail.ru', token: 'token_admin' };

const meta = {
    title: 'Pages/QuizzesPage',
    component: QuizzesPage,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    decorators: [BrowserDecorator, TooltipDecorator],
} satisfies Meta<typeof QuizzesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
    decorators: [StoreDecorator(
        { user: { authData: authUser, _inited: true }, quizzes: { quizzes: [], isLoading: true, currentQuizIsLoading: false } as never },
        { quizzes: quizReducer },
    )],
};

export const WithQuizzes: Story = {
    decorators: [StoreDecorator(
        { user: { authData: authUser, _inited: true }, quizzes: { quizzes: mockQuizzes, isLoading: false, currentQuizIsLoading: false } as never },
        { quizzes: quizReducer },
    )],
};

export const Empty: Story = {
    decorators: [StoreDecorator(
        { user: { authData: authUser, _inited: true }, quizzes: { quizzes: [], isLoading: false, currentQuizIsLoading: false } as never },
        { quizzes: quizReducer },
    )],
};

export const ManyQuizzes: Story = {
    decorators: [StoreDecorator(
        {
            user: { authData: authUser, _inited: true },
            quizzes: {
                quizzes: Array.from({ length: 9 }, (_, i) => ({
                    id: String(i + 1), title: `Тест ${i + 1}`, description: '',
                    authorId: '1', isPublished: i % 3 !== 0,
                    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
                    attemptsCount: (i + 1) * 100, questionsCount: (i + 1) * 2,
                })),
                isLoading: false, currentQuizIsLoading: false,
            } as never,
        },
        { quizzes: quizReducer },
    )],
};
