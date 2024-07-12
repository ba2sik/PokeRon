module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'prettier',
    '@repo/eslint-config/index.js',
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'vite.config.ts',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    // Typescript
    '@typescript-eslint/no-unused-vars': 'warn',
    // React rules
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/jsx-indent': [
      'error',
      2,
      {
        checkAttributes: true,
        indentLogicalExpressions: true,
      },
    ],
    'react/jsx-curly-brace-presence': [
      'error',
      {
        props: 'never',
        children: 'never',
      },
    ],
    'react/jsx-wrap-multilines': [
      'error',
      {
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        logical: 'parens-new-line',
      },
    ],
    'react/jsx-max-props-per-line': [
      'error',
      {
        maximum: 1,
      },
    ],
    'react/prop-types': 'off',
    'react/jsx-one-expression-per-line': [
      'error',
      {
        allow: 'single-child',
      },
    ],
    'react/jsx-first-prop-new-line': [
      2,
      'multiline',
    ],
    'react/jsx-indent-props': [2, 2],
    'react/jsx-closing-bracket-location': [
      2,
      'tag-aligned',
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  overrides: [
    {
      files: ['vite.config.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any':
          'off',
      },
    },
  ],
};
