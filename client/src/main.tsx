import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/app/styles/global.css';
import App from '@/app/App.tsx';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { TooltipProvider } from '@/shared/ui/Tooltip/Tooltip';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider defaultTheme='dark'>
                <TooltipProvider>
                    <App />
                </TooltipProvider>
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>
);
