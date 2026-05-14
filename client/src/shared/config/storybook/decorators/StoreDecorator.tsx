import type { Decorator } from '@storybook/react-vite';
import { StoreProvider } from '@/app/providers/StoreProvider';
import type { StateSchema } from '@/app/providers/StoreProvider';
import type { ReducersList } from '@/shared/lib/helpers/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import { loginReducer } from '@/features/AuthByEmail';
import { registerReducer } from '@/features/RegisterByEmail';
import { profileReducer } from '@/entities/Profile';
import { quizReducer } from '@/entities/Quiz';
import { questionReducer } from '@/entities/Question';
import { inviteLinkReducer } from '@/entities/InviteLink';
import { attemptReducer } from '@/entities/Attempt';

const defaultAsyncReducers: ReducersList = {
    login: loginReducer,
    register: registerReducer,
    profile: profileReducer,
    quizzes: quizReducer,
    questions: questionReducer,
    inviteLink: inviteLinkReducer,
    attempt: attemptReducer
};

export const StoreDecorator =
    (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList): Decorator =>
    (Story) => (
        <StoreProvider initialState={state as Partial<StateSchema>} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
            <Story />
        </StoreProvider>
    );
