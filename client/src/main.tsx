import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/app/styles/global.css'
import App from '@/app/App.tsx'
import { ThemeProvider } from '@/app/providers/ThemeProvider'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider defaultTheme='dark'>
            <App />
        </ThemeProvider>
    </StrictMode>
)
