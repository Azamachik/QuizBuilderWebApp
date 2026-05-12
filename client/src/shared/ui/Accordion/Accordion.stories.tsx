import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './Accordion';

const meta = {
    title: 'Shared/Accordion',
    component: Accordion,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
    { value: 'q1', trigger: 'Как создать тест?', content: 'Нажмите кнопку «Создать тест» в панели управления.' },
    { value: 'q2', trigger: 'Можно ли редактировать опубликованный тест?', content: 'Да, вы можете редактировать тест в любое время.' },
    { value: 'q3', trigger: 'Как поделиться тестом?', content: 'Скопируйте ссылку из меню «Создать ссылку».' },
];

export const Single: Story = {
    args: { type: 'single' as const },
    render: () => (
        <div className='w-[480px]'>
            <Accordion type='single' collapsible className='space-y-2'>
                {items.map(({ value, trigger, content }) => (
                    <AccordionItem key={value} value={value}>
                        <AccordionTrigger>{trigger}</AccordionTrigger>
                        <AccordionContent>{content}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    ),
};

export const Multiple: Story = {
    args: { type: 'multiple' as const },
    render: () => (
        <div className='w-[480px]'>
            <Accordion type='multiple' className='space-y-2'>
                {items.map(({ value, trigger, content }) => (
                    <AccordionItem key={value} value={value}>
                        <AccordionTrigger>{trigger}</AccordionTrigger>
                        <AccordionContent>{content}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    ),
};

export const DefaultOpen: Story = {
    args: { type: 'single' as const },
    render: () => (
        <div className='w-[480px]'>
            <Accordion type='single' defaultValue='q1' collapsible className='space-y-2'>
                {items.map(({ value, trigger, content }) => (
                    <AccordionItem key={value} value={value}>
                        <AccordionTrigger>{trigger}</AccordionTrigger>
                        <AccordionContent>{content}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    ),
};
