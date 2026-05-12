import type { Meta, StoryObj } from '@storybook/react-vite';
import { inviteLinkReducer } from '@/entities/InviteLink';
import { attemptReducer } from '@/entities/Attempt';
import QuizResultsPage from './QuizResultsPage';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';

const mockQuiz = { id: '1', title: 'UX/UI Best Practices Quiz', description: 'Проверьте свои знания', authorId: '1', isPublished: true, createdAt: '2023-10-12T00:00:00.000Z', attemptsCount: 1241, questionsCount: 2 };
const mockLink = { id: 'il1', quizId: '1', token: 'demo-token', label: 'Общая ссылка', maxUses: null, usedCount: 5, expiresAt: null, isActive: true, createdAt: '2023-10-12T00:00:00.000Z', createdBy: '1' };
const mockQuestions = [
    { id: 'q1', quizId: '1', order: 1, text: 'Что такое Закон Фиттса?', type: 'single', required: true, options: [{ id: 'a', text: 'Чем дальше цель, тем больше времени', isCorrect: true }, { id: 'b', text: 'Время зависит от вариантов', isCorrect: false }] },
    { id: 'q2', quizId: '1', order: 2, text: 'Опишите опыт UI/UX.', type: 'text', required: false, explanation: 'Расскажите о проектах.', options: [] },
];
const baseAttempt = { id: 'a1', quizId: '1', quizTitle: 'UX/UI Best Practices Quiz', inviteLinkToken: 'demo-token', label: 'Общая ссылка', createdAt: new Date().toISOString(), completedAt: new Date().toISOString() };

const meta = {
    title: 'Pages/QuizResultsPage',
    component: QuizResultsPage,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    decorators: [RouterDecorator],
} satisfies Meta<typeof QuizResultsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
    decorators: [StoreDecorator(
        { user: { authData: undefined, _inited: true }, inviteLink: { isLoading: true } as never, attempt: { isLoading: true, isSubmitting: false, sessionQuestions: [] } as never },
        { inviteLink: inviteLinkReducer, attempt: attemptReducer },
    )],
};

export const GoodResult: Story = {
    name: 'Good result (50%)',
    decorators: [StoreDecorator(
        { user: { authData: undefined, _inited: true }, inviteLink: { session: { inviteLink: mockLink, quiz: mockQuiz, questions: mockQuestions }, isLoading: false } as never, attempt: { currentAttempt: { ...baseAttempt, answers: [{ questionId: 'q1', selectedOptionIds: ['a'] }, { questionId: 'q2', selectedOptionIds: [], textAnswer: 'Figma 3 года' }], score: 1, total: 1 }, isLoading: false, isSubmitting: false, sessionQuestions: mockQuestions } as never },
        { inviteLink: inviteLinkReducer, attempt: attemptReducer },
    )],
};

export const ZeroResult: Story = {
    name: 'Zero result (0%)',
    decorators: [StoreDecorator(
        { user: { authData: undefined, _inited: true }, inviteLink: { session: { inviteLink: mockLink, quiz: mockQuiz, questions: mockQuestions }, isLoading: false } as never, attempt: { currentAttempt: { ...baseAttempt, answers: [{ questionId: 'q1', selectedOptionIds: ['b'] }, { questionId: 'q2', selectedOptionIds: [] }], score: 0, total: 1 }, isLoading: false, isSubmitting: false, sessionQuestions: mockQuestions } as never },
        { inviteLink: inviteLinkReducer, attempt: attemptReducer },
    )],
};

export const LinkExhausted: Story = {
    name: 'Link exhausted (retry blocked)',
    decorators: [StoreDecorator(
        { user: { authData: undefined, _inited: true }, inviteLink: { session: { inviteLink: { ...mockLink, maxUses: 5, usedCount: 5 }, quiz: mockQuiz, questions: mockQuestions }, isLoading: false } as never, attempt: { currentAttempt: { ...baseAttempt, answers: [{ questionId: 'q1', selectedOptionIds: ['a'] }], score: 1, total: 1 }, isLoading: false, isSubmitting: false, sessionQuestions: mockQuestions } as never },
        { inviteLink: inviteLinkReducer, attempt: attemptReducer },
    )],
};

export const NotFound: Story = {
    decorators: [StoreDecorator(
        { user: { authData: undefined, _inited: true }, inviteLink: { isLoading: false } as never, attempt: { isLoading: false, isSubmitting: false, sessionQuestions: [] } as never },
        { inviteLink: inviteLinkReducer, attempt: attemptReducer },
    )],
};
