import { isDeepStrictEqual } from "util";
import { expect } from "chai";

import { rules as ourRules } from "../index";

import { allEslintRules } from "./allEslintRules";
import { allImportRules } from "./allImportRules";
import { allJsdocRules } from "./allJsdocRules";
import { allNonullRules } from "./allNonullRules";
import { allPreferArrowRules } from "./allPreferArrowRules";
import { allTseslintRules } from "./allTseslintRules";

const allEsTsRules = { ...allEslintRules, ...allTseslintRules };

describe("index.js", () => {
    describe("should change the default of ES and TS rules", () => {
        // Since our rules extend from both the "eslint:all" and "plugin:@typescript-eslint/all" configs, we
        // need to test that our rules are listed in allEsTsRules and apply a config that is different from the
        // default.
        const ourEsTsRules =
            Object.entries(ourRules).filter(([id]) => id.includes("@typescript-eslint/") || !id.includes("/"));

        for (const [id, ourEntry] of ourEsTsRules) {
            it(id, () => {
                const entry = allEsTsRules[id];
                expect(Boolean(entry)).to.equal(true, `${id} is not in the list of extended from rules.`);
                expect(isDeepStrictEqual(ourEntry, entry)).to.equal(false, `${id} does not change the default.`);
            });
        }
    });
});

const allOtherRules = { ...allImportRules, ...allJsdocRules, ...allNonullRules, ...allPreferArrowRules };

describe("index.js", () => {
    describe("should list all other rules", () => {
        // Our rules don't extend from any config related to allOtherRules. For these we simply test that we have all
        // these rules in our list. Doing that ensures that we will not miss a newly added rule.
        const ourOtherRules = Object.fromEntries(
            Object.entries(ourRules).filter(([id]) => !id.includes("@typescript-eslint/") && id.includes("/")),
        );

        for (const id of Object.keys(allOtherRules)) {
            it(id, () => {
                expect(Boolean(ourOtherRules[id])).to.equal(true, `${id} is not in the list of other rules.`);
            });
        }
    });
});
