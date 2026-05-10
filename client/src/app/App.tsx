import { Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '@/widgets/Header';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/helpers/hooks/useAppSelector';
import { initUser, getUserIsInited } from '@/entities/User';
import { AppRoutes, RoutePath } from '@/shared/config/routeConfig/routeConfig';
import AppRouter from './providers/router/components/AppRouter';

const HEADERLESS_ROUTES = new Set([RoutePath[AppRoutes.LOGIN], RoutePath[AppRoutes.REGISTER]]);

function AppLayout() {
    const { pathname } = useLocation();
    const isInited = useAppSelector(getUserIsInited);

    if (!isInited) return null;

    return (
        <Suspense fallback=''>
            {!HEADERLESS_ROUTES.has(pathname) && <Header />}
            <AppRouter />
        </Suspense>
    );
}

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initUser());
    }, [dispatch]);

    return <AppLayout />;
}

export default App;
