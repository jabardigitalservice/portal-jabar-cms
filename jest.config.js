module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleNameMapper: {
    '^@/(.*svg)(\\?inline)$': '<rootDir>/src/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.svg': '<rootDir>/tests/helpers/svgTransform.js',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  collectCoverage: true,
};
