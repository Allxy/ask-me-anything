module.exports = {
  env: {
    es2021: true
  },
  extends: [
    'react-app',
    'react-app/jest'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json']
  },
  rules: {
    semi: ['error', 'always'],
    '@typescript-eslint/semi': ['error', 'always'],
    'jsx-quotes': ['error', 'prefer-single']
  }
};
