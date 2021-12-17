module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'global-require': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'max-len': 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.js',
        '**/tests/unit/**/*.spec.js',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
