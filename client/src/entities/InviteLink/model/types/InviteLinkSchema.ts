import type { TakingSession } from './InviteLink';

export interface InviteLinkSchema {
    session?: TakingSession;
    isLoading: boolean;
    error?: string;
}
