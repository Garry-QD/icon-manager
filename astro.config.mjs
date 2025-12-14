// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        external: [
          'fs',
          'path',
          'node:fs',
          'node:path',
          'fs/promises',
          'node:fs/promises'
        ]
      }
    }
  },

  adapter: node({
    mode: 'standalone'
  })
});