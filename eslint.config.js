import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      '@stylistic': stylistic,
    },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // Error si hay semicolons (estilo sin punto y coma)
      '@stylistic/semi': ['error', 'never'],
      // Comillas simples
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      // Indentación de 2 espacios
      '@stylistic/indent': ['error', 2],
      // Espacios en llaves de objetos { foo }
      '@stylistic/object-curly-spacing': ['error', 'always'],
      // Sin trailing spaces
      '@stylistic/no-trailing-spaces': 'error',
      // Salto de línea final
      '@stylistic/eol-last': ['error', 'always'],
      // No variables sin usar (TS)
      '@typescript-eslint/no-unused-vars': 'warn',

      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
])
