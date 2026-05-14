import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuizRow } from './QuizRow';
import { renderWithProviders } from '@/test/renderWithProviders';
import type { Quiz } from '../../model/types/Quiz';

const mockQuiz: Quiz = {
    id: '7',
    title: 'React Performance',
    authorId: 'user1',
    isPublished: false,
    createdAt: '2024-06-01T00:00:00.000Z',
    attemptsCount: 820,
    questionsCount: 18
};

const defaultProps = {
    quiz: mockQuiz,
    onEdit: vi.fn(),
    onToggleStatus: vi.fn(),
    onCreateLink: vi.fn(),
    onDelete: vi.fn()
};

// Button layout when NOT in confirmation mode (isPublished=false):
// [0] StatusBadge button ("Черновик")  → onToggleStatus
// [1] Toggle-status icon button         → onToggleStatus
// [2] Create-link icon button           → onCreateLink
// [3] Edit icon button                  → onEdit
// [4] Delete icon button                → handleDeleteClick
//
// Button layout in confirmation mode:
// [0] StatusBadge button (still rendered)
// [1] Confirm-delete button             → onDelete
// [2] Cancel button                     → setConfirming(false)

describe('QuizRow', () => {
    describe('rendering', () => {
        it('displays quiz title', () => {
            renderWithProviders(<QuizRow {...defaultProps} />);
            expect(screen.getByText('React Performance')).toBeInTheDocument();
        });

        it('displays question count', () => {
            renderWithProviders(<QuizRow {...defaultProps} />);
            expect(screen.getByText('18 вопр.')).toBeInTheDocument();
        });

        it('displays attempts count', () => {
            renderWithProviders(<QuizRow {...defaultProps} />);
            expect(screen.getByText('820')).toBeInTheDocument();
        });

        it('renders link to quiz editor', () => {
            renderWithProviders(<QuizRow {...defaultProps} />);
            expect(screen.getByRole('link')).toHaveAttribute('href', '/quizzes/7');
        });

        it('shows "Черновик" for draft quiz', () => {
            renderWithProviders(<QuizRow {...defaultProps} />);
            expect(screen.getByText('Черновик')).toBeInTheDocument();
        });

        it('shows "Опубликован" for published quiz', () => {
            renderWithProviders(<QuizRow {...defaultProps} quiz={{ ...mockQuiz, isPublished: true }} />);
            expect(screen.getByText('Опубликован')).toBeInTheDocument();
        });
    });

    describe('delete confirmation flow', () => {
        it('shows "Удалить?" prompt on first delete click', async () => {
            renderWithProviders(<QuizRow {...defaultProps} />);
            await userEvent.click(screen.getAllByRole('button')[4]);
            expect(screen.getByText('Удалить?')).toBeInTheDocument();
        });

        it('calls onDelete when confirmed', async () => {
            const onDelete = vi.fn();
            renderWithProviders(<QuizRow {...defaultProps} onDelete={onDelete} />);
            await userEvent.click(screen.getAllByRole('button')[4]);
            await userEvent.click(screen.getAllByRole('button')[1]);
            expect(onDelete).toHaveBeenCalledWith(mockQuiz.id);
        });

        it('cancels delete on X click', async () => {
            const onDelete = vi.fn();
            renderWithProviders(<QuizRow {...defaultProps} onDelete={onDelete} />);
            await userEvent.click(screen.getAllByRole('button')[4]);
            await userEvent.click(screen.getAllByRole('button')[2]);
            expect(screen.queryByText('Удалить?')).toBeNull();
            expect(onDelete).not.toHaveBeenCalled();
        });
    });

    describe('callbacks', () => {
        it('calls onToggleStatus when status badge clicked', async () => {
            const onToggleStatus = vi.fn();
            renderWithProviders(<QuizRow {...defaultProps} onToggleStatus={onToggleStatus} />);
            await userEvent.click(screen.getByText('Черновик'));
            expect(onToggleStatus).toHaveBeenCalledWith(mockQuiz);
        });

        it('calls onEdit when edit button clicked', async () => {
            const onEdit = vi.fn();
            renderWithProviders(<QuizRow {...defaultProps} onEdit={onEdit} />);
            await userEvent.click(screen.getAllByRole('button')[3]);
            expect(onEdit).toHaveBeenCalledWith(mockQuiz);
        });

        it('calls onCreateLink when link button clicked', async () => {
            const onCreateLink = vi.fn();
            renderWithProviders(<QuizRow {...defaultProps} onCreateLink={onCreateLink} />);
            await userEvent.click(screen.getAllByRole('button')[2]);
            expect(onCreateLink).toHaveBeenCalledWith(mockQuiz);
        });
    });
});
