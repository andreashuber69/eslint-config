import { configs } from "@typescript-eslint/eslint-plugin";
import type { TSESLint } from "@typescript-eslint/utils";

const getRules = ({ rules, overrides }: TSESLint.Linter.Config) => (overrides ? overrides?.[0]?.rules : rules);

const getAllRules = (configName: string) => {
    const config = configs[configName];

    if (!config) {
        throw Error(`Unknown config: ${configName}`);
    }

    return getRules(config);
};

// https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/all.ts
export const allTseslintRules = { ...getAllRules("base"), ...getAllRules("eslint-recommended"), ...getAllRules("all") };
