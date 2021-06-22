module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
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
    'linebreak-style': ['error', 'windows'],
    'no-param-reassign': ['error', {
      props: false,
    }],
  },
};
