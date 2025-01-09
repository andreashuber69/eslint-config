// https://github.com/andreashuber69/kiss-worker/blob/develop/README.md

import { defineConfig } from "vite";

// eslint-disable-next-line import/no-default-export, import/no-anonymous-default-export
export default defineConfig({
    build: {
        lib: {
            entry: ["./src/index.js"],
            fileName: "index",
            formats: ["es"],
        },
        outDir: "./dist",
        rollupOptions: {
            input: {
                index: "./src/index.js",
            },
        },
        sourcemap: true,
        ssr: true,
    },
});
