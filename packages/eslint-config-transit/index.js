'use strict';

module.exports = {
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {},
    sourceType: 'script',
  },
  rules: {
    'no-await-in-loop': 'off',
    'no-param-reassign': 'off',
    'no-use-before-define': 'off',
    'no-continue': 'off',
    'radix': 'off',
    'max-len': ['error', 120, 2],
    'quote-props': ['error', 'consistent'],
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
    'no-underscore-dangle': ['error', {
      'allowAfterThis': true,
      'allowAfterSuper': true,
    }],
    'class-methods-use-this': 'off',
  },
};
