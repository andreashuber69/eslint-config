import tsParser from "@typescript-eslint/parser";

export const allExtensions = [
    ".js",
    ".cjs",
    ".mjs",
    ".jsx",
    ".ts",
    ".cts",
    ".mts",
    ".tsx",
];

export const languageOptions = {
    parser: tsParser,
    parserOptions: {
        projectService: {
            allowDefaultProject: allExtensions.filter((e) => !e.endsWith("x")).map((e) => `*${e}`),
        },
        tsconfigRootDir: process.cwd(),
    },
};
