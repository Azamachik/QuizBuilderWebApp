import { NavLink as RouterNavLink } from 'react-router-dom'
import type { NavLinkProps as RouterNavLinkProps } from 'react-router-dom'
import { cn } from '@/shared/lib/utils/utils'

type NavLinkProps = Omit<RouterNavLinkProps, 'className'> & {
    className?: string
}

export function NavLink({ className, ...props }: NavLinkProps) {
    return (
        <RouterNavLink
            className={({ isActive }) =>
                cn(
                    'text-sm transition-colors hover:text-foreground',
                    isActive ? 'font-medium text-foreground' : 'text-muted-foreground',
                    className
                )
            }
            {...props}
        />
    )
}
