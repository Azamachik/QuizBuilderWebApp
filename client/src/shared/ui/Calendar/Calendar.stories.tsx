import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ru } from 'date-fns/locale';
import { Calendar } from './Calendar';

const meta = {
    title: 'Shared/Calendar',
    component: Calendar,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleSelect: Story = {
    render: () => {
        const [date, setDate] = useState<Date | undefined>(new Date());
        return (
            <div className='rounded-2xl border border-border p-3'>
                <Calendar
                    mode='single'
                    selected={date}
                    onSelect={setDate}
                    locale={ru}
                />
                <p className='mt-2 text-center text-xs text-muted-foreground'>
                    {date ? date.toLocaleDateString('ru-RU') : 'Дата не выбрана'}
                </p>
            </div>
        );
    },
};

export const RangeSelect: Story = {
    render: () => {
        const [range, setRange] = useState<{ from?: Date; to?: Date } | undefined>();
        return (
            <div className='rounded-2xl border border-border p-3'>
                <Calendar
                    mode='range'
                    selected={range as never}
                    onSelect={setRange as never}
                    locale={ru}
                />
            </div>
        );
    },
};

export const WithDisabledDates: Story = {
    render: () => {
        const [date, setDate] = useState<Date | undefined>();
        return (
            <div className='rounded-2xl border border-border p-3'>
                <Calendar
                    mode='single'
                    selected={date}
                    onSelect={setDate}
                    disabled={{ before: new Date() }}
                    locale={ru}
                />
                <p className='mt-2 text-center text-xs text-muted-foreground'>Прошедшие даты недоступны</p>
            </div>
        );
    },
};
