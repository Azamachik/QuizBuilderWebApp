import { defineConfig, devices } from '@playwright/test';

export const API_URL = process.env.API_URL ?? 'http://localhost:8000/';

export default defineConfig({
    testDir: './playwright/e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:5173',
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
        url: 'http://localhost:5173',
        reuseExistingServer: !process.env.CI,
    },
});
