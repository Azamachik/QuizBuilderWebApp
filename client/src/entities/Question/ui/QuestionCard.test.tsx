import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuestionCard } from './QuestionCard';
import { renderWithProviders } from '@/test/renderWithProviders';
import type { Question } from '../model/types/Question';

vi.mock('@/shared/assets/icons/clip.svg?react', () => ({ default: () => null }));

const singleQuestion: Question = {
    id: 'q1',
    quizId: 'quiz1',
    order: 1,
    text: 'Что такое Закон Фиттса?',
    type: 'single',
    options: [
        { id: 'o1', text: 'Правильный ответ', isCorrect: true },
        { id: 'o2', text: 'Неправильный ответ', isCorrect: false }
    ],
    required: true
};

const textQuestion: Question = {
    id: 'q2',
    quizId: 'quiz1',
    order: 2,
    text: 'Опишите ваш опыт.',
    type: 'text',
    options: [],
    required: false,
    explanation: 'Расскажите подробно.'
};

const defaultProps = {
    isDragging: false,
    isEditing: false,
    onDelete: vi.fn(),
    onDuplicate: vi.fn(),
    onToggleRequired: vi.fn(),
    onEdit: vi.fn(),
    onDragStart: vi.fn(),
    onDragEnter: vi.fn(),
    onDrop: vi.fn(),
    onDragEnd: vi.fn()
};

describe('QuestionCard', () => {
    describe('rendering', () => {
        it('displays question text', () => {
            renderWithProviders(<QuestionCard {...defaultProps} question={singleQuestion} />);
            expect(screen.getByText('Что такое Закон Фиттса?')).toBeInTheDocument();
        });

        it('shows type label', () => {
            renderWithProviders(<QuestionCard {...defaultProps} question={singleQuestion} />);
            expect(screen.getByText('Одиночный выбор')).toBeInTheDocument();
        });

        it('renders options for single-choice question', () => {
            renderWithProviders(<QuestionCard {...defaultProps} question={singleQuestion} />);
            expect(screen.getByText('Правильный ответ')).toBeInTheDocument();
            expect(screen.getByText('Неправильный ответ')).toBeInTheDocument();
        });

        it('shows "Развернутый ответ" placeholder for text question', () => {
            renderWithProviders(<QuestionCard {...defaultProps} question={textQuestion} />);
            expect(screen.getByText('Развернутый ответ')).toBeInTheDocument();
        });

        it('shows explanation when present', () => {
            renderWithProviders(<QuestionCard {...defaultProps} question={textQuestion} />);
            expect(screen.getByText('Расскажите подробно.')).toBeInTheDocument();
        });

        it('does not show explanation block when absent', () => {
            renderWithProviders(<QuestionCard {...defaultProps} question={singleQuestion} />);
            expect(screen.queryByText('Пояснение')).toBeNull();
        });

        it('applies opacity class when dragging', () => {
            const { container } = renderWithProviders(<QuestionCard {...defaultProps} question={singleQuestion} isDragging={true} />);
            expect(container.firstChild).toHaveClass('opacity-40');
        });

        it('shows "Вопрос без текста" for empty question text', () => {
            renderWithProviders(<QuestionCard {...defaultProps} question={{ ...singleQuestion, text: '' }} />);
            expect(screen.getByText('Вопрос без текста')).toBeInTheDocument();
        });
    });

    describe('callbacks', () => {
        it('calls onDuplicate with question id when duplicate button clicked', async () => {
            const onDuplicate = vi.fn();
            renderWithProviders(<QuestionCard {...defaultProps} question={singleQuestion} onDuplicate={onDuplicate} />);
            await userEvent.click(screen.getAllByRole('button')[0]);
            expect(onDuplicate).toHaveBeenCalledWith('q1');
        });

        it('calls onEdit with question when edit button clicked', async () => {
            const onEdit = vi.fn();
            renderWithProviders(<QuestionCard {...defaultProps} question={singleQuestion} onEdit={onEdit} />);
            await userEvent.click(screen.getAllByRole('button')[1]);
            expect(onEdit).toHaveBeenCalledWith(singleQuestion);
        });

        it('calls onToggleRequired when switch toggled', async () => {
            const onToggleRequired = vi.fn();
            renderWithProviders(<QuestionCard {...defaultProps} question={singleQuestion} onToggleRequired={onToggleRequired} />);
            const switchEl = screen.getByRole('switch');
            await userEvent.click(switchEl);
            expect(onToggleRequired).toHaveBeenCalledWith('q1');
        });
    });

    describe('required switch', () => {
        it('switch is checked when question is required', () => {
            renderWithProviders(<QuestionCard {...defaultProps} question={singleQuestion} />);
            expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
        });

        it('switch is unchecked when question is not required', () => {
            renderWithProviders(<QuestionCard {...defaultProps} question={textQuestion} />);
            expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
        });
    });
});
