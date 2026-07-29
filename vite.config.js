import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  // svgr: "...svg?react" 로 import 하면 React 컴포넌트, 그냥 import 하면 URL
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})