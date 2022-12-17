import type { TSESLint } from "@typescript-eslint/utils";

type RuleModule = Pick<TSESLint.RuleModule<string, unknown[]>, "meta">;

type RuleEntry = RuleModule | TSESLint.Linter.RuleEntry | undefined;

const getRuleLevel = (entry: RuleEntry) => {
    switch (typeof entry) {
        case "number":
        case "string":
            return entry;
        default:
            return entry instanceof Array ? entry[0] : "error";
    }
};

const getSeverityString = (entry: RuleEntry) => {
    const ruleLevel = getRuleLevel(entry);

    switch (ruleLevel) {
        case undefined:
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
    const result: Record<string, TSESLint.Linter.SeverityString> = {};

    if (rules) {
        for (const id of Object.keys(rules)) {
            result[`${prefix}${prefix && "/"}${id}`] = getSeverityString(rules[id]);
        }
    }

    return result;
};
