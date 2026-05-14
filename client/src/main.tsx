import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from '@/shared/ui/Sonner/Sonner';
import '@/app/styles/global.css';
import App from '@/app/App.tsx';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { TooltipProvider } from '@/shared/ui/Tooltip/Tooltip';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <StoreProvider>
                <ThemeProvider defaultTheme='dark'>
                    <TooltipProvider>
                        <App />
                        <Toaster position='top-center' richColors closeButton />
                    </TooltipProvider>
                </ThemeProvider>
            </StoreProvider>
        </BrowserRouter>
    </StrictMode>
);
