import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { USER_TOKEN_KEY } from '@/shared/consts/localStorage';

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: __API__,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(USER_TOKEN_KEY) || '';
            if (token) {
                headers.set('authorization', token);
            }
            return headers;
        }
    }),
    endpoints: () => ({})
});
