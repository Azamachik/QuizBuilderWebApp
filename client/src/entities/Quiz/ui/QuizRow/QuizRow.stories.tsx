import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { QuizRow } from './QuizRow';
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
    title: 'Entities/Quiz/QuizRow',
    component: QuizRow,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
    decorators: [
        TooltipDecorator,
        BrowserDecorator,
        (Story) => (
            <div className='max-w-3xl'>
                <Story />
            </div>
        )
    ],
    args: { onEdit: fn(), onToggleStatus: fn(), onCreateLink: fn(), onDelete: fn() }
} satisfies Meta<typeof QuizRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Published: Story = { args: { quiz: mockQuiz } };
export const Draft: Story = { args: { quiz: { ...mockQuiz, isPublished: false, attemptsCount: 0 } } };
export const NoQuestions: Story = { args: { quiz: { ...mockQuiz, questionsCount: 0, isPublished: false } } };

export const List: Story = {
    args: { quiz: mockQuiz },
    render: (args) => (
        <div className='space-y-3'>
            <QuizRow {...args} quiz={mockQuiz} />
            <QuizRow
                {...args}
                quiz={{ ...mockQuiz, id: '2', title: 'Figma Shortcuts', isPublished: false, attemptsCount: 389, questionsCount: 12 }}
            />
            <QuizRow
                {...args}
                quiz={{ ...mockQuiz, id: '3', title: 'TypeScript Advanced', isPublished: true, attemptsCount: 5600, questionsCount: 30 }}
            />
        </div>
    )
};
