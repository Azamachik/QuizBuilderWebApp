import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '@/entities/User';
import { TooltipProvider } from '@/shared/ui/Tooltip/Tooltip';
import { CreateLinkModal } from './CreateLinkModal';

const { mockGet, mockPost, mockPatch, mockDelete } = vi.hoisted(() => ({
    mockGet: vi.fn(),
    mockPost: vi.fn(),
    mockPatch: vi.fn(),
    mockDelete: vi.fn(),
}));

vi.mock('@/shared/api/api', () => ({
    $api: {
        get: (...args: unknown[]) => mockGet(...args),
        post: (...args: unknown[]) => mockPost(...args),
        patch: (...args: unknown[]) => mockPatch(...args),
        delete: (...args: unknown[]) => mockDelete(...args),
    },
}));

const LINK = {
    id: 'l1',
    quizId: 'q1',
    token: 'tok-abc',
    label: 'Для студентов',
    maxUses: null,
    usedCount: 3,
    expiresAt: null,
    isActive: true,
    createdAt: new Date().toISOString(),
    createdBy: 'u1',
};

function makeStore() {
    return configureStore({
        reducer: { user: userReducer },
        preloadedState: {
            user: { authData: { id: 'u1', username: 'user', email: 'u@mail.ru', token: 'tok' }, _inited: true },
        },
        middleware: (getDefault) => getDefault({ thunk: { extraArgument: { api: {} } } }),
    });
}

function renderModal(open = true, quizId = 'q1') {
    const store = makeStore();
    const onOpenChange = vi.fn();
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TooltipProvider>
                    <CreateLinkModal quizId={quizId} open={open} onOpenChange={onOpenChange} />
                </TooltipProvider>
            </MemoryRouter>
        </Provider>,
    );
    return { store, onOpenChange };
}

describe('CreateLinkModal', () => {
    beforeEach(() => {
        mockGet.mockResolvedValue({ data: [] });
        mockPost.mockResolvedValue({ data: LINK });
        mockPatch.mockResolvedValue({ data: {} });
        mockDelete.mockResolvedValue({});
    });

    describe('rendering', () => {
        it('does not render when closed', () => {
            renderModal(false);
            expect(screen.queryByText('Ссылки на тест')).toBeNull();
        });

        it('renders dialog title when open', () => {
            renderModal();
            expect(screen.getByText('Ссылки на тест')).toBeInTheDocument();
        });

        it('renders label input', () => {
            renderModal();
            expect(screen.getByPlaceholderText(/Название/)).toBeInTheDocument();
        });

        it('renders max-uses input', () => {
            renderModal();
            expect(screen.getByPlaceholderText(/Лимит использований/)).toBeInTheDocument();
        });

        it('renders "Создать ссылку" submit button', () => {
            renderModal();
            expect(screen.getByRole('button', { name: /Создать ссылку/ })).toBeInTheDocument();
        });

        it('"Создать ссылку" is disabled when label is empty', () => {
            renderModal();
            expect(screen.getByRole('button', { name: /Создать ссылку/ })).toBeDisabled();
        });
    });

    describe('empty links list', () => {
        it('shows "Ссылок пока нет" when API returns empty array', async () => {
            mockGet.mockResolvedValue({ data: [] });
            renderModal();
            await waitFor(() => {
                expect(screen.getByText('Ссылок пока нет')).toBeInTheDocument();
            });
        });
    });

    describe('with existing links', () => {
        it('renders existing link label', async () => {
            mockGet.mockResolvedValue({ data: [LINK] });
            renderModal();
            await waitFor(() => {
                expect(screen.getByText('Для студентов')).toBeInTheDocument();
            });
        });

        it('shows "Безлимит" for links with null maxUses', async () => {
            mockGet.mockResolvedValue({ data: [LINK] });
            renderModal();
            await waitFor(() => {
                expect(screen.getByText('Безлимит')).toBeInTheDocument();
            });
        });

        it('shows usage count when maxUses is set', async () => {
            const limitedLink = { ...LINK, maxUses: 10, usedCount: 3 };
            mockGet.mockResolvedValue({ data: [limitedLink] });
            renderModal();
            await waitFor(() => {
                expect(screen.getByText('3/10 исп.')).toBeInTheDocument();
            });
        });
    });

    describe('create link', () => {
        it('enables submit button when label is typed', async () => {
            renderModal();
            await userEvent.type(screen.getByPlaceholderText(/Название/), 'Новая ссылка');
            expect(screen.getByRole('button', { name: /Создать ссылку/ })).not.toBeDisabled();
        });

        it('calls $api.post when submitted with label', async () => {
            renderModal();
            await userEvent.type(screen.getByPlaceholderText(/Название/), 'Моя ссылка');
            await userEvent.click(screen.getByRole('button', { name: /Создать ссылку/ }));
            await waitFor(() => {
                expect(mockPost).toHaveBeenCalledWith(
                    '/inviteLinks',
                    expect.objectContaining({ label: 'Моя ссылка', quizId: 'q1' }),
                );
            });
        });

        it('appends the new link to the list after creation', async () => {
            mockGet.mockResolvedValue({ data: [] });
            mockPost.mockResolvedValue({ data: LINK });
            renderModal();
            await waitFor(() => screen.getByText('Ссылок пока нет'));
            await userEvent.type(screen.getByPlaceholderText(/Название/), 'Для студентов');
            await userEvent.click(screen.getByRole('button', { name: /Создать ссылку/ }));
            await waitFor(() => {
                expect(screen.getByText('Для студентов')).toBeInTheDocument();
            });
        });

        it('clears the label input after creation', async () => {
            renderModal();
            const labelInput = screen.getByPlaceholderText(/Название/) as HTMLInputElement;
            await userEvent.type(labelInput, 'Ссылка');
            await userEvent.click(screen.getByRole('button', { name: /Создать ссылку/ }));
            await waitFor(() => {
                expect(labelInput.value).toBe('');
            });
        });
    });

    describe('toggle link', () => {
        it('calls $api.patch when toggle button is clicked', async () => {
            mockGet.mockResolvedValue({ data: [LINK] });
            renderModal();
            await waitFor(() => screen.getByText('Для студентов'));
            const buttons = screen.getAllByRole('button');
            // buttons inside the link row: copy, toggle, delete + create button at bottom
            // toggle is 2nd button in the row (copy=first, toggle=second, delete=third)
            const toggleBtn = buttons.find((_, i) => {
                // find button that is before the delete button and after copy button
                // simplest: there are exactly 3 buttons per link item + 1 create button
                return i === 1; // copy is idx=0, toggle is idx=1
            });
            if (toggleBtn) {
                await userEvent.click(toggleBtn);
                await waitFor(() => {
                    expect(mockPatch).toHaveBeenCalledWith(`/inviteLinks/${LINK.id}`, { isActive: false });
                });
            }
        });
    });
});
