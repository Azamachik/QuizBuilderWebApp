import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';

const meta = {
    title: 'Shared/Switch',
    component: Switch,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    argTypes: {
        disabled: { control: 'boolean' },
        defaultChecked: { control: 'boolean' }
    }
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {};
export const On: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
export const DisabledChecked: Story = { args: { disabled: true, defaultChecked: true } };

export const WithLabel: Story = {
    render: () => (
        <div className='flex items-center gap-3'>
            <Switch id='notifications' defaultChecked />
            <label htmlFor='notifications' className='text-sm font-medium'>
                Уведомления
            </label>
        </div>
    )
};

export const WithDescription: Story = {
    render: () => (
        <div className='flex items-start justify-between gap-8 rounded-xl border border-border p-4'>
            <div>
                <p className='text-sm font-medium'>Публичный доступ</p>
                <p className='text-xs text-muted-foreground'>Тест доступен всем по ссылке</p>
            </div>
            <Switch defaultChecked />
        </div>
    )
};
