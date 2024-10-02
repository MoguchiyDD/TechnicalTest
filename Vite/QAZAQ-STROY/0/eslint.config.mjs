import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const compat = new FlatCompat({
    baseDirectory:     dirname,
    recommendedConfig: js.configs.recommended,
    allConfig:         js.configs.all,
});

export default [
    {
        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },

        rules: {
            indent:    ['error', 'tab'],
            'max-len': [
                'error',
                120,
                4,
                {
                    ignoreComments: true,
                },
            ],

            'func-names': ['error', 'never'],

            indent: [
                'error',
                4,
                {
                    SwitchCase:   1,
                    ignoredNodes: ['TemplateLiteral'],
                },
            ],

            'key-spacing': [
                'error',
                {
                    align: 'value',
                },
            ],

            'no-multi-spaces': [
                'error',
                {
                    exceptions: {
                        VariableDeclarator: true,
                        ImportDeclaration:  true,
                    },
                },
            ],

            'no-new':            'off',
            'no-param-reassign': 'off',
            'linebreak-style':   'off',

            'no-underscore-dangle': [
                'error',
                {
                    enforceInMethodNames: false,
                    allowAfterThis:       true,
                },
            ],

            'padding-line-between-statements': [
                'error',
                {
                    blankLine: 'always',
                    prev:      '*',
                    next:      'return',
                },
                {
                    blankLine: 'always',
                    prev:      ['const', 'let', 'var'],
                    next:      '*',
                },
                {
                    blankLine: 'any',
                    prev:      ['const', 'let', 'var'],
                    next:      ['const', 'let', 'var'],
                },
                {
                    blankLine: 'always',
                    prev:      'if',
                    next:      '*',
                },
                {
                    blankLine: 'always',
                    prev:      '*',
                    next:      'if',
                },
                {
                    blankLine: 'always',
                    prev:      'import',
                    next:      '*',
                },
                {
                    blankLine: 'any',
                    prev:      'import',
                    next:      'import',
                },
                {
                    blankLine: 'always',
                    prev:      '*',
                    next:      'export',
                },
            ],

            'arrow-parens': [
                'error',
                'as-needed',
                {
                    requireForBlockBody: true,
                },
            ],

            'import/no-extraneous-dependencies': 'off',
            'import/no-unresolved':              'off',

            'class-methods-use-this': [
                'warn',
                {
                    exceptMethods: ['loader'],
                },
            ],
        },
    },
];
