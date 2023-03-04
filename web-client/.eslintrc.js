module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  globals: {
    __CONFIG__: true,
    __ENV__: true,
  },
  extends: ['airbnb', 'airbnb-typescript'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'],
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  rules: {
    'react/prop-types': 1,
    'linebreak-style': ['error', 'unix'],
    'max-len': 0,
    'no-plusplus': 0,
    'no-underscore-dangle': 0,
    'operator-linebreak': [
      'error',
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before',
        },
      },
    ],
    'react/jsx-props-no-spreading': ['error', { exceptions: ['Component'] }],
    'react/forbid-prop-types': 0,
    'import/prefer-default-export': 0,
    'template-curly-spacing': ['off'],
    'array-callback-return': 0,
  },
};
