import { isDeepStrictEqual } from "node:util";
import { expect } from "chai";

import { rules as ourChanges } from "../index";

import { allImportRules } from "./allImportRules";
import { allJsdocRules } from "./allJsdocRules";
import { allPreferArrowRules } from "./allPreferArrowRules";
import { allPromiseRules } from "./allPromiseRules";
import { allUnicornRules } from "./allUnicornRules";
import { allEslintRules, getRecommendedEslintRules } from "./EslintRules";
import { allTseslintRules, recommendedTseslintRules } from "./TseslintRules";

const allRulesInConfig = { ...allEslintRules, ...allTseslintRules, ...allUnicornRules };

const shouldRuleBeInConfig = ([id]: [string, ...unknown[]]) =>
    id.includes("@typescript-eslint/") || id.includes("unicorn/") || !id.includes("/");

describe("index.js", () => {
    describe("should change the defaults of rules listed in 'all' configs", () => {
        const ourRuleInConfigChanges = Object.entries(ourChanges).filter((e) => shouldRuleBeInConfig(e));

        // Since ../index.js extends from the "eslint:all", "plugin:@typescript-eslint/all" and "plugin:unicorn/all"
        // configs, we need to test that the rule ids in ourChanges are listed in allRulesInConfig and that we apply
        // severity/options that are different.
        for (const [id, ourEntry] of ourRuleInConfigChanges) {
            it(id, () => {
                const entry = allRulesInConfig[id];
                expect(Boolean(entry)).to.equal(true, `${id} is not in the list of extended from rules.`);
                expect(isDeepStrictEqual(ourEntry, entry)).to.equal(false, `${id} does not change the default.`);
            });
        }
    });
});

const allOtherRules = { ...allImportRules, ...allJsdocRules, ...allPreferArrowRules, ...allPromiseRules };

const hasAllKeys = (original: Record<string, unknown>, tester: Record<string, unknown>, message: string) => {
    for (const id of Object.keys(original)) {
        it(id, () => {
            expect(Boolean(tester[id])).to.equal(true, `${id} ${message}`);
        });
    }
};

describe("index.js", () => {
    const ourOtherChanges = Object.fromEntries(Object.entries(ourChanges).filter((e) => !shouldRuleBeInConfig(e)));

    // ../index.js doesn't extend from any config related to allOtherRules. For these we test that *all* rule ids
    // are listed in ourChanges and vice versa. While we would not need to list rules that we turn off, doing so ensures
    // that we will be alerted when rules are added in subsequent versions. We can then consciously either turn these
    // off or set the severity/options we need.
    describe("should list all other rules", () => hasAllKeys(allOtherRules, ourOtherChanges, "is not in index.js."));
    describe("should not list unknown rules", () => hasAllKeys(ourOtherChanges, allOtherRules, "is an unknown rule."));
});

const allRules = { ...allRulesInConfig, ...allOtherRules };

describe(`${Object.keys(allRules).length} rules`, () => {
    it("Default severity should be 'off' or 'error', without options", () => {
        expect(Object.values(allRules).filter((v) => v !== "off" && v !== "error").length).to.equal(0);
    });
});

const getActiveCount =
    (rules: Record<string, unknown>) => Object.entries(rules).filter(([, entry]) => entry !== "off").length;

const showStats = async () => {
    const recommendedCount = getActiveCount({ ...await getRecommendedEslintRules(), ...recommendedTseslintRules });
    console.log(`eslint & @typescript-eslint recommended active rules: ${recommendedCount}`);
    const ourCount = getActiveCount({ ...allRules, ...ourChanges });
    console.log(`@andreashuber/eslint-config active rules: ${ourCount}`);
};

// This is a CommonJS module, where top-level await is not available. Compiling tests differently is possible but not
// worth the effort.
// eslint-disable-next-line unicorn/prefer-top-level-await
showStats().catch((error) => console.error(error));
