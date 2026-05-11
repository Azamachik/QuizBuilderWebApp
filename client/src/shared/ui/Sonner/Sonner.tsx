import type { CSSProperties } from 'react';
import { CircleCheck, Info, Loader2, OctagonX, TriangleAlert } from 'lucide-react';
import { Toaster as SonnerToaster, type ToasterProps } from 'sonner';
import { useTheme } from '@/shared/lib/helpers/hooks/useTheme/useTheme';

export function Toaster(props: ToasterProps) {
    const { theme } = useTheme();

    return (
        <SonnerToaster
            theme={theme as ToasterProps['theme']}
            icons={{
                success: <CircleCheck className='size-4' />,
                info: <Info className='size-4' />,
                warning: <TriangleAlert className='size-4' />,
                error: <OctagonX className='size-4' />,
                loading: <Loader2 className='size-4 animate-spin' />,
            }}
            style={
                {
                    '--normal-bg': 'var(--popover)',
                    '--normal-text': 'var(--popover-foreground)',
                    '--normal-border': 'var(--border)',
                } as CSSProperties
            }
            {...props}
        />
    );
}
