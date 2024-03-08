import type { Linter } from "eslint";
import { ESLint } from "eslint";
import { getSeverities } from "./getSeverities";

export const getRules = async (config?: Linter.Config) => {
    const options = {
        useEslintrc: false,
        overrideConfig: {
            env: {
                es2024: true,
                node: true,
            },
            parser: "@typescript-eslint/parser",
            parserOptions: {
                project: ["./tsconfig.json"],
                ecmaVersion: "latest" as const,
                sourceType: "module" as const,
            },
            plugins: [
                "@typescript-eslint",
                "@stylistic",
                "unicorn",
            ],
            ...config,
        },
    };

    const eslint = new ESLint(config ? options : undefined);
    const fullConfig = (await eslint.calculateConfigForFile("index.js")) as { rules?: unknown } | undefined;
    return Object.fromEntries(Object.entries(getSeverities(fullConfig?.rules)));
};
