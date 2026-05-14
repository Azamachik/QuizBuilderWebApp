import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { QuizCard } from './QuizCard';
import { TooltipDecorator } from '@/shared/config/storybook/decorators/TooltipDecorator';
import { BrowserDecorator } from '@/shared/config/storybook/decorators/BrowserDecorator';

const mockQuiz = {
    id: '1',
    title: 'UX/UI Best Practices Quiz',
    description: 'Проверьте свои знания в области UX/UI дизайна',
    authorId: '1',
    isPublished: true,
    createdAt: '2023-10-12T00:00:00.000Z',
    attemptsCount: 1240,
    questionsCount: 5
};

const meta = {
    title: 'Entities/Quiz/QuizCard',
    component: QuizCard,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    decorators: [TooltipDecorator, BrowserDecorator],
    args: { onEdit: fn(), onToggleStatus: fn(), onCreateLink: fn(), onDelete: fn() }
} satisfies Meta<typeof QuizCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Published: Story = { args: { quiz: mockQuiz } };
export const Draft: Story = { args: { quiz: { ...mockQuiz, isPublished: false, attemptsCount: 0 } } };
export const NoQuestions: Story = { args: { quiz: { ...mockQuiz, questionsCount: 0, title: 'Пустой тест', isPublished: false } } };
export const HighTraffic: Story = { args: { quiz: { ...mockQuiz, attemptsCount: 98432, questionsCount: 20, title: 'Популярный тест' } } };
export const LongTitle: Story = {
    args: {
        quiz: {
            ...mockQuiz,
            title: 'Очень длинное название теста о проектировании пользовательских интерфейсов',
            description: 'Подробное описание теста для практикующих дизайнеров'
        }
    }
};
