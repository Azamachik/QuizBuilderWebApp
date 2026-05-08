import { useEffect, useState, type ReactNode } from 'react';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/consts/localStorage';
import type { Theme } from '@/shared/consts/theme';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';

type ThemeProviderProps = {
    children: ReactNode;
    defaultTheme?: Theme;
};

export function ThemeProvider({ children, defaultTheme = 'system', ...props }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || defaultTheme);

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove('light', 'dark');

        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

            root.classList.add(systemTheme);
            return;
        }

        root.classList.add(theme);
    }, [theme]);

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
            setTheme(theme);
        }
    };

    return (
        <ThemeContext.Provider {...props} value={value}>
            {children}
        </ThemeContext.Provider>
    );
}
