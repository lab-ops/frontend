import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import progress from 'vite-plugin-progress'
// import imagemin from "unplugin-imagemin/vite";
import { VitePWA } from 'vite-plugin-pwa'
import { comlink } from 'vite-plugin-comlink'
import webfontDownload from 'vite-plugin-webfont-dl'
import Icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    progress(),
    react(),
    // imagemin({
    //   // Default mode squoosh. support squoosh and sharp
    //   mode: "squoosh",
    //   // Default configuration options for compressing different pictures
    //   compress: {
    //     jpg: {
    //       quality: 0,
    //     },
    //     jpeg: {
    //       quality: 70,
    //     },
    //     png: {
    //       quality: 70,
    //     },
    //     webp: {
    //       quality: 70,
    //     },
    //   },
    //   // The type of picture converted after the build
    //   conversion: [
    //     { from: "png", to: "jpeg" },
    //     { from: "jpeg", to: "webp" },
    //   ],
    // }),
    VitePWA(),
    comlink(),
    webfontDownload(),
    Icons({
      // experimental
      autoInstall: true
    })
  ],
  worker: {
    plugins: [comlink()]
  }
})
