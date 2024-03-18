// https://github.com/andreashuber69/eslint-config/blob/master/README.md#----andreashuber69eslint-config
import assert from "node:assert";
import { describe, it } from "node:test";
import { isDeepStrictEqual } from "node:util";

import { rules as ourChanges } from "../index";

import { allImportRules } from "./allImportRules";
import { allJsdocRules } from "./allJsdocRules";
import { allPreferArrowRules } from "./allPreferArrowRules";
import { allPromiseRules } from "./allPromiseRules";
import { getRules } from "./getRules";

const compare = (a: string, b: string) => {
    // Sort rules without prefix before rules with prefix
    const result = (a.includes("/") ? 1 : 0) - (b.includes("/") ? 1 : 0);
    return result === 0 ? a.localeCompare(b) : result;
};

const strip = (id: string) => (id.includes("/") ? id.slice(id.indexOf("/") + 1) : id);

const sort = (rules: Record<string, unknown>) => {
    // This lookup together with the strippedCompare function is designed to group together variants of the same rule,
    // such that it becomes apparent which rules are replaced with what other rules.
    const lookup = new Map<string, string>();

    for (const id of Object.keys(rules).sort(compare)) {
        lookup.set(strip(id), id);
    }

    type Entry = readonly [string, unknown];

    const strippedCompare = ([a]: Entry, [b]: Entry) => compare(lookup.get(strip(a)) ?? "", lookup.get(strip(b)) ?? "");
    return Object.entries(rules).sort(strippedCompare);
};

const getAllConfigsRules = async () => await getRules({
    extends: [
        "eslint:all",
        "plugin:@typescript-eslint/all",
        "plugin:react/all",
        "plugin:@stylistic/disable-legacy",
        "plugin:@stylistic/all-extends",
        "plugin:unicorn/all",
    ],
});

const allOtherRules = { ...allImportRules, ...allJsdocRules, ...allPreferArrowRules, ...allPromiseRules };

const isInAllConfigs = ([id]: [string, unknown]) =>
    id.includes("@typescript-eslint/") || id.includes("@stylistic/") || id.includes("unicorn/") || !id.includes("/");

const hasAllKeys = async (original: Record<string, unknown>, tester: Record<string, unknown>, message: string) => {
    for (const [id, _] of sort(original)) {
        // eslint-disable-next-line no-await-in-loop
        await it(id, () => assert(Boolean(tester[id]), `${id} ${message}`));
    }
};

// eslint-disable-next-line promise/always-return
getAllConfigsRules().then(async (allConfigsRules) => {
    await describe("All rules", async () => {
        await describe("Default severity should be 'off' or 'error', without options", async () => {
            for (const [id, severity] of sort({ ...allConfigsRules, ...allOtherRules })) {
                // eslint-disable-next-line no-await-in-loop
                await it(`"${id}": "${severity}"`, () => assert(severity === "off" || severity === "error"));
            }
        });
    });

    await describe("index.js", async () => {
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

        await describe("should list all non-fixable stylistic rules", async () => {
            for (const id of nonFixableStylisticRuleIds) {
                // eslint-disable-next-line no-await-in-loop
                await it(id, () => {
                    assert(Boolean(ourChanges[id]), `${id} is not in index.js.`);
                    assert(!allConfigsRules[id], `${id} is unexpectedly in the list of extended from rules.`);
                });
            }
        });

        const ourAllConfigsChanges = Object.fromEntries(Object.entries(ourChanges).filter((e) => isInAllConfigs(e)));

        await describe("should change the defaults of rules listed in 'all' configs", async () => {
            for (const [id, ourEntry] of sort(ourAllConfigsChanges)) {
                if (!nonFixableStylisticRuleIds.includes(id)) {
                    // eslint-disable-next-line no-await-in-loop
                    await it(id, () => {
                        // Since ../index.js extends from the all the rules returned by getAllConfigsRules, we need to
                        // test that the rule ids in ourChanges are listed in allRulesInConfig and that we apply
                        // severity/options that are different.
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
        await describe(
            "should list all other rules",
            async () => await hasAllKeys(allOtherRules, ourOtherChanges, "is not in index.js."),
        );

        await describe(
            "should not list unknown rules",
            async () => await hasAllKeys(ourOtherChanges, allOtherRules, "is an unknown rule."),
        );
    });

    await describe("Modified rules", async () => {
        await describe("should activate at most one variant of a given rule", async () => {
            const exceptions = new Set([
                // Same name, but address completely different issues
                "import/no-deprecated",
                "react/no-deprecated",
                "no-lonely-if",
                // Adds to no-lonely-if, see
                // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-lonely-if.md
                "unicorn/no-lonely-if",
                // Same name, but address completely different issues
                "@typescript-eslint/no-namespace",
                "import/no-namespace",
                // Besides some overlap flag different constructs that can be converted to includes()
                "@typescript-eslint/prefer-includes",
                "unicorn/prefer-includes",
                "prefer-spread",
                // Adds to prefer-spread, see
                // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-spread.md
                "unicorn/prefer-spread",
            ]);


            const rulesToTest = Object.fromEntries(
                Object.entries(await getRules()).filter(([i, s]) => s !== "off" && !exceptions.has(i)),
            );

            const lookup = new Map<string, string>();

            for (const [id] of sort(rulesToTest)) {
                const stripped = strip(id);
                const existing = lookup.get(stripped);
                // eslint-disable-next-line no-await-in-loop
                await it(id, () => assert(existing === undefined, `Variant ${existing} is already active.`));
                lookup.set(stripped, id);
            }
        });
    });

// eslint-disable-next-line unicorn/prefer-top-level-await
}).catch((error) => console.error(error));

const getRuleCount = (rules: Record<string, unknown>) => Object.entries(rules).filter(([_, s]) => s !== "off").length;

const showStats = async () => {
    const recommendedCount = getRuleCount(await getRules({
        extends: [
            "eslint:recommended",
            "plugin:@typescript-eslint/recommended",
            "plugin:react/recommended",
        ],
    }));

    console.log(`eslint & @typescript-eslint recommended active rules: ${recommendedCount}`);
    const ourCount = getRuleCount(await getRules());
    console.log(`@andreashuber/eslint-config active rules: ${ourCount}`);
};

// This is a CommonJS module, where top-level await is not available. Compiling tests differently is possible but not
// worth the effort.
// eslint-disable-next-line unicorn/prefer-top-level-await
showStats().catch((error) => console.error(error));
