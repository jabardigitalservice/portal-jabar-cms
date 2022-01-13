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
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'max-len': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off'
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
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.vue'],
      },
    },
  },
};
