module.exports = {
  extends: [
    'next/core-web-vitals',
    'standard',
    'plugin:react/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    // your custom rules...
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
