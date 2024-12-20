// https://github.com/andreashuber69/eslint-config/blob/master/README.md#----andreashuber69eslint-config

import type { Linter } from "eslint";
import { ESLint } from "eslint";
import { getSeverities } from "./getSeverities.js";

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
                project: true,
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
    const fullConfig = (await eslint.calculateConfigForFile("index.js")) as unknown;
    const rules = fullConfig && typeof fullConfig === "object" && "rules" in fullConfig ? fullConfig.rules : undefined;
    return Object.fromEntries(Object.entries(getSeverities(rules)));
};
