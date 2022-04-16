import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Inspect from 'vite-plugin-inspect';

import glsl from 'vite-plugin-glsl';

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core'],
      dts: resolve(__dirname, 'src/@types/auto-imports.d.ts'),
    }),
    Components({
      dirs: [resolve(__dirname, 'src/components')],
      extensions: ['vue'],
      dts: resolve(__dirname, 'src/@types/components.d.ts'),
    }),
    glsl(undefined, /\.(glsl|vert|frag|vs|fs)$/i, 'glsl'),
    Inspect(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
