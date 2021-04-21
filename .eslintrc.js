module.exports = {
  extends: 'standard-with-typescript',
  parserOptions: {
    project: './tsconfig.json'
  },
  ignorePatterns: ['dist'],
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/prefer-ts-expect-error': 'off',
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-misused-promises': 0
  }
}
