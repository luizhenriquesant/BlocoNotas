import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';

export default defineConfig([
  // Configuração base para JavaScript
  {
    ignores: ['node_modules', 'dist', 'build', 'frontend'],
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Proíbe variáveis não utilizadas
      'no-unused-vars': 'error',

      // String precis ser aspas simples
      quotes: ['error', 'single'],

      // Força o uso de async/await quando necessário
      'require-await': 'error',

      // Proíbe o uso de métodos inexistentes (como res.code)
      'no-undef': 'error',

      // Impede múltiplas linhas vazias
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],

      // Remove espaços em branco desnecessários
      'no-trailing-spaces': 'error',
    },
  },

  // Configuração recomendada para JavaScript
  js.configs.recommended,
]);