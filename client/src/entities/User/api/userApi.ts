import { rtkApi } from '@/shared/api/rtkApi';
import type { User } from '../model/types/user';

export const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getUser: build.query<User, string>({
            query: (id) => `/users/${id}`,
        }),
    }),
});

export const { useGetUserQuery } = userApi;
