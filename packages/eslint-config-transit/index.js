'use strict';

module.exports = {
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {},
    sourceType: 'script',
  },
  rules: {
    'no-param-reassign': 'off',
    'no-use-before-define': 'off',
    'radix': 'off',
    'max-len': ['error', 120, 2],
    'quote-props': ['error', 'consistent-as-needed'],
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'ignore',
    }],
  },
};
