import { Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from '@/widgets/Header'
import AppRouter from './providers/router/components/AppRouter'
import { AppRoutes, RoutePath } from '@/shared/config/routeConfig/routeConfig'

const HEADERLESS_ROUTES = new Set([
    RoutePath[AppRoutes.LOGIN],
    RoutePath[AppRoutes.REGISTER],
])

function AppLayout() {
    const { pathname } = useLocation()

    return (
        <Suspense fallback="">
            {!HEADERLESS_ROUTES.has(pathname) && <Header />}
            <AppRouter />
        </Suspense>
    )
}

function App() {
    return <AppLayout />
}

export default App
