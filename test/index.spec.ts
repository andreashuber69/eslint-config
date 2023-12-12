// https://github.com/andreashuber69/eslint-config/blob/master/README.md#----andreashuber69eslint-config
import assert from "node:assert";
import { describe, it } from "node:test";
import { isDeepStrictEqual } from "node:util";

import { rules as ourChanges } from "../index";

import { allImportRules } from "./allImportRules";
import { allJsdocRules } from "./allJsdocRules";
import { allPreferArrowRules } from "./allPreferArrowRules";
import { allPromiseRules } from "./allPromiseRules";
import { getActiveRules } from "./getActiveRules";

const getAllConfigsRules = async () => await getActiveRules({
    extends: [
        "eslint:all",
        "plugin:@typescript-eslint/all",
        "plugin:@stylistic/disable-legacy",
        "plugin:@stylistic/all-extends",
        "plugin:unicorn/all",
    ],
});

const allOtherRules = { ...allImportRules, ...allJsdocRules, ...allPreferArrowRules, ...allPromiseRules };

const isInAllConfigs = ([id]: [string, ...unknown[]]) =>
    id.includes("@typescript-eslint/") || id.includes("@stylistic/") || id.includes("unicorn/") || !id.includes("/");

const hasAllKeys = (original: Record<string, unknown>, tester: Record<string, unknown>, message: string) => {
    for (const id of Object.keys(original)) {
        it(id, () => assert(Boolean(tester[id]), `${id} ${message}`));
    }
};

// eslint-disable-next-line promise/always-return
getAllConfigsRules().then((allConfigsRules) => {
    describe("index.js", () => {
        // According to https://eslint.style/guide/config-presets#enable-all-avaible-rules,
        // plugin:@stylistic/all-extends deliberately does not include non-fixable rules, we therefore need to
        // test these differently.
        const nonFixableStylisticRuleIds = [
            "@stylistic/max-len",
            "@stylistic/max-statements-per-line",
            "@stylistic/no-mixed-operators",
            "@stylistic/no-mixed-spaces-and-tabs",
            "@stylistic/no-tabs",
        ];

        describe("should list all non-fixable stylistic rules", () => {
            for (const id of nonFixableStylisticRuleIds) {
                it(id, () => {
                    assert(Boolean(ourChanges[id]), `${id} is not in index.js.`);
                    assert(!allConfigsRules[id], `${id} is unexpectedly in the list of extended from rules.`);
                });
            }
        });

        describe("should change the defaults of rules listed in 'all' configs", () => {
            for (const [id, ourEntry] of Object.entries(ourChanges).filter((e) => isInAllConfigs(e))) {
                if (!nonFixableStylisticRuleIds.includes(id)) {
                    it(id, () => {
                        // Since ../index.js extends from the "eslint:all", "plugin:@typescript-eslint/all",
                        // "plugin:@stylistic/all-extends" and "plugin:unicorn/all" configs, we need to test that the
                        // rule ids in ourChanges are listed in allRulesInConfig and that we apply severity/options that
                        // are different.
                        const entry = allConfigsRules[id];
                        assert(Boolean(entry), `${id} is not in the list of extended from rules.`);
                        assert(!isDeepStrictEqual(ourEntry, entry), `${id} does not change the default.`);
                    });
                }
            }
        });

        const ourOtherChanges = Object.fromEntries(Object.entries(ourChanges).filter((e) => !isInAllConfigs(e)));

        // ../index.js doesn't extend from any config related to allOtherRules. For these we test that *all* rule ids
        // are listed in ourChanges and vice versa. While we would not need to list rules that we turn off, doing so
        // ensures that we will be alerted when rules are added in subsequent versions. We can then consciously either
        // turn these off or set the severity/options we need.
        describe(
            "should list all other rules",
            () => hasAllKeys(allOtherRules, ourOtherChanges, "is not in index.js."),
        );

        describe(
            "should not list unknown rules",
            () => hasAllKeys(ourOtherChanges, allOtherRules, "is an unknown rule."),
        );
    });

    const allRules = { ...allConfigsRules, ...allOtherRules };

    describe(`${Object.keys(allRules).length} rules`, () => {
        it("Default severity should be 'off' or 'error', without options", () => {
            assert(Object.values(allRules).filter((v) => v !== "off" && v !== "error").length === 0);
        });
    });
// eslint-disable-next-line unicorn/prefer-top-level-await
}).catch((error) => console.error(error));

const showStats = async () => {
    const recommendedCount = Object.keys(await getActiveRules({
        extends: [
            "eslint:recommended",
            "plugin:@typescript-eslint/recommended",
        ],
    })).length;

    console.log(`eslint & @typescript-eslint recommended active rules: ${recommendedCount}`);
    const ourCount = Object.keys(await getActiveRules()).length;
    console.log(`@andreashuber/eslint-config active rules: ${ourCount}`);
};

// This is a CommonJS module, where top-level await is not available. Compiling tests differently is possible but not
// worth the effort.
// eslint-disable-next-line unicorn/prefer-top-level-await
showStats().catch((error) => console.error(error));
