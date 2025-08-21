import globals from 'globals';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import js from '@eslint/js';

export default [
  {
    files: ['**/*.jsx', '**/*.js'],
    ignores: ['node_modules/**', 'dist/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true }, // allow JSX
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      prettier: pluginPrettier,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // Base + React + Hooks
      ...js.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,

      // Using the new JSX transform (no need to import React in scope)
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      // Nice-to-have with Vite + React Fast Refresh
      'react-refresh/only-export-components': 'warn',

      // Your existing tweaks
      'no-unused-vars': ['warn'],
      'no-console': 'off',

      // Prettier integration
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
          tabWidth: 2,
          trailingComma: 'es5',
          printWidth: 80,
        },
      ],
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        alias: {
          map: [['src', './src']],
          extensions: ['.js', '.jsx', '.json'],
        },
      },
    },
  },
];
