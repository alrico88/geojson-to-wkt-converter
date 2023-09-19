export default defineNuxtConfig({
  extends: ["nuxt-umami"],
  app: {
    head: {
      title: "GeoJSON to WKT online converter",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#737E96" },
        {
          name: "google-site-verification",
          content: "UZOcaXnekxNx3602Y3bTdmQ76izGiFgKdkMnByPC_PM",
        },
        {
          name: "description",
          content:
            "Progressive Web App to convert between GeoJSON and Well Known Text (WKT) formats",
        },
        {
          name: "robots",
          content: "index,follow",
        },
        {
          name: "keywords",
          content:
            "geojson,wkt,well known text,converter,convert to geojson, convert to wkt, draw geojson, draw wkt",
        },
      ],
      htmlAttrs: {
        "data-bs-theme": "light",
      },
    },
  },
  css: ["@/assets/main.scss"],
  modules: [
    "nuxt-icon",
    "@vueuse/nuxt",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "storeToRefs"],
      },
    ],
    "@vite-pwa/nuxt",
    "nuxt3-leaflet",
    "@nuxtjs/google-fonts",
  ],
  pwa: {
    registerType: "prompt",
    manifest: {
      name: "GeoJSON to WKT converter",
      description:
        "Progressive Web App to convert between GeoJSON and Well Known Text (WKT) formats",
      theme_color: "#737E96",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    client: {
      installPrompt: true,
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,png,svg,ico,woff,woff2}"],
      cleanupOutdatedCaches: true,
    },
  },
  appConfig: {
    buildDate: new Date().toISOString(),
    umami: {
      host: "https://stats.alrico.es",
      id: "96f162ec-d233-4e7e-ae2c-05d8a1b4bd74",
      ignoreLocalhost: true,
    },
  },
  googleFonts: {
    families: {
      "Fira Sans": [400, 600, 800],
    },
  },
});
