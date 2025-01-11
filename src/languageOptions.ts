import tsParser from "@typescript-eslint/parser";

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
    parser: tsParser,
    parserOptions: {
        projectService: {
            allowDefaultProject: allExtensions.filter((e) => !e.endsWith("x")).map((e) => `*${e}`),
        },
        tsconfigRootDir: process.cwd(),
    },
};
