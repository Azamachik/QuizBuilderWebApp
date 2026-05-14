import type { Meta, StoryObj } from '@storybook/react-vite';
import { quizReducer } from '@/entities/Quiz';
import { questionReducer } from '@/entities/Question';
import QuizEditorPage from './QuizEditorPage';
import { TooltipDecorator } from '@/shared/config/storybook/decorators/TooltipDecorator';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';
import { RouterDecorator } from '@/shared/config/storybook/decorators/RouterDecorator';

const mockQuiz = {
    id: '1',
    title: 'UX/UI Best Practices Quiz',
    description: 'Проверьте свои знания',
    authorId: '1',
    isPublished: true,
    createdAt: '2023-10-12T00:00:00.000Z',
    attemptsCount: 1240,
    questionsCount: 3
};
const mockQuestions = [
    {
        id: 'q1',
        quizId: '1',
        order: 1,
        text: 'Что такое Закон Фиттса?',
        type: 'single',
        required: true,
        options: [
            { id: 'a', text: 'Чем дальше цель, тем больше времени', isCorrect: true },
            { id: 'b', text: 'Время зависит от количества вариантов', isCorrect: false }
        ]
    },
    {
        id: 'q2',
        quizId: '1',
        order: 2,
        text: 'Какие элементы относятся к UI?',
        type: 'multiple',
        required: false,
        options: [
            { id: 'a', text: 'Типографика', isCorrect: true },
            { id: 'b', text: 'Исследование аудитории', isCorrect: false }
        ]
    },
    {
        id: 'q3',
        quizId: '1',
        order: 3,
        text: 'Опишите опыт работы с UI/UX.',
        type: 'text',
        required: false,
        explanation: 'Расскажите о проектах.',
        options: []
    }
];
const authUser = { id: '1', username: 'admin', email: 'root@mail.ru', token: 'token_admin' };

const meta = {
    title: 'Pages/QuizEditorPage',
    component: QuizEditorPage,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    decorators: [RouterDecorator, TooltipDecorator]
} satisfies Meta<typeof QuizEditorPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
    decorators: [
        StoreDecorator(
            {
                user: { authData: authUser, _inited: true },
                quizzes: { quizzes: [], isLoading: true, currentQuizIsLoading: true } as never,
                questions: { questions: [], formData: [], isLoading: true, isSaving: false } as never
            },
            { quizzes: quizReducer, questions: questionReducer }
        )
    ]
};

export const WithQuestions: Story = {
    decorators: [
        StoreDecorator(
            {
                user: { authData: authUser, _inited: true },
                quizzes: { quizzes: [mockQuiz], isLoading: false, currentQuiz: mockQuiz, currentQuizIsLoading: false } as never,
                questions: { questions: mockQuestions, formData: mockQuestions, isLoading: false, isSaving: false } as never
            },
            { quizzes: quizReducer, questions: questionReducer }
        )
    ]
};

export const Empty: Story = {
    decorators: [
        StoreDecorator(
            {
                user: { authData: authUser, _inited: true },
                quizzes: {
                    quizzes: [mockQuiz],
                    isLoading: false,
                    currentQuiz: { ...mockQuiz, questionsCount: 0 },
                    currentQuizIsLoading: false
                } as never,
                questions: { questions: [], formData: [], isLoading: false, isSaving: false } as never
            },
            { quizzes: quizReducer, questions: questionReducer }
        )
    ]
};

export const Saving: Story = {
    decorators: [
        StoreDecorator(
            {
                user: { authData: authUser, _inited: true },
                quizzes: { quizzes: [mockQuiz], isLoading: false, currentQuiz: mockQuiz, currentQuizIsLoading: false } as never,
                questions: { questions: mockQuestions, formData: mockQuestions, isLoading: false, isSaving: true } as never
            },
            { quizzes: quizReducer, questions: questionReducer }
        )
    ]
};
