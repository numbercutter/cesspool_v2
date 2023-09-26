module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser', // Change this line
    requireConfigFile: false, // Add this line if you don't have a Babel config file
  },
  rules: {
    'vue/multi-word-component-names': 'off', // Add this line
    'vue/no-reserved-component-names': 'off', // Add this line
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
