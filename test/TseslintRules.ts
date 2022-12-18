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

const baseAndEslintRecommended = { ...getAllRules("base"), ...getAllRules("eslint-recommended") };

// https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/all.ts
export const allTseslintRules = { ...baseAndEslintRecommended, ...getAllRules("all") };

// https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts
export const recommendedTseslintRules = { ...baseAndEslintRecommended, ...getAllRules("recommended") };
