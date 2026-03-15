import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import contentCollections from "@content-collections/vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// import { nitro } from "nitro/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

const config = defineConfig({
  plugins: [
    devtools(),
    // nitro({ rollupConfig: { external: [/^@sentry\//] } }),
    contentCollections(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart(),
    //   {
    //   prerender: {
    //     enabled: true,
    //     crawlLinks: true,
    //   },
    //   sitemap: {
    //     enabled: true,
    //     host: "https://numbers.memedev.win/",
    //   },
    // }
    viteReact(),
  ],
});

export default config;
