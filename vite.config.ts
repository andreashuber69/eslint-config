// https://github.com/andreashuber69/kiss-worker/blob/develop/README.md

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// eslint-disable-next-line import/no-default-export, import/no-anonymous-default-export
export default defineConfig({
    build: {
        lib: {
            entry: ["src/index.ts"],
            fileName: "index",
            formats: ["es"],
        },
        outDir: "dist",
        sourcemap: true,
        ssr: true,
    },
    plugins: [dts({ rollupTypes: true })],
});
