import type { TSESLint } from "@typescript-eslint/utils";
// eslint-disable-next-line import/no-deprecated
import { builtinRules } from "eslint/use-at-your-own-risk";
import fetch from "node-fetch";

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

export const getRecommendedEslintRules = async () => {
    const sourceCode =
        await (await fetch("https://raw.githubusercontent.com/eslint/eslint/main/conf/eslint-recommended.js")).text();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, import/dynamic-import-chunkname
    const { rules } = await import(`data:text/javascript;charset=utf-8, ${encodeURIComponent(sourceCode)}`);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return rules;
};

export const allEslintRules = getAllEslintRules();
