import { useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { type AppRouteProps, routeConfig } from '@/shared/config/routeConfig/routeConfig';

const useAuth = () => ({ isAuthenticated: true });

const AppRouter = () => {
    const { isAuthenticated } = useAuth();

    const renderRoute = useCallback(
        (route: AppRouteProps) => {
            return <Route key={route.path} path={route.path} element={route.element} />;
        },
        [isAuthenticated]
    );

    return <Routes>{Object.values(routeConfig).map(renderRoute)}</Routes>;
};

export default AppRouter;
