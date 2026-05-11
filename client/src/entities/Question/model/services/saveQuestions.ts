import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfig } from '@/app/providers/StoreProvider';
import type { StateSchema } from '@/app/providers/StoreProvider';
import type { Question } from '../types/Question';

export const saveQuestions = createAsyncThunk<Question[], string, ThunkConfig<string>>(
    'questions/saveQuestions',
    async (quizId, { getState, extra, rejectWithValue }) => {
        const state = (getState() as StateSchema).questions;
        if (!state) return rejectWithValue('Нет состояния');

        const { formData, questions: serverData } = state;
        const serverIds = new Set(serverData.map((q) => q.id));

        const toDelete = serverData.filter((q) => !formData.some((fd) => fd.id === q.id));
        const toCreate = formData.filter((q) => !serverIds.has(q.id));
        const toUpdate = formData.filter((q) => serverIds.has(q.id));

        try {
            const [created] = await Promise.all([
                Promise.all(
                    toCreate.map(async (q) => {
                        const { id: _tempId, ...rest } = q;
                        const res = await extra.api.post<Question>('/questions', rest);
                        return res.data;
                    }),
                ),
                Promise.all(toDelete.map((q) => extra.api.delete(`/questions/${q.id}`))),
                Promise.all(toUpdate.map((q) => extra.api.patch(`/questions/${q.id}`, q))),
            ]);

            await extra.api.patch(`/quizzes/${quizId}`, { questionsCount: formData.length });

            return [...toUpdate, ...created].sort((a, b) => a.order - b.order);
        } catch {
            return rejectWithValue('Ошибка сохранения');
        }
    },
);
