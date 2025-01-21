import { defineConfig } from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      include: ['src']
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'hoverScrollbar',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['terser'],
      output: {
        globals: {},
        exports: 'named'
      }
    },
    commonjsOptions: {
      transformMixedEsModules: true
    },
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_debugger: true
      },
      format: {
        comments: true
      }
    }
  }
});
