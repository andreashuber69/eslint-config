import { isDeepStrictEqual } from "util";
import { expect } from "chai";

import { rules as ourChanges } from "../index";

import { allEslintRules } from "./allEslintRules";
import { allImportRules } from "./allImportRules";
import { allJsdocRules } from "./allJsdocRules";
import { allNonullRules } from "./allNonullRules";
import { allPreferArrowRules } from "./allPreferArrowRules";
import { allTseslintRules } from "./allTseslintRules";

const allEsTsRules = { ...allEslintRules, ...allTseslintRules };

describe("index.js", () => {
    describe("should change the default of ES and TS rules", () => {
        // Since ../index.js extends from both the "eslint:all" and "plugin:@typescript-eslint/all" configs, we need
        // to test that the rule ids in ourChanges are listed in allEsTsRules and that we apply severity/options that
        // are different.
        const ourEsTsChanges =
            Object.entries(ourChanges).filter(([id]) => id.includes("@typescript-eslint/") || !id.includes("/"));

        for (const [id, ourEntry] of ourEsTsChanges) {
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
        // ../index.js doesn't extend from any config related to allOtherRules. For these we test that *all* rule ids
        // are listed in ourChanges. While we would not need to list rules that we turn off, doing so ensures that we
        // will be alerted when rules are added in subsequent versions. We can then consciously either turn these off or
        // set the severity/options we need.
        const ourOtherChanges = Object.fromEntries(
            Object.entries(ourChanges).filter(([id]) => !id.includes("@typescript-eslint/") && id.includes("/")),
        );

        for (const id of Object.keys(allOtherRules)) {
            it(id, () => {
                expect(Boolean(ourOtherChanges[id])).to.equal(true, `${id} is not in the list of other rules.`);
            });
        }
    });
});

const allRules = { ...allEsTsRules, ...allOtherRules };

describe(`${Object.keys(allRules).length} rules`, () => {
    it("Default severity should be 'off' or 'error', without options", () => {
        expect(Object.values(allRules).filter((v) => v !== "off" && v !== "error").length).to.equal(0);
    });
});

const activeRules = Object.entries({ ...allRules, ...ourChanges }).filter(([, entry]) => entry !== "off");
console.log(`@andreashuber/eslint-config active rules: ${activeRules.length}`);
