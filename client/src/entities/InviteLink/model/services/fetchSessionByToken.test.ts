import { describe, it, expect, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { fetchSessionByToken } from './fetchSessionByToken';
import { inviteLinkReducer } from '../slice/inviteLinkSlice';
import type { TakingSession } from '../types/InviteLink';

const makeStore = (api: object) =>
    configureStore({
        reducer: { inviteLink: inviteLinkReducer },
        middleware: (getDefault) => getDefault({ thunk: { extraArgument: { api } } })
    });

const mockSession: TakingSession = {
    inviteLink: {
        id: 'il1',
        quizId: 'q1',
        token: 'demo-token',
        label: 'Link',
        maxUses: null,
        usedCount: 0,
        expiresAt: null,
        isActive: true,
        createdAt: '2024-01-01',
        createdBy: 'u1'
    },
    quiz: { id: 'q1', title: 'Test Quiz', description: '' },
    questions: []
};

describe('fetchSessionByToken', () => {
    it('fulfilled — fetches from correct endpoint and stores session', async () => {
        const api = { get: vi.fn().mockResolvedValue({ data: mockSession }) };
        const store = makeStore(api);

        await store.dispatch(fetchSessionByToken('demo-token') as ReturnType<typeof fetchSessionByToken>);

        expect(api.get).toHaveBeenCalledWith('/public/quiz/demo-token');
        expect(store.getState().inviteLink.session).toEqual(mockSession);
        expect(store.getState().inviteLink.isLoading).toBe(false);
    });

    it('rejected — sets localised error message on API failure', async () => {
        const api = { get: vi.fn().mockRejectedValue(new Error('404')) };
        const store = makeStore(api);

        await store.dispatch(fetchSessionByToken('bad-token') as ReturnType<typeof fetchSessionByToken>);

        expect(store.getState().inviteLink.error).toBe('Ссылка недействительна или тест не опубликован');
        expect(store.getState().inviteLink.session).toBeUndefined();
    });

    it('sets isLoading=true while in flight', async () => {
        let resolve!: (v: unknown) => void;
        const api = {
            get: vi.fn().mockReturnValue(
                new Promise((r) => {
                    resolve = r;
                })
            )
        };
        const store = makeStore(api);

        const dispatch = store.dispatch(fetchSessionByToken('tok') as ReturnType<typeof fetchSessionByToken>);
        expect(store.getState().inviteLink.isLoading).toBe(true);

        resolve({ data: mockSession });
        await dispatch;
        expect(store.getState().inviteLink.isLoading).toBe(false);
    });
});
