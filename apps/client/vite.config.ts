import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-ignore
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  base: '/PokeRon',
  plugins: [react(), eslint()],
});
