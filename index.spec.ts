import { configs as tsConfigs } from "@typescript-eslint/eslint-plugin";
import type { TSESLint } from "@typescript-eslint/utils";
import { expect } from "chai";
import { rules as jsdocRules } from "eslint-plugin-jsdoc";
import { builtinRules as eslintRules } from "eslint/use-at-your-own-risk";
import { rules as importRules } from "eslint-plugin-import";

import { rules as ourRules } from "./index";

const getAllEslintRuleIds = function *getAllEslintRuleIds() {
    for (const [ruleId, rule] of eslintRules.entries()) {
        if (!rule.meta?.deprecated) {
            yield ruleId;
        }
    }
};

const getAllEslintRules = () => {
    const result: Record<string, TSESLint.Linter.SeverityString> = {};

    for (const ruleId of getAllEslintRuleIds()) {
        // See https://github.com/eslint/eslint/blob/main/conf/eslint-all.js
        result[ruleId] = "error";
    }

    return result;
};

type RuleModule = Pick<TSESLint.RuleModule<string, unknown[]>, "meta">;
type RuleEntry = TSESLint.Linter.RuleEntry | RuleModule | undefined;

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

const getSeverities = (rules: Partial<Record<string, RuleEntry>> | undefined, prefix = "") => {
    const result: Record<string, TSESLint.Linter.SeverityString> = {};

    if (rules) {
        for (const id of Object.keys(rules)) {
            result[`${prefix}${prefix && "/"}${id}`] = getSeverityString(rules[id]);
        }
    }

    return result;
};

const getRules = ({ rules, overrides }: TSESLint.Linter.Config) => (overrides ? overrides?.[0]?.rules : rules);

const getAllTseslintRules = (configName: string) => {
    const config = tsConfigs[configName];

    if (!config) {
        throw Error(`Unknown config: ${configName}`);
    }

    return getSeverities(getRules(config));
};

const allEslintRules = getAllEslintRules();
// https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/all.ts
const allTseslintRules = {
    ...getAllTseslintRules("base"),
    ...getAllTseslintRules("eslint-recommended"),
    ...getAllTseslintRules("all"),
};

const allJsdocRules = getSeverities(jsdocRules, "jsdoc");
const allImportRules = getSeverities(importRules, "import");

const allRules = { ...allEslintRules, ...allTseslintRules, ...allJsdocRules, ...allImportRules };
// console.log(Object.keys(allEslintRules).length);
console.log(Object.keys(allTseslintRules).length);
// console.log(Object.keys(allRules).length);

describe("all Eslint rules", () => {
    describe("should only contain rules with the level 'error'", () => {
        for (const [id, level] of Object.entries(allEslintRules)) {
            it(id, () => {
                expect(level).to.equal("error");
            });
        }
    });
});

describe("index.js", () => {
    describe("should only turn off rules that are turned on", () => {
        for (const [id, level] of Object.entries(ourRules)) {
            it(id, () => {
                if (level === "off") {
                    const rule = allRules[id];

                    if (!rule) {
                        expect(Boolean(rule)).to.equal(true, `${id} is not in the list of all rules.`);
                    }

                    if (rule === "off") {
                        expect(rule).to.not.equal("off", `${id} in not turned on.`);
                    }
                }
            });
        }
    });
});
