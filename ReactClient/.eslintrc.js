module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            module: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'react',
        'react-hooks',
        '@typescript-eslint'
    ],
    rules: {
        'semi': ['error', 'always'],
        'comma-dangle': ['error', {
            'arrays': 'never',
            'objects': 'always',
            'imports': 'never',
            'exports': 'never',
            'functions': 'never',
        }],
        'operator-assignment': ['error', 'never'],
        'no-var': 'error',
        'max-len': ['error', 150, 2, { ignoreUrls: true, }],
        'prefer-destructuring': [
            'error', 
            { 'array': true, 'object': true, },
            { 'enforceForRenamedProperties': false, }
        ],
        'react/prop-types': 'off',
        'react/no-unescaped-entities': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/jsx-filename-extension': [1, { 'extensions': ['.tsx'], }],
        'jsx-quotes': ['error', 'prefer-single'],
        '@typescript-eslint/explicit-module-boundary-types': 'off', // ToDo remove after added all types
        '@typescript-eslint/ban-types': 'off', // ToDo remove after added all types
    },
};
