import type { Meta, StoryObj } from '@storybook/react-vite';
import { inviteLinkReducer } from '@/entities/InviteLink';
import { attemptReducer } from '@/entities/Attempt';
import QuizTakingPage from './QuizTakingPage';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';

const mockQuiz = { id: '1', title: 'UX/UI Best Practices Quiz', description: 'Проверьте свои знания', authorId: '1', isPublished: true, createdAt: '2023-10-12T00:00:00.000Z', attemptsCount: 1240, questionsCount: 3 };
const mockLink = { id: 'il1', quizId: '1', token: 'demo-token', label: 'Общая ссылка', maxUses: null, usedCount: 4, expiresAt: null, isActive: true, createdAt: '2023-10-12T00:00:00.000Z', createdBy: '1' };
const mockQuestions = [
    { id: 'q1', quizId: '1', order: 1, text: 'Что такое Закон Фиттса?', type: 'single', required: true, options: [{ id: 'a', text: 'Чем дальше цель, тем больше времени', isCorrect: true }, { id: 'b', text: 'Время зависит от вариантов', isCorrect: false }, { id: 'c', text: 'Первое и последнее запоминается лучше', isCorrect: false }] },
    { id: 'q2', quizId: '1', order: 2, text: 'Какие элементы относятся к UI?', type: 'multiple', required: false, options: [{ id: 'a', text: 'Типографика', isCorrect: true }, { id: 'b', text: 'Исследование аудитории', isCorrect: false }] },
    { id: 'q3', quizId: '1', order: 3, text: 'Опишите ваш опыт.', type: 'text', required: false, options: [] },
];


const meta = {
    title: 'Pages/QuizTakingPage',
    component: QuizTakingPage,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    decorators: [RouterDecorator],
} satisfies Meta<typeof QuizTakingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
    decorators: [StoreDecorator(
        { user: { authData: undefined, _inited: true }, inviteLink: { isLoading: true } as never, attempt: { isLoading: false, isSubmitting: false, sessionQuestions: [] } as never },
        { inviteLink: inviteLinkReducer, attempt: attemptReducer },
    )],
};

export const FirstQuestion: Story = {
    decorators: [StoreDecorator(
        { user: { authData: undefined, _inited: true }, inviteLink: { session: { inviteLink: mockLink, quiz: mockQuiz, questions: mockQuestions }, isLoading: false } as never, attempt: { isLoading: false, isSubmitting: false, sessionQuestions: [] } as never },
        { inviteLink: inviteLinkReducer, attempt: attemptReducer },
    )],
};

export const Error: Story = {
    decorators: [StoreDecorator(
        { user: { authData: undefined, _inited: true }, inviteLink: { isLoading: false, error: 'Ссылка недействительна или тест не опубликован' } as never, attempt: { isLoading: false, isSubmitting: false, sessionQuestions: [] } as never },
        { inviteLink: inviteLinkReducer, attempt: attemptReducer },
    )],
};

export const NoQuestions: Story = {
    decorators: [StoreDecorator(
        { user: { authData: undefined, _inited: true }, inviteLink: { session: { inviteLink: mockLink, quiz: { ...mockQuiz, questionsCount: 0 }, questions: [] }, isLoading: false } as never, attempt: { isLoading: false, isSubmitting: false, sessionQuestions: [] } as never },
        { inviteLink: inviteLinkReducer, attempt: attemptReducer },
    )],
};
