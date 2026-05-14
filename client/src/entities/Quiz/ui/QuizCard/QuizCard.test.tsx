import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuizCard } from './QuizCard';
import { renderWithProviders } from '@/test/renderWithProviders';
import type { Quiz } from '../../model/types/Quiz';

const mockQuiz: Quiz = {
    id: '42',
    title: 'TypeScript Advanced',
    authorId: 'user1',
    isPublished: true,
    createdAt: '2024-03-15T00:00:00.000Z',
    attemptsCount: 1240,
    questionsCount: 10
};

const defaultProps = {
    quiz: mockQuiz,
    onEdit: vi.fn(),
    onToggleStatus: vi.fn(),
    onCreateLink: vi.fn(),
    onDelete: vi.fn()
};

// Button layout when NOT in confirmation mode (isPublished=true):
// [0] StatusBadge button ("Опубликован")  → onToggleStatus
// [1] Toggle-status icon button            → onToggleStatus
// [2] Create-link icon button              → onCreateLink
// [3] Edit icon button                     → onEdit
// [4] Delete icon button                   → handleDeleteClick
//
// Button layout in confirmation mode:
// [0] StatusBadge button (still rendered)
// [1] Confirm-delete button                → onDelete
// [2] Cancel button                        → setConfirming(false)

describe('QuizCard', () => {
    describe('rendering', () => {
        it('displays quiz title', () => {
            renderWithProviders(<QuizCard {...defaultProps} />);
            expect(screen.getByText('TypeScript Advanced')).toBeInTheDocument();
        });

        it('displays question count', () => {
            renderWithProviders(<QuizCard {...defaultProps} />);
            expect(screen.getByText('10 вопр.')).toBeInTheDocument();
        });

        it('displays attempts count', () => {
            renderWithProviders(<QuizCard {...defaultProps} />);
            // toLocaleString('ru-RU') may use a narrow no-break space (U+202F) in Node.js
            expect(screen.getByText(/1.?240/)).toBeInTheDocument();
        });

        it('renders link to quiz editor', () => {
            renderWithProviders(<QuizCard {...defaultProps} />);
            expect(screen.getByRole('link')).toHaveAttribute('href', '/quizzes/42');
        });

        it('renders status badge', () => {
            renderWithProviders(<QuizCard {...defaultProps} />);
            expect(screen.getByText('Опубликован')).toBeInTheDocument();
        });

        it('shows "Черновик" for draft quiz', () => {
            renderWithProviders(<QuizCard {...defaultProps} quiz={{ ...mockQuiz, isPublished: false }} />);
            expect(screen.getByText('Черновик')).toBeInTheDocument();
        });
    });

    describe('callbacks', () => {
        it('calls onToggleStatus when status badge clicked', async () => {
            const onToggleStatus = vi.fn();
            renderWithProviders(<QuizCard {...defaultProps} onToggleStatus={onToggleStatus} />);
            await userEvent.click(screen.getByText('Опубликован'));
            expect(onToggleStatus).toHaveBeenCalledWith(mockQuiz);
        });

        it('calls onCreateLink when link button clicked', async () => {
            const onCreateLink = vi.fn();
            renderWithProviders(<QuizCard {...defaultProps} onCreateLink={onCreateLink} />);
            await userEvent.click(screen.getAllByRole('button')[2]);
            expect(onCreateLink).toHaveBeenCalledWith(mockQuiz);
        });

        it('calls onEdit when edit button clicked', async () => {
            const onEdit = vi.fn();
            renderWithProviders(<QuizCard {...defaultProps} onEdit={onEdit} />);
            await userEvent.click(screen.getAllByRole('button')[3]);
            expect(onEdit).toHaveBeenCalledWith(mockQuiz);
        });
    });

    describe('delete confirmation flow', () => {
        it('shows confirmation prompt on first delete click', async () => {
            renderWithProviders(<QuizCard {...defaultProps} />);
            await userEvent.click(screen.getAllByRole('button')[4]);
            expect(screen.getByText('Удалить?')).toBeInTheDocument();
        });

        it('calls onDelete on second (confirmed) click', async () => {
            const onDelete = vi.fn();
            renderWithProviders(<QuizCard {...defaultProps} onDelete={onDelete} />);
            await userEvent.click(screen.getAllByRole('button')[4]);
            await userEvent.click(screen.getAllByRole('button')[1]);
            expect(onDelete).toHaveBeenCalledWith(mockQuiz.id);
        });

        it('cancels delete when X button clicked', async () => {
            const onDelete = vi.fn();
            renderWithProviders(<QuizCard {...defaultProps} onDelete={onDelete} />);
            await userEvent.click(screen.getAllByRole('button')[4]);
            await userEvent.click(screen.getAllByRole('button')[2]);
            expect(screen.queryByText('Удалить?')).toBeNull();
            expect(onDelete).not.toHaveBeenCalled();
        });
    });
});
