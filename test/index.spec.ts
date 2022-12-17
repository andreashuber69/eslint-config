import { expect } from "chai";

import { rules } from "../index";

import { allEslintRules } from "./allEslintRules";
import { allImportRules } from "./allImportRules";
import { allJsdocRules } from "./allJsdocRules";
import { allNonullRules } from "./allNonullRules";
import { allPreferArrowRules } from "./allPreferArrowRules";
import { allTseslintRules } from "./allTseslintRules";

const allRules = {
    ...allEslintRules,
    ...allTseslintRules,
    ...allImportRules,
    ...allJsdocRules,
    ...allNonullRules,
    ...allPreferArrowRules,
};

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
