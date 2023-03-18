import react from '@vitejs/plugin-react';
import { rmSync } from 'node:fs';
import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron-renderer';

export default defineConfig(({ command }) => {
  rmSync('dist', { recursive: true, force: true });

  const isBuild = command === 'build';

  return {
    plugins: [
      react(),
      electron([
        {
          entry: 'src/main/electron.ts',
          vite: {
            build: {
              minify: isBuild,
              outDir: 'dist/'
            }
          }
        }
      ]),
      renderer({
        nodeIntegration: true
      })
    ],
    root: './src/renderer/',
    build: {
      outDir: '../../dist/'
    }
  };
});
