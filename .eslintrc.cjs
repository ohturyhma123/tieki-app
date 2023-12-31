module.exports = {
  root: true,
  env: { browser: true, node: true, es2020: true, jest: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off',
    'eqeqeq': 'error',
    'no-trailing-spaces': 'warn',
    'object-curly-spacing': ['warn', 'always'],
    'arrow-spacing': ['warn', { before: true, after: true }],
    'indent': ['warn', 2],
    'linebreak-style': ['warn', 'unix'],
    'quotes': ['warn', 'single'],
    'semi': ['warn', 'never'],
    'no-console': 'warn'
  },
  overrides: [
    {
      files: ['**/backend/**/*.js'],
      rules: {
        'no-console': 'off',
        'eqeqeq': 'error',
        'no-trailing-spaces': 'warn',
        'object-curly-spacing': ['warn', 'always'],
        'arrow-spacing': ['warn', { before: true, after: true }],
        'indent': ['warn', 2],
        'linebreak-style': ['warn', 'unix'],
        'quotes': ['warn', 'single'],
        'semi': ['warn', 'never']
      }
    }
  ]
}