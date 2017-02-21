'use strict';

module.exports = {
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {},
    sourceType: 'script',
  },
  rules: {
    'brace-style': 'off',
    'max-len': ['error', 105, 2],
    'no-param-reassign': 'off',
    'no-use-before-define': 'off',
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'ignore',
    }],
  },
};
