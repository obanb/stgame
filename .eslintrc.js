const path = require("path");
module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:testing-library/react',
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    plugins: [
        'react', // Uses the recommended rules from @eslint-plugin-react
        '@typescript-eslint',
        'prettier',
        'react-hooks',
        'graphql',
        'testing-library',
    ],
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
            project: './tsconfig.json',
        },
    },
    rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'graphql/template-strings': [
            'error',
            {
                schemaJsonFilepath: path.resolve(__dirname, './node_modules/up-graphql/graphql.schema.json'),
                tagName: 'graphql',
            },
        ],
        "graphql/named-operations": ['error', {
            schemaJson: require('./node_modules/up-graphql/graphql.schema.json'),
        }],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'prettier/prettier': ['error', require('./.prettierrc.js')],
        '@typescript-eslint/no-empty-interface': 0,
        'no-empty-pattern': 0,
        '@typescript-eslint/explicit-member-accessibility': 0,
        'react/react-in-jsx-scope': 1,
        '@typescript-eslint/no-var-requires': 0,
        'react/prop-types': 0,
        'no-console': 1,
        'testing-library/await-async-query': 'error',
        'testing-library/no-await-sync-query': 'error',
        'testing-library/no-debug': 'warn',
        'react/display-name': 0,
        '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    }
};