import type { TSESLint } from "@typescript-eslint/utils";
// eslint-disable-next-line import/no-deprecated
import { builtinRules } from "eslint/use-at-your-own-risk";

const getAllEslintRules = () => {
    const result: Record<string, TSESLint.Linter.SeverityString> = {};

    // See https://github.com/eslint/eslint/blob/main/conf/eslint-all.js
    // eslint-disable-next-line import/no-deprecated
    for (const [ruleId, rule] of builtinRules.entries()) {
        if (!rule.meta?.deprecated) {
            result[ruleId] = "error";
        }
    }

    return result;
};

export const allEslintRules = getAllEslintRules();
