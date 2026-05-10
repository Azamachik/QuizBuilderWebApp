import type { ProfileSchema } from '../types/profile';

interface State { 
    profile?: ProfileSchema 
}

export const getProfileData = (s: State) => s.profile?.data;
export const getProfileIsLoading = (s: State) => s.profile?.isLoading ?? false;
export const getProfileError = (s: State) => s.profile?.error;
export const getProfileFirstName = (s: State) => s.profile?.data?.firstName ?? '';
export const getProfileLastName = (s: State) => s.profile?.data?.lastName ?? '';
export const getProfileAvatarUrl = (s: State) => s.profile?.data?.avatarUrl ?? '';
export const getProfileCreatedAt = (s: State) => s.profile?.data?.createdAt ?? '';
