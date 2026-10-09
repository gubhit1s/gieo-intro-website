/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

/**
 * Astro's own Vite config is reused here so unit tests compile `.astro`
 * components and React islands through the same pipeline the build uses.
 * This is what lets tests/unit render section components directly via the
 * Astro container API rather than asserting against a separate code path.
 */
export default getViteConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/unit/**/*.{test,spec}.{ts,tsx}'],
  },
});
