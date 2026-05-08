import type { ReactNode } from 'react';
import { ProfilePage } from '@/pages/ProfilePage';
import { QuizzesPage } from '@/pages/QuizzesPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { LandingPage } from '@/pages/LandingPage';
import { QuizEditorPage } from '@/pages/QuizEditorPage';
import { NotFoundPage } from '@/pages/NotFoundPage/ui/NotFoundPage';

export interface AppRouteProps {
    path: string;
    element: ReactNode;
    authOnly?: boolean;
    guestOnly?: boolean;
}

export const AppRoutes = {
    MAIN: 'main',
    PROFILE: 'profile',
    QUIZZES: 'quizzes',
    QUIZ_EDITOR: 'quiz_editor',
    LOGIN: 'login',
    REGISTER: 'register',
    NOT_FOUND: 'not_found',
} as const;

export type AppRoutes = (typeof AppRoutes)[keyof typeof AppRoutes];

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.PROFILE]: '/profile',
    [AppRoutes.QUIZZES]: '/quizzes',
    [AppRoutes.QUIZ_EDITOR]: '/quizzes/:id',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.REGISTER]: '/register',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath[AppRoutes.MAIN],
        element: <LandingPage />,
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath[AppRoutes.PROFILE],
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.QUIZZES]: {
        path: RoutePath[AppRoutes.QUIZZES],
        element: <QuizzesPage />,
        authOnly: true,
    },
    [AppRoutes.QUIZ_EDITOR]: {
        path: RoutePath[AppRoutes.QUIZ_EDITOR],
        element: <QuizEditorPage />,
        authOnly: true,
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath[AppRoutes.LOGIN],
        element: <LoginPage />,
        guestOnly: true,
    },
    [AppRoutes.REGISTER]: {
        path: RoutePath[AppRoutes.REGISTER],
        element: <RegisterPage />,
        guestOnly: true,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath[AppRoutes.NOT_FOUND],
        element: <NotFoundPage />,
    },
};
