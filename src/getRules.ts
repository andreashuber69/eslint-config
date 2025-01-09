// https://github.com/andreashuber69/eslint-config/blob/master/README.md#----andreashuber69eslint-config

import type { Linter } from "eslint";
import { ESLint } from "eslint";

import { languageOptions } from "./languageOptions.ts";

const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null;

export const getRules = async (config?: unknown[]): Promise<Record<string, unknown>> => {
    const overrideOptions: ESLint.Options = {
        overrideConfigFile: true,
        overrideConfig: [
            // There's no other way
            // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
            ...((config ?? []) as Linter.Config[]),
            { languageOptions },
        ],
    };

    const configFileOptions: ESLint.Options = {
        flags: ["unstable_ts_config"],
    };

    const eslint = new ESLint(config ? overrideOptions : configFileOptions);
    const fullConfig = (await eslint.calculateConfigForFile("src/index.js")) as unknown;

    if (fullConfig && typeof fullConfig === "object" && "rules" in fullConfig) {
        const { rules } = fullConfig;

        if (isRecord(rules)) {
            return rules;
        }
    }

    throw new Error("Unexpected config!");
};
