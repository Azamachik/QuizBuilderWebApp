'use client';

import * as React from 'react';
import { DayPicker, getDefaultClassNames, type DayButton, type Locale } from 'react-day-picker';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from '@/shared/lib/utils/utils';
import { Button, buttonVariants } from '@/shared/ui/Button/Button';

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    captionLayout = 'label',
    buttonVariant = 'ghost',
    locale,
    formatters,
    components,
    ...props
}: React.ComponentProps<typeof DayPicker> & {
    buttonVariant?: React.ComponentProps<typeof Button>['variant'];
}) {
    const defaultClassNames = getDefaultClassNames();

    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn('group/calendar bg-background p-3 [--cell-size:--spacing(8)]', className)}
            captionLayout={captionLayout}
            locale={locale}
            formatters={{
                formatMonthDropdown: (date) =>
                    date.toLocaleString(locale?.code, { month: 'long' }),
                ...formatters,
            }}
            classNames={{
                root: cn('w-fit', defaultClassNames.root),
                months: cn('relative flex flex-col gap-4 md:flex-row', defaultClassNames.months),
                month: cn('flex w-full flex-col gap-4', defaultClassNames.month),
                nav: cn(
                    'absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1',
                    defaultClassNames.nav,
                ),
                button_previous: cn(
                    buttonVariants({ variant: buttonVariant }),
                    'size-(--cell-size) p-0 select-none aria-disabled:opacity-50',
                    defaultClassNames.button_previous,
                ),
                button_next: cn(
                    buttonVariants({ variant: buttonVariant }),
                    'size-(--cell-size) p-0 select-none aria-disabled:opacity-50',
                    defaultClassNames.button_next,
                ),
                month_caption: cn(
                    'flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)',
                    defaultClassNames.month_caption,
                ),
                caption_label: cn(
                    'font-medium select-none',
                    captionLayout === 'label'
                        ? 'text-sm'
                        : 'flex items-center gap-1 rounded-xl text-sm [&>svg]:size-3.5 [&>svg]:text-muted-foreground',
                    defaultClassNames.caption_label,
                ),
                table: 'w-full border-collapse',
                weekdays: cn('flex', defaultClassNames.weekdays),
                weekday: cn(
                    'flex-1 rounded-xl text-[0.8rem] font-normal text-muted-foreground select-none',
                    defaultClassNames.weekday,
                ),
                week: cn('mt-2 flex w-full', defaultClassNames.week),
                day: cn(
                    'group/day relative aspect-square h-full w-full rounded-xl p-0 text-center select-none',
                    defaultClassNames.day,
                ),
                today: cn(
                    'rounded-xl bg-muted text-foreground data-[selected=true]:rounded-none',
                    defaultClassNames.today,
                ),
                outside: cn(
                    'text-muted-foreground aria-selected:text-muted-foreground',
                    defaultClassNames.outside,
                ),
                disabled: cn('text-muted-foreground opacity-50', defaultClassNames.disabled),
                hidden: cn('invisible', defaultClassNames.hidden),
                ...classNames,
            }}
            components={{
                Chevron: ({ orientation, className: cls, ...rest }) => {
                    if (orientation === 'left') return <ChevronLeftIcon className={cn('size-4', cls)} {...rest} />;
                    if (orientation === 'right') return <ChevronRightIcon className={cn('size-4', cls)} {...rest} />;
                    return <ChevronDownIcon className={cn('size-4', cls)} {...rest} />;
                },
                DayButton: ({ ...p }) => <CalendarDayButton locale={locale} {...p} />,
                ...components,
            }}
            {...props}
        />
    );
}

function CalendarDayButton({
    className,
    day,
    modifiers,
    locale,
    ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
    const defaultClassNames = getDefaultClassNames();
    const ref = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        if (modifiers.focused) ref.current?.focus();
    }, [modifiers.focused]);

    return (
        <Button
            ref={ref}
            variant='ghost'
            size='icon'
            data-day={day.date.toLocaleDateString(locale?.code)}
            data-selected-single={
                modifiers.selected &&
                !modifiers.range_start &&
                !modifiers.range_end &&
                !modifiers.range_middle
            }
            data-range-start={modifiers.range_start}
            data-range-end={modifiers.range_end}
            data-range-middle={modifiers.range_middle}
            className={cn(
                'relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 border-0 font-normal leading-none data-[selected-single=true]:bg-action data-[selected-single=true]:text-action-foreground dark:hover:text-foreground',
                defaultClassNames.day,
                className,
            )}
            {...props}
        />
    );
}

export { Calendar };
