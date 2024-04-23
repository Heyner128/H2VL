import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import node from "@astrojs/node";
import { loadEnv } from "vite";
const { PUBLIC_STRAPI_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  image: {
    domains: [PUBLIC_STRAPI_URL]
  },
  output: "hybrid",
  adapter: node({
    mode: "standalone"
  })
});