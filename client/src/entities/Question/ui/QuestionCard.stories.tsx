import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { QuestionCard } from './QuestionCard';
import { TooltipDecorator } from '@/shared/config/storybook/decorators/TooltipDecorator';

const dragHandlers = { onDragStart: fn(), onDragEnter: fn(), onDrop: fn(), onDragEnd: fn() };
const handlers = { onDelete: fn(), onDuplicate: fn(), onToggleRequired: fn(), onEdit: fn(), ...dragHandlers };

const singleQuestion = {
    id: 'q1',
    quizId: '1',
    order: 1,
    text: 'Что такое Закон Фиттса?',
    type: 'single' as const,
    required: true,
    options: [
        { id: 'a', text: 'Чем дальше и меньше цель, тем больше времени требуется', isCorrect: true },
        { id: 'b', text: 'Время принятия решения зависит от количества вариантов', isCorrect: false },
        { id: 'c', text: 'Люди запоминают первую и последнюю часть информации лучше', isCorrect: false }
    ]
};

const multipleQuestion = {
    id: 'q2',
    quizId: '1',
    order: 2,
    text: 'Какие из этих элементов относятся к UI?',
    type: 'multiple' as const,
    required: false,
    options: [
        { id: 'a', text: 'Типографика', isCorrect: true },
        { id: 'b', text: 'Исследование аудитории', isCorrect: false },
        { id: 'c', text: 'Цветовая палитра', isCorrect: true }
    ]
};

const textQuestion = {
    id: 'q3',
    quizId: '1',
    order: 3,
    text: 'Опишите ваш опыт работы с UI/UX.',
    type: 'text' as const,
    required: false,
    explanation: 'Расскажите о своих проектах и используемых инструментах.',
    options: []
};

const meta = {
    title: 'Entities/Question/QuestionCard',
    component: QuestionCard,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
    decorators: [
        TooltipDecorator,
        (Story) => (
            <div className='max-w-2xl'>
                <Story />
            </div>
        )
    ],
    args: { ...handlers, isDragging: false, isEditing: false }
} satisfies Meta<typeof QuestionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleChoice: Story = { args: { question: singleQuestion } };
export const MultipleChoice: Story = { args: { question: multipleQuestion } };
export const TextAnswer: Story = { args: { question: textQuestion } };
export const Required: Story = { args: { question: { ...singleQuestion, required: true } } };
export const Optional: Story = { args: { question: { ...singleQuestion, required: false } } };
export const Dragging: Story = { args: { question: singleQuestion, isDragging: true } };
export const Editing: Story = { args: { question: singleQuestion, isEditing: true } };

export const AllTypes: Story = {
    args: { question: singleQuestion },
    render: (args) => (
        <div className='space-y-3'>
            <QuestionCard {...args} question={singleQuestion} />
            <QuestionCard {...args} question={multipleQuestion} />
            <QuestionCard {...args} question={textQuestion} />
        </div>
    )
};
