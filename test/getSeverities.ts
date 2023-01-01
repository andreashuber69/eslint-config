import type { TSESLint } from "@typescript-eslint/utils";

type RuleModule = TSESLint.RuleModule<string, unknown[]>;

type RuleEntry = RuleModule | TSESLint.Linter.RuleEntry | undefined;

const getRuleLevel = (entry: RuleEntry) => {
    switch (typeof entry) {
        case "number":
        case "string":
            return entry;
        default:
            return (Array.isArray(entry) && entry[0]) || "error";
    }
};

const getSeverityString = (entry: RuleEntry): TSESLint.Linter.SeverityString => {
    const ruleLevel = getRuleLevel(entry);

    switch (ruleLevel) {
        case 0:
            return "off";
        case 1:
            return "warn";
        case 2:
            return "error";
        default:
            return ruleLevel;
    }
};

export const getSeverities = (rules: Record<string, RuleEntry> | undefined, prefix = "") => {
    const result: Record<string, unknown> = {};

    if (rules) {
        for (const id of Object.keys(rules)) {
            result[`${prefix}${prefix && "/"}${id}`] = getSeverityString(rules[id]);
        }
    }

    return result;
};
