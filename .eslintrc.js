module.exports = {
  extends: ['standard', 'plugin:prettier/recommended'],
  rules: {
    'no-void': ['error', { allowAsStatement: true }]
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      extends: ['standard-with-typescript', 'prettier'],
      parserOptions: {
        project: ['./tsconfig.eslint.json']
      },
      rules: {
        '@typescript-eslint/prefer-ts-expect-error': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/return-await': 'off',
        '@typescript-eslint/promise-function-async': 'off',
        '@typescript-eslint/no-floating-promises': 'off'
      }
    },
    {
      files: ['*.spec.ts', '*.test.ts'],
      rules: {}
    },
    {
      files: ['*.md'],
      plugins: ['markdown']
    }
  ]
}
