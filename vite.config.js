import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import { VitePWA } from 'vite-plugin-pwa';
import ViteFonts from 'vite-plugin-fonts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Icons({
      compiler: 'vue3',
      defaultStyle: 'vertical-align: middle; transform: translateY(-5%);',
    }),
    ViteFonts({
      google: {
        families: [{
          name: 'Fira Sans',
          styles: 'wght@400;500;700',
        }],
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'GeoJSON to WKT converter',
        short_name: 'GeoJSON to WKT converter',
        description: 'Progressive Web App to convert between GeoJSON and Well Known Text (WKT) formats',
        theme_color: '#737E96',
        background_color: '#737E96',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
});
