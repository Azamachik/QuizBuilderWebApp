import type { Theme } from '../../consts/theme';
import { createContext } from 'react';

type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
    theme: 'system',
    setTheme: () => null
};

export const ThemeContext = createContext<ThemeProviderState>(initialState);
