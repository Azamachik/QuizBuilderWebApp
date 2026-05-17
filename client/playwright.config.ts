import { defineConfig, devices } from '@playwright/test';

export const API_URL = process.env.API_URL ?? 'https://quizbuilderserver-production.up.railway.app/';

export default defineConfig({
    testDir: './playwright/e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: API_URL,
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    webServer: {
        command: 'pnpm run start',
        url: API_URL,
        reuseExistingServer: !process.env.CI,
    },
});
