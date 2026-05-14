import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TooltipProvider } from '@/shared/ui/Tooltip/Tooltip';

export function renderWithProviders(ui: ReactElement) {
    return render(
        <MemoryRouter>
            <TooltipProvider>{ui}</TooltipProvider>
        </MemoryRouter>
    );
}
