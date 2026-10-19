import { playwright } from '@vitest/browser-playwright';
import { msw } from 'msw/vite';
import { defineConfig } from 'vitest/config';

// https://vite.dev/config
// https://vitest.dev/config
export default defineConfig({
  plugins: [
    msw(),
  ],
  test: {
    browser: {
      enabled: true,
      headless: true,
      instances: [{ browser: 'webkit' }],
      provider: playwright(),
      screenshotFailures: false,
    },
    hookTimeout: 1_000,
    testTimeout: 1_000,
  },
});
