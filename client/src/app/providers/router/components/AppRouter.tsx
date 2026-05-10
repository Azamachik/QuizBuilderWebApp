import { Suspense, useCallback } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '@/shared/lib/helpers/hooks/useAppSelector';
import { getUserData } from '@/entities/User';
import { type AppRouteProps, routeConfig, RoutePath, AppRoutes } from '@/shared/config/routeConfig/routeConfig';

const AppRouter = () => {
    const isAuthenticated = !!useAppSelector(getUserData);

    const renderRoute = useCallback(
        (route: AppRouteProps) => {
            let element = route.element;

            if (route.authOnly && !isAuthenticated) {
                element = <Navigate to={RoutePath[AppRoutes.LOGIN]} replace />;
            }
            if (route.guestOnly && isAuthenticated) {
                element = <Navigate to={RoutePath[AppRoutes.QUIZZES]} replace />;
            }

            return (
                <Route
                    key={route.path}
                    path={route.path}
                    element={<Suspense fallback=''>{element}</Suspense>}
                />
            );
        },
        [isAuthenticated],
    );

    return <Routes>{Object.values(routeConfig).map(renderRoute)}</Routes>;
};

export default AppRouter;
