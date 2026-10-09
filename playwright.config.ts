import { defineConfig, devices } from '@playwright/test';

/**
 * E2E runs against `npm run preview` — the real static build — never `astro dev`.
 * The dev server injects HMR client code and does not reflect the production
 * hydration boundaries, so the static-HTML guarantees these tests exist to
 * verify would be meaningless against it (quickstart.md § Running locally).
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',

  use: {
    baseURL: 'http://127.0.0.1:4321',
    trace: 'on-first-retry',
  },

  webServer: {
    // --host 127.0.0.1 is load-bearing: without it Astro binds IPv6 ::1 only,
    // and Firefox (which resolves localhost to IPv4 first) gets connection
    // refused while Chromium and curl succeed.
    command: 'npm run build && npx astro preview --host 127.0.0.1 --port 4321',
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
