import type { StateSchema } from '@/app/providers/StoreProvider';

export const getTakingSession = (state: StateSchema) => state.inviteLink?.session;
export const getTakingSessionIsLoading = (state: StateSchema) => state.inviteLink?.isLoading ?? false;
export const getTakingSessionError = (state: StateSchema) => state.inviteLink?.error;
