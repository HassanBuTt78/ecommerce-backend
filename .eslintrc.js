module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
    },
    extends: "eslint:recommended",
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
    },
    rules: {
        "no-console": ["warn"],
        "no-unused-vars": ["warn"],
        indent: ["warn", 4],
        "linebreak-style": ["warn", "windows"],
        quotes: ["warn", "double"],
        semi: ["warn", "always"],
    },
};
