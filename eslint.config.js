import js from '@eslint/js';
export default [js.configs.recommended, { files: ['src/**/*.ts', 'test/**/*.ts'], languageOptions: { parserOptions: { ecmaVersion: 'latest', sourceType: 'module' } } }];
