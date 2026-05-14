import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NavLink } from './NavLink';

function renderWithRouter(ui: React.ReactElement, initialEntries = ['/']) {
    return render(<MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>);
}

describe('NavLink', () => {
    describe('rendering', () => {
        it('renders an anchor element', () => {
            renderWithRouter(<NavLink to='/quizzes'>Мои тесты</NavLink>);
            expect(screen.getByRole('link', { name: 'Мои тесты' })).toBeInTheDocument();
        });

        it('renders the correct href', () => {
            renderWithRouter(<NavLink to='/profile'>Профиль</NavLink>);
            expect(screen.getByRole('link')).toHaveAttribute('href', '/profile');
        });

        it('renders children text', () => {
            renderWithRouter(<NavLink to='/quizzes'>Мои тесты</NavLink>);
            expect(screen.getByText('Мои тесты')).toBeInTheDocument();
        });
    });

    describe('active state', () => {
        it('applies font-medium and text-foreground class when active', () => {
            renderWithRouter(<NavLink to='/quizzes'>Мои тесты</NavLink>, ['/quizzes']);
            const link = screen.getByRole('link');
            expect(link).toHaveClass('font-medium', 'text-foreground');
        });

        it('applies muted-foreground class when inactive', () => {
            renderWithRouter(<NavLink to='/profile'>Профиль</NavLink>, ['/quizzes']);
            const link = screen.getByRole('link');
            expect(link).toHaveClass('text-muted-foreground');
            expect(link).not.toHaveClass('font-medium');
        });
    });

    describe('className override', () => {
        it('merges custom className into the link', () => {
            renderWithRouter(
                <NavLink to='/quizzes' className='my-class'>
                    Link
                </NavLink>
            );
            expect(screen.getByRole('link')).toHaveClass('my-class');
        });
    });

    describe('passthrough props', () => {
        it('passes aria-label through', () => {
            renderWithRouter(
                <NavLink to='/quizzes' aria-label='Quiz navigation'>
                    Тесты
                </NavLink>
            );
            expect(screen.getByRole('link', { name: 'Quiz navigation' })).toBeInTheDocument();
        });
    });
});
