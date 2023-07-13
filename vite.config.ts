// import { fileURLToPath, URL } from 'node:url'
import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url))
      // 设置别名 这里的./指的是 vite.config.js 的所载目录（根目录）下面的 src
      '@': path.resolve(__dirname, './src')
    }
  }
  // ,
  // server: {
  //   // host: '127.0.0.1',
  //   port: 5000,
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:9000', // 目标地址
  //       changeOrigin: true
  //     }
  //     // ,
  //     // '/test': {
  //     //   target: 'http://localhost:9000', // 目标地址
  //     //   changeOrigin: true,
  //     //   rewrite: (path) => path.replace(/^\/test/, '') // 可选的路径重写规则
  //     // },
  //     // //这个可以成功跨域
  //     // // '/API/game_dati.php': {
  //     // //   target: 'https://xiaoapi.cn', // 目标地址
  //     // //   changeOrigin: true
  //     // // },
  //     // '/API': {
  //     //   target: 'https://xiaoapi.cn', // 目标地址
  //     //   changeOrigin: true
  //     // }
  //   }
  // }
})
