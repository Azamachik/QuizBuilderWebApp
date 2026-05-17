import { test, expect } from '@playwright/test';
import { API_URL } from '../../playwright.config';

const AUTH_USER = { id: 'u1', username: 'testuser', email: 'test@test.com', token: 'fake-token' };

const QUIZ_BASE = {
    id: 'q1',
    title: 'Тестовый тест',
    description: 'Описание',
    authorId: 'u1',
    attemptsCount: 0,
    questionsCount: 2,
    createdAt: new Date().toISOString(),
};

test.beforeEach(async ({ page }) => {
    await page.addInitScript((user) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('user_token', user.token);
    }, AUTH_USER);
});

test('показывает предупреждение и не открывает модал при создании ссылки для неопубликованного теста', async ({ page }) => {
    const quiz = { ...QUIZ_BASE, isPublished: false };

    await page.route(API_URL + '**', async (route) => {
        const url = route.request().url();
        if (url.includes('/quizzes')) {
            await route.fulfill({ json: [quiz] });
        } else {
            await route.continue();
        }
    });

    await page.goto('/quizzes');
    await expect(page.getByText('Тестовый тест')).toBeVisible();

    await page.getByTestId('btn-create-link').click();

    await expect(page.getByText('Опубликуйте тест перед созданием ссылки')).toBeVisible();
    await expect(page.getByRole('dialog')).not.toBeVisible();
});

test('открывает диалог управления ссылками для опубликованного теста', async ({ page }) => {
    const quiz = { ...QUIZ_BASE, isPublished: true };

    await page.route(API_URL + '**', async (route) => {
        const url = route.request().url();
        if (url.includes('/inviteLinks')) {
            await route.fulfill({ json: [] });
        } else if (url.includes('/quizzes')) {
            await route.fulfill({ json: [quiz] });
        } else {
            await route.continue();
        }
    });

    await page.goto('/quizzes');
    await expect(page.getByText('Тестовый тест')).toBeVisible();

    await page.getByTestId('btn-create-link').click();

    await expect(page.getByText('Ссылки на тест')).toBeVisible();
});
