import { ProfilePage } from '@/pages/ProfilePage'
import { QuizzesPage } from '@/pages/QuizzesPage'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'
import type { RouteProps } from 'react-router-dom'

export interface AppRouteProps extends RouteProps {
    authOnly?: boolean
    guestOnly?: boolean
}

export enum AppRoutes {
    MAIN = 'main',
    PROFILE = 'profile',
    QUIZZES = 'quizzes',
    LOGIN = 'login',
    REGISTER = 'register',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.PROFILE]: '/profile',
    [AppRoutes.QUIZZES]: '/quizzes',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.REGISTER]: '/register',
    [AppRoutes.NOT_FOUND]: '*',
}

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath[AppRoutes.MAIN],
        element: <QuizzesPage />,
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
}

function NotFoundPage() {
    return (
        <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
            <div className="text-center">
                <p className="text-6xl font-bold text-muted-foreground">404</p>
                <p className="mt-2 text-muted-foreground">Страница не найдена</p>
            </div>
        </div>
    )
}
