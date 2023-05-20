import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as fs from "fs";
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // resolve: {
  //   alias: {
  //     '@': path.join(__dirname, 'src')
  //   }
  // },
  // server: {
  //   open: true,
  //   https: {
  //     // 主要是下面两行的配置文件，不要忘记引入 fs 和 path 两个对象
  //     cert: fs.readFileSync(path.join(__dirname, 'src/ssl/cert.crt')),
  //     key: fs.readFileSync(path.join(__dirname, 'src/ssl/cert.key'))
  //   }
  // }
})
