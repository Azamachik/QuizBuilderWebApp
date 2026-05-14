import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion';

function renderSingle() {
    return render(
        <Accordion type='single' collapsible>
            <AccordionItem value='item-1'>
                <AccordionTrigger>Вопрос 1</AccordionTrigger>
                <AccordionContent>Ответ 1</AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

describe('Accordion', () => {
    describe('rendering', () => {
        it('renders the trigger text', () => {
            renderSingle();
            expect(screen.getByText('Вопрос 1')).toBeInTheDocument();
        });

        it('content is not rendered when closed', () => {
            renderSingle();
            expect(screen.queryByText('Ответ 1')).toBeNull();
        });

        it('content is rendered after opening', async () => {
            renderSingle();
            await userEvent.click(screen.getByRole('button', { name: 'Вопрос 1' }));
            expect(screen.getByText('Ответ 1')).toBeInTheDocument();
        });

        it('trigger starts in closed state', () => {
            renderSingle();
            expect(screen.getByRole('button', { name: 'Вопрос 1' })).toHaveAttribute('data-state', 'closed');
        });
    });

    describe('interaction', () => {
        it('opens when trigger is clicked', async () => {
            renderSingle();
            await userEvent.click(screen.getByRole('button', { name: 'Вопрос 1' }));
            expect(screen.getByRole('button', { name: 'Вопрос 1' })).toHaveAttribute('data-state', 'open');
        });

        it('closes when trigger is clicked again (collapsible)', async () => {
            renderSingle();
            const trigger = screen.getByRole('button', { name: 'Вопрос 1' });
            await userEvent.click(trigger);
            await userEvent.click(trigger);
            expect(trigger).toHaveAttribute('data-state', 'closed');
        });
    });

    describe('multiple items', () => {
        function renderMultiple() {
            return render(
                <Accordion type='single'>
                    <AccordionItem value='item-1'>
                        <AccordionTrigger>Вопрос 1</AccordionTrigger>
                        <AccordionContent>Ответ 1</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-2'>
                        <AccordionTrigger>Вопрос 2</AccordionTrigger>
                        <AccordionContent>Ответ 2</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );
        }

        it('renders all triggers', () => {
            renderMultiple();
            expect(screen.getByText('Вопрос 1')).toBeInTheDocument();
            expect(screen.getByText('Вопрос 2')).toBeInTheDocument();
        });

        it('opening one item closes the other (single mode)', async () => {
            renderMultiple();
            const trigger1 = screen.getByRole('button', { name: 'Вопрос 1' });
            const trigger2 = screen.getByRole('button', { name: 'Вопрос 2' });

            await userEvent.click(trigger1);
            expect(trigger1).toHaveAttribute('data-state', 'open');

            await userEvent.click(trigger2);
            expect(trigger2).toHaveAttribute('data-state', 'open');
            expect(trigger1).toHaveAttribute('data-state', 'closed');
        });
    });

    describe('className passthrough', () => {
        it('merges custom className on AccordionItem', () => {
            render(
                <Accordion type='single'>
                    <AccordionItem value='x' className='my-item' data-testid='item'>
                        <AccordionTrigger>T</AccordionTrigger>
                        <AccordionContent>C</AccordionContent>
                    </AccordionItem>
                </Accordion>
            );
            expect(screen.getByTestId('item')).toHaveClass('my-item');
        });
    });
});
