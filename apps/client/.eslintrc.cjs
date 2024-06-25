module.exports = {
  env: { browser: true, es2020: true },
  extends: ["plugin:react-hooks/recommended", "@repo/eslint-config/index.js", "airbnb-typescript"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
    project: ["./tsconfig.app.json"],
  },
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
