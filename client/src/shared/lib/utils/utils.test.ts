import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
    it('returns a single class unchanged', () => {
        expect(cn('text-sm')).toBe('text-sm');
    });

    it('merges multiple classes', () => {
        expect(cn('text-sm', 'font-bold')).toBe('text-sm font-bold');
    });

    it('filters falsy values', () => {
        expect(cn('text-sm', false, null, undefined, '')).toBe('text-sm');
    });

    it('handles conditional object syntax', () => {
        expect(cn({ 'text-red-500': true, 'text-blue-500': false })).toBe('text-red-500');
    });

    it('resolves tailwind conflicts — last class wins', () => {
        expect(cn('text-sm', 'text-lg')).toBe('text-lg');
    });

    it('resolves conflicting padding classes', () => {
        expect(cn('px-4', 'px-2')).toBe('px-2');
    });

    it('resolves conflicting background colors', () => {
        expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
    });

    it('handles array of classes', () => {
        expect(cn(['text-sm', 'font-bold'])).toBe('text-sm font-bold');
    });

    it('handles mixed arrays and strings', () => {
        expect(cn(['text-sm'], 'font-bold')).toBe('text-sm font-bold');
    });

    it('returns empty string for no arguments', () => {
        expect(cn()).toBe('');
    });

    it('allows overriding a class from a base set', () => {
        const base = 'rounded-md p-4 text-sm';
        expect(cn(base, 'p-2')).toBe('rounded-md text-sm p-2');
    });
});
