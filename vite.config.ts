/*
 * @Author: wangqiaoling
 * @LastEditors: wangqiaoling
 * @Description:
 */
import { defineConfig } from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      include: ['src'],
      beforeWriteFile: (filePath, content) => {
        // 确保生成的.d.ts文件包含所有导出
        if (filePath.endsWith('index.d.ts')) {
          return {
            filePath,
            content: content
          };
        }
      }
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
      external: [],
      output: {
        globals: {},
        exports: 'named'
      }
    },
    commonjsOptions: {
      transformMixedEsModules: true
    },
    sourcemap: true
  }
});
