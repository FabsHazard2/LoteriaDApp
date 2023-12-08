import { fileURLToPath, URL } from 'url';
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig((mode) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: "/LoteriaDApp/",
    plugins: [react()],
    server: {
      port: env.VITE_APP_PORT,
    },
    resolve: {
      alias: {
        '@src': fileURLToPath(new URL('./src', import.meta.url)),
        '@sass': fileURLToPath(new URL('./src/sass', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@utils': fileURLToPath(new URL('./src/utils', import.meta.url))
      }
    }
  }
});