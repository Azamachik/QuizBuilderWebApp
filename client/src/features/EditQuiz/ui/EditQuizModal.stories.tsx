import type { Meta, StoryObj } from '@storybook/react-vite';
import { EditQuizModal } from './EditQuizModal';
import { StoreDecorator } from '@/shared/config/storybook/decorators/StoreDecorator';

const mockQuiz = {
    id: '1', title: 'UX/UI Best Practices Quiz',
    description: 'Проверьте свои знания в области UX/UI дизайна',
    authorId: '1', isPublished: true,
    createdAt: '2023-10-12T00:00:00.000Z', attemptsCount: 1240, questionsCount: 5,
};

const meta = {
    title: 'Features/EditQuiz/EditQuizModal',
    component: EditQuizModal,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    decorators: [StoreDecorator({ user: { authData: { id: '1', username: 'admin', token: 'token' }, _inited: true } })],
} satisfies Meta<typeof EditQuizModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithQuiz: Story = {
    args: { quiz: mockQuiz, onOpenChange: () => {} },
};

export const WithLongDescription: Story = {
    args: {
        quiz: {
            ...mockQuiz, title: 'Полный курс по UX исследованиям',
            description: 'Данный тест охватывает все аспекты пользовательских исследований: от интервью до A/B тестирования.',
        },
        onOpenChange: () => {},
    },
};

export const Closed: Story = {
    args: { quiz: null, onOpenChange: () => {} },
};
