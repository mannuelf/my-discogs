import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { remixDevTools, defineRdtConfig } from "remix-development-tools";

const customConfig = defineRdtConfig({
  client: {
    position: "top-right",
    defaultOpen: true,
    expansionLevel: 1,
    height: 500,
    minHeight: 300,
    maxHeight: 1000,
    hideUntilHover: true,
    panelLocation: "bottom",
    requireUrlFlag: true,
    urlFlag: "customFlag",
    routeBoundaryGradient: "gotham",
  },
});

export default defineConfig({
  plugins: [
    remixDevTools(customConfig),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
});
