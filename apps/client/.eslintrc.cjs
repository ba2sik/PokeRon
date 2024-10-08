module.exports = {
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    '@repo/eslint-config/index.js'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname
  },
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    // React rules
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    'react/jsx-indent': [
      'error',
      2,
      {
        checkAttributes: true,
        indentLogicalExpressions: true
      }
    ],
    'react/jsx-curly-brace-presence': [
      'error',
      {
        props: 'never',
        children: 'never'
      }
    ],
    'react/jsx-wrap-multilines': [
      'error',
      {
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        logical: 'parens-new-line'
      }
    ],
    'react/jsx-max-props-per-line': [
      'error',
      {
        maximum: 1
      }
    ],
    'react/prop-types': 'off',
    'react/jsx-one-expression-per-line': [
      'error',
      {
        allow: 'single-child'
      }
    ],
    'react/jsx-first-prop-new-line': [
      2,
      'multiline'
    ],
    'react/jsx-indent-props': [2, 2],
    'react/jsx-closing-bracket-location': [
      2,
      'tag-aligned'
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
};
