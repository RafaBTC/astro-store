import tsParser from '@typescript-eslint/parser'
import astroParser from 'astro-eslint-parser'
import prettierConfig from 'eslint-config-prettier'
import eslintPluginAstro from 'eslint-plugin-astro'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tsEslint from 'typescript-eslint'

// ─── Reglas compartidas de lógica (NO formato — eso lo maneja Prettier) ───────
const sharedLogicRules = {
  'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 1 }],
  'no-multi-spaces': 'error'
}

// ─── Reglas de imports ────────────────────────────────────────────────────────
const importRules = {
  'import/order': [
    'error',
    {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc',
        caseInsensitive: true
      }
    }
  ]
}

export default [
  // ─── Ignorados ──────────────────────────────────────────────────────────────
  { ignores: ['node_modules/', 'dist/', '.astro/'] },

  // ─── Base TypeScript (primero, para que nuestras reglas puedan hacer override) ──
  ...tsEslint.configs.recommended,

  // ─── JS / TS / JSX / TSX ────────────────────────────────────────────────────
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        jsx: true,
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      react: reactPlugin,
      import: importPlugin,
      'react-hooks': reactHooksPlugin
    },
    rules: {
      ...sharedLogicRules,
      ...importRules,

      // React
      ...reactPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-no-duplicate-props': 'error',

      // TypeScript unused vars (override del recommended)
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-explicit-any': 'warn',

      //reglas de react hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },

  // ─── Naming conventions (solo TS/TSX) ───────────────────────────────────────
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'default', format: ['camelCase', 'PascalCase'] },
        {
          selector: ['class', 'interface', 'typeParameter', 'typeAlias'],
          format: ['PascalCase']
        },
        {
          selector: ['objectLiteralProperty', 'objectLiteralMethod'],
          format: null
        },
        {
          selector: ['enum', 'enumMember'],
          format: ['PascalCase', 'snake_case']
        },
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow'
        },
        {
          selector: 'variable',
          format: ['UPPER_CASE', 'camelCase'],
          leadingUnderscore: 'allow'
        },
        {
          selector: 'typeProperty',
          format: null,
          filter: { regex: '^_count$', match: true }
        }
      ]
    }
  },

  // ─── Astro ──────────────────────────────────────────────────────────────────
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.astro'],
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    rules: {
      ...sharedLogicRules,
      'astro/no-set-html-directive': 'error',
      'astro/no-unused-css-selector': 'warn',
      'astro/prefer-class-list-directive': 'warn'
    }
  },

  // ─── Prettier (siempre al final — desactiva reglas de formato en ESLint) ────
  {
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      'prettier/prettier': 'warn'
    }
  },

  prettierConfig
]
