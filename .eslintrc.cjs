module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:react/recommended', 'standard', 'plugin:prettier/recommended', 'eslint-config-prettier'],
  overrides: [],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'prettier', 'react-hooks'],
  rules: {
    semi: ['error', 'always'],
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error', // For checking rules of hooks
    'react-hooks/exhaustive-deps': 'warn' // For checking hook dependencies
  }
};
