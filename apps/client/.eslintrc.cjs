module.exports = {
  env: { browser: true, es2020: true },
  extends: ['plugin:react-hooks/recommended', 'plugin:react/recommended', '@repo/eslint-config/index.js', 'airbnb', 'airbnb-typescript', 'prettier'],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname
  },
  rules: {
    'prettier/prettier': ['error', { 'endOfLine': 'auto' }],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ]
  },
  overrides: [
    {
      files: ['vite.config.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      }
    }
  ]
};
