import { expect } from "chai";

import { rules } from "../index";

import { getAllEslintRules } from "./getAllEslintRules";
import { getAllImportRules } from "./getAllImportRules";
import { getAllJsdocRules } from "./getAllJsdocRules";
import { getAllTseslintRules } from "./getAllTseslintRules";

const allEslintRules = getAllEslintRules();
const allTseslintRules = getAllTseslintRules();
const allJsdocRules = getAllJsdocRules();
const allImportRules = getAllImportRules();

const allRules = { ...allEslintRules, ...allTseslintRules, ...allJsdocRules, ...allImportRules };

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
        for (const [id, level] of Object.entries(rules)) {
            if (level === "off") {
                it(id, () => {
                    const rule = allRules[id];

                    if (!rule) {
                        expect(Boolean(rule)).to.equal(true, `${id} is not in the list of all rules.`);
                    }

                    if (rule === "off") {
                        expect(rule).to.not.equal("off", `${id} in not turned on.`);
                    }
                });
            }
        }
    });
});
