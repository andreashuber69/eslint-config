import tsParser from "@typescript-eslint/parser";
import globals from "globals";

export const allExtensions = [
    ".js",
    ".cjs",
    ".mjs",
    ".jsx",
    ".cjsx",
    ".mjsx",
    ".ts",
    ".cts",
    ".mts",
    ".tsx",
    ".ctsx",
    ".mtsx",
];

export const languageOptions = {
    globals: {
        ...globals.node,
    },
    parser: tsParser,
    parserOptions: {
        projectService: {
            allowDefaultProject: allExtensions.filter((e) => !e.endsWith("x")).map((e) => `*${e}`),
        },
        tsconfigRootDir: process.cwd(),
    },
};
