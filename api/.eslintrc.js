module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    semi: ['error', 'always'],
    'object-curly-newline': ['error', 'always'],
    'linebreak-style': 0,
    'no-param-reassign': ['error', {
      props: false,
    }],
  },
};
