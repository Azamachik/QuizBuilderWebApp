import type { Decorator } from '@storybook/react-vite';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

export const RouterDecorator: Decorator = (Story) => (
    <MemoryRouter initialEntries={['/quizzes/1']}>
        <Routes>
            <Route path='/quizzes/:id' element={<Story />} />
            <Route path='/quiz/:token/results/:attemptId' element={<Story />} />
            <Route path='/quiz/:token' element={<Story />} />
            <Route path='*' element={<Story />} />
        </Routes>
    </MemoryRouter>
);
