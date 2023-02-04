import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    plugins: [react()],
    define: {
      'process.env': { ...process.env, ...loadEnv(mode, process.cwd()) }
    },
    server: {
      port: 3000
    }
  });
};

// TODO: https://nowtime.cc/react/1651.html
