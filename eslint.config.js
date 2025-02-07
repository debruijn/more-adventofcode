import js from '@eslint/js'

export default [
    js.configs.recommended,
    {
        languageOptions: {
            globals: {
                console: true,
                process: true
            }
        },
        rules: {
            'no-console': ['error', { allow: ['warn', 'error', 'log', 'time', 'timeEnd'] }], // Allow console.warn and console.error
            'no-unused-vars': [
                'off',
                {
                    vars: 'all', // Check all
                    args: 'after-used', // Ignore unused variables after they are used
                    ignoreRestSiblings: false, // Ignore unused variables that are rest siblings
                    varsIgnorePattern: '^_', // Ignore unused variables starting with an underscore
                    argsIgnorePattern: '^_' // Ignore unused variables starting with an underscore
                }
            ], // Warn on unused variables
            'no-undef': [
                'off',
                {
                    typeof: true
                }
            ], // Error on undefined variables
            quotes: ['error', 'single', { allowTemplateLiterals: true }] // Use single quotes
        }
    }
]
