import { expect } from "chai";

import { rules } from "../index";

import { allEslintRules } from "./allEslintRules";
import { allImportRules } from "./allImportRules";
import { allJsdocRules } from "./allJsdocRules";
import { allNonullRules } from "./allNonullRules";
import { allPreferArrowRules } from "./allPreferArrowRules";
import { allTseslintRules } from "./allTseslintRules";

// Since our rules extend from both the "eslint:all" and "plugin:@typescript-eslint/all" configs, the rules in the list
// below are all turned on. We therefore need to test that our rules either turn off one of these *or* apply a config
// that is different from the default.
const allBaseRules = { ...allEslintRules, ...allTseslintRules };

// Our rules don't extend from any config related to the list below. For these we simply test that we have all these
// rules in our list. Doing that ensures that we will not miss a newly added rule.
const allExtensionRules = { ...allImportRules, ...allJsdocRules, ...allNonullRules, ...allPreferArrowRules };

const allRules = {
    ...allBaseRules,
    ...allExtensionRules,
};

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
