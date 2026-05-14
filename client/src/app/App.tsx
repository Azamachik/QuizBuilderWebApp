import { Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '@/widgets/Header';
import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/helpers/hooks/useAppSelector/useAppSelector';
import { initUser, getUserIsInited } from '@/entities/User';
import { AppRoutes, RoutePath } from '@/shared/config/routeConfig/routeConfig';
import AppRouter from './providers/router/components/AppRouter';

const HEADERLESS_ROUTES = new Set([RoutePath[AppRoutes.LOGIN], RoutePath[AppRoutes.REGISTER]]);
const HEADERLESS_PREFIXES = ['/quiz/'];

function AppLayout() {
    const { pathname } = useLocation();
    const isInited = useAppSelector(getUserIsInited);

    if (!isInited) return null;

    const hideHeader = HEADERLESS_ROUTES.has(pathname) || HEADERLESS_PREFIXES.some((prefix) => pathname.startsWith(prefix));

    return (
        <Suspense fallback=''>
            {!hideHeader && <Header />}
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
