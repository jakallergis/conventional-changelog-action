module.exports = {
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  env: {
    node: true,
    es6: true,
    'jest/globals': true
  },
  extends: ['plugin:github/recommended', 'eslint:recommended', 'prettier'],
  plugins: ['jest', '@typescript-eslint'],
  rules: {
    strict: ['error', 'never']
  },
  overrides: [
    {
      files: 'src/**/*.+(ts|tsx)',
      excludedFiles: '**/*.+.spec.(ts|tsx)',
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json'
      },
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'no-console': 'off'
      },
      plugins: ['@typescript-eslint/eslint-plugin'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
      ]
    },
    {
      files: ['__tests__/**/*.+(ts|tsx)', '**/*.+.spec.(ts|tsx)'],
      excludedFiles: ['__tests__/**/*'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tests-tsconfig.json'
      },
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'no-console': 'off'
      },
      plugins: ['@typescript-eslint/eslint-plugin'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
      ]
    }
  ]
}
