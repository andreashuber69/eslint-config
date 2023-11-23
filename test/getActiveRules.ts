import type { Linter } from "eslint";
import { ESLint } from "eslint";
import { getSeverities } from "./getSeverities";

export const getActiveRules = async (config?: Linter.Config) => {
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
    const fullConfig: unknown = (await eslint.calculateConfigForFile("index.js")) ?? {};
    return Object.fromEntries(Object.entries(getSeverities(fullConfig?.rules)).filter(([_, c]) => c !== "off"));
};
