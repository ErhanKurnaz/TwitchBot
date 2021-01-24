module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: ['prettier', 'airbnb-base'],
    plugins: ['prettier'],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        indent: [2, 4],
        semi: [2, 'never'],
        'no-console': 0,
        'arrow-parens': [2, 'as-needed'],
        'object-curly-newline': 0,
        'prettier/prettier': 2,
    },
}
