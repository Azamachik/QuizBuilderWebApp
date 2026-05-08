import { Suspense, useCallback } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { type AppRouteProps, routeConfig, RoutePath, AppRoutes } from '@/shared/config/routeConfig/routeConfig';

// Replace with auth context/store when auth is implemented
const useAuth = () => ({ isAuthenticated: true });

const AppRouter = () => {
    const { isAuthenticated } = useAuth();

    const renderRoute = useCallback(
        (route: AppRouteProps) => {
            const element = (
                <Suspense fallback=''>
                    {route.authOnly && !isAuthenticated ? <Navigate to={RoutePath[AppRoutes.MAIN]} replace /> : route.element}
                </Suspense>
            );

            return <Route key={route.path} path={route.path} element={element} />;
        },
        [isAuthenticated]
    );

    return <Routes>{Object.values(routeConfig).map(renderRoute)}</Routes>;
};

export default AppRouter;
