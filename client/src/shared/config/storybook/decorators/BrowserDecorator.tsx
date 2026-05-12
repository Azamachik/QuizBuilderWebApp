import type { Decorator } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';

export const BrowserDecorator: Decorator = (Story) => (
    <MemoryRouter>
        <Story />
    </MemoryRouter>
);
