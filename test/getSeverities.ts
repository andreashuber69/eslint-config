// https://github.com/andreashuber69/eslint-config/blob/master/README.md#----andreashuber69eslint-config
import type { TSESLint } from "@typescript-eslint/utils";

const getRuleLevel = (entry: unknown) => {
    switch (typeof entry) {
        case "number":
        case "string":
            return entry;
        default:
            return Array.isArray(entry) && entry.length ? entry[0] : "error";
    }
};

const getSeverityString = (entry: unknown): TSESLint.Linter.SeverityString => {
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

export const getSeverities = (rules: unknown, prefix = "") => {
    const result: Record<string, unknown> = {};

    if (rules && typeof rules === "object") {
        for (const id of Object.keys(rules)) {
            result[`${prefix}${prefix && "/"}${id}`] = getSeverityString((rules as Record<string, unknown>)[id]);
        }
    }

    return result;
};
