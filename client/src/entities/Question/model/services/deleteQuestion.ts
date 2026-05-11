import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfig } from '@/app/providers/StoreProvider';
import type { Question } from '../types/Question';

export const deleteQuestion = createAsyncThunk<string, { id: string; quizId: string }, ThunkConfig<string>>(
    'questions/deleteQuestion',
    async ({ id, quizId }, { extra, rejectWithValue }) => {
        try {
            await extra.api.delete(`/questions/${id}`);
            // update denormalized questionsCount on the quiz
            const questions = await extra.api.get<Question[]>('/questions', { params: { quizId } });
            await extra.api.patch(`/quizzes/${quizId}`, { questionsCount: questions.data.length });
            return id;
        } catch {
            return rejectWithValue('Ошибка удаления вопроса');
        }
    },
);
