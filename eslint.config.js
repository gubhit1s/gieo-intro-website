import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y-x';

/**
 * Accessibility lint is load-bearing here, not cosmetic: 7 of 36 functional
 * requirements in the spec are accessibility requirements, so catching missing
 * labels and non-semantic interactive elements at author time is cheaper than
 * catching them in the axe run (FR-031).
 *
 * Note: eslint-plugin-jsx-a11y-x is the ESLint 10 compatible fork. The original
 * eslint-plugin-jsx-a11y caps at ESLint 9 and cannot be used alongside
 * eslint-plugin-astro 3.x, which requires ESLint >= 10.
 */
export default tseslint.config(
  {
    ignores: ['dist/**', '.astro/**', 'node_modules/**', 'test-results/**', 'playwright-report/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: { 'jsx-a11y-x': jsxA11y },
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
    },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  }
);
