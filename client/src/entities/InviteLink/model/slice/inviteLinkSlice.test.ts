import { describe, it, expect } from 'vitest';
import { inviteLinkReducer } from './inviteLinkSlice';
import { fetchSessionByToken } from '../services/fetchSessionByToken';
import type { InviteLinkSchema } from '../types/InviteLinkSchema';
import type { TakingSession } from '../types/InviteLink';

const mockSession: TakingSession = {
    inviteLink: {
        id: 'il1',
        quizId: 'quiz1',
        token: 'demo-token',
        label: 'Общая ссылка',
        maxUses: null,
        usedCount: 3,
        expiresAt: null,
        isActive: true,
        createdAt: '2024-01-01T00:00:00.000Z',
        createdBy: 'user1'
    },
    quiz: { id: 'quiz1', title: 'Test Quiz', description: '' },
    questions: [{ id: 'q1', quizId: 'quiz1', order: 1, text: 'Q1', type: 'single', options: [], required: true }]
};

const initialState: InviteLinkSchema = { isLoading: false };

describe('inviteLinkSlice', () => {
    it('returns initial state', () => {
        expect(inviteLinkReducer(undefined, { type: '' })).toEqual(initialState);
    });

    describe('fetchSessionByToken', () => {
        it('pending — sets isLoading, clears error', () => {
            const state = inviteLinkReducer({ ...initialState, error: 'old error' }, fetchSessionByToken.pending('', ''));
            expect(state.isLoading).toBe(true);
            expect(state.error).toBeUndefined();
        });

        it('fulfilled — clears isLoading, stores session', () => {
            const state = inviteLinkReducer({ ...initialState, isLoading: true }, fetchSessionByToken.fulfilled(mockSession, '', ''));
            expect(state.isLoading).toBe(false);
            expect(state.session).toEqual(mockSession);
        });

        it('fulfilled — session contains correct quiz and questions', () => {
            const state = inviteLinkReducer(initialState, fetchSessionByToken.fulfilled(mockSession, '', ''));
            expect(state.session?.quiz.title).toBe('Test Quiz');
            expect(state.session?.questions).toHaveLength(1);
        });

        it('rejected — clears isLoading, stores error', () => {
            const state = inviteLinkReducer(
                { ...initialState, isLoading: true },
                fetchSessionByToken.rejected(null, '', '', 'Ссылка недействительна или тест не опубликован')
            );
            expect(state.isLoading).toBe(false);
            expect(state.error).toBe('Ссылка недействительна или тест не опубликован');
        });

        it('rejected — does not set session on failure', () => {
            const state = inviteLinkReducer({ ...initialState, session: mockSession }, fetchSessionByToken.rejected(null, '', '', 'err'));
            expect(state.session).toEqual(mockSession);
        });
    });
});
