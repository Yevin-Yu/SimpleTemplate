import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    {
        ignores: ['dist', 'node_modules'],
    },
    {
        files: ['**/*.{ts,tsx,vue}'],
        extends: [...pluginVue.configs['flat/essential'], ...tseslint.configs.recommended, ...tseslint.configs.stylistic],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tseslint.parser,
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: './tsconfig.app.json',
                extraFileExtensions: ['.vue'],
            },
        },
        rules: {
            'vue/multi-word-component-names': 'off',
        },
    },
    {
        files: ['vite.config.ts'],
        languageOptions: {
            parserOptions: {
                project: './tsconfig.node.json',
            },
        },
    }
)
