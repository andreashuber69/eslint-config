// https://github.com/andreashuber69/eslint-config/blob/master/README.md#----andreashuber69eslint-config

import { isDeepStrictEqual } from "node:util";

import type { FixupPluginDefinition } from "@eslint/compat";
import { fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import jsdoc from "eslint-plugin-jsdoc";
import promise from "eslint-plugin-promise";
import reactHooks from "eslint-plugin-react-hooks";
import unicorn from "eslint-plugin-unicorn";
import tsEslint from "typescript-eslint";
import { describe, expect, it } from "vitest";


import { allImportRules } from "./allImportRules.ts";
import { allJsdocRules } from "./allJsdocRules.ts";
import { allPromiseRules } from "./allPromiseRules.ts";
import { allReactHooksRules } from "./allReactHooksRules.ts";
import { getRules } from "./getRules.ts";
import { getRuleSeverities } from "./getRuleSeverities.ts";
import ourTypedChanges from "./index.js";

const ourChanges = await getRules(ourTypedChanges);

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

const allConfigsRules = await getRuleSeverities(tsEslint.config(
    js.configs.all,
    // eslint-disable-next-line import/no-named-as-default-member
    tsEslint.configs.all,
    new FlatCompat().extends("plugin:react/all"),
    stylistic.configs["disable-legacy"],
    stylistic.configs["all-flat"],
    unicorn.configs["flat/all"],
    {
        plugins: {
            // @ts-expect-error There's no way we can make the types compatible
            "@stylistic": stylistic,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
            import: fixupPluginRules(importPlugin as FixupPluginDefinition),
            jsdoc,
            promise,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
            "react-hooks": fixupPluginRules(reactHooks as FixupPluginDefinition),
        },
    },
));

const allOtherRules = { ...allImportRules, ...allJsdocRules, ...allPromiseRules, ...allReactHooksRules };

const isInAllConfigs = ([id]: [string, unknown]) =>
    id.includes("@typescript-eslint/") || id.includes("react/") ||
    id.includes("@stylistic/") || id.includes("unicorn/") || !id.includes("/");

const hasAllKeys = (original: Record<string, unknown>, tester: Record<string, unknown>, message: string) => {
    for (const [id, _] of sort(original)) {
        it(id, () => expect(Boolean(tester[id]), `${id} ${message}`));
    }
};

describe("All rules", () => {
    describe("Default severity should be 'off' or 'error', without options", () => {
        for (const [id, severity] of sort({ ...allConfigsRules, ...allOtherRules })) {
            it(`"${id}": "${severity}"`, () => expect(severity === "off" || severity === "error"));
        }
    });
});

describe("index.js", () => {
    // According to https://eslint.style/guide/config-presets#enable-all-available-rules,
    // plugin:@stylistic/all-extends deliberately does not include JSX and non-fixable rules, we therefore need to
    // test these differently.
    const jsxAndNonFixableStylisticRuleIds = [
        "@stylistic/jsx-child-element-spacing",
        "@stylistic/jsx-closing-bracket-location",
        "@stylistic/jsx-closing-tag-location",
        "@stylistic/jsx-curly-brace-presence",
        "@stylistic/jsx-curly-newline",
        "@stylistic/jsx-curly-spacing",
        "@stylistic/jsx-equals-spacing",
        "@stylistic/jsx-first-prop-new-line",
        "@stylistic/jsx-function-call-newline",
        "@stylistic/jsx-indent",
        "@stylistic/jsx-indent-props",
        "@stylistic/jsx-max-props-per-line",
        "@stylistic/jsx-newline",
        "@stylistic/jsx-one-expression-per-line",
        "@stylistic/jsx-pascal-case",
        "@stylistic/jsx-props-no-multi-spaces",
        "@stylistic/jsx-quotes",
        "@stylistic/jsx-self-closing-comp",
        "@stylistic/jsx-sort-props",
        "@stylistic/jsx-tag-spacing",
        "@stylistic/jsx-wrap-multilines",
        "@stylistic/line-comment-position",
        "@stylistic/max-len",
        "@stylistic/max-statements-per-line",
        "@stylistic/no-mixed-operators",
        "@stylistic/no-mixed-spaces-and-tabs",
        "@stylistic/no-tabs",
    ];

    describe("should list all non-fixable stylistic rules", () => {
        for (const id of jsxAndNonFixableStylisticRuleIds) {
            it(id, () => {
                expect(Boolean(ourChanges[id]), `${id} is not in index.js.`);
                expect(!allConfigsRules[id], `${id} is unexpectedly in the list of extended from rules.`);
            });
        }
    });

    const ourAllConfigsChanges = Object.fromEntries(Object.entries(ourChanges).filter((e) => isInAllConfigs(e)));

    describe("should change the defaults of rules listed in 'all' configs", () => {
        for (const [id, ourEntry] of sort(ourAllConfigsChanges)) {
            if (!jsxAndNonFixableStylisticRuleIds.includes(id)) {
                it(id, () => {
                    // Since ../index.js extends from the all the rules returned by getAllConfigsRules, we need to
                    // test that the rule ids in ourChanges are listed in allRulesInConfig and that we apply
                    // severity/options that are different.
                    const entry = allConfigsRules[id];
                    expect(Boolean(entry), `${id} is not in the list of extended from rules.`);
                    expect(!isDeepStrictEqual(ourEntry, entry), `${id} does not change the default.`);
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

describe("Modified rules", () => {
    describe("should activate at most one variant of a given rule", async () => {
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
            Object.entries(await getRuleSeverities()).filter(([i, s]) => s !== "off" && !exceptions.has(i)),
        );

        const lookup = new Map<string, string>();

        for (const [id] of sort(rulesToTest)) {
            const stripped = strip(id);
            const existing = lookup.get(stripped);
            it(id, () => expect(existing === undefined, `Variant ${existing} is already active.`));
            lookup.set(stripped, id);
        }
    });
});

const getRuleCount = (rules: Record<string, unknown>) => Object.entries(rules).filter(([_, s]) => s !== "off").length;

const recommendedCount = getRuleCount(await getRuleSeverities([
    js.configs.recommended,
    // eslint-disable-next-line import/no-named-as-default-member
    ...tsEslint.configs.recommended,
    ...new FlatCompat().extends("plugin:react/recommended"),
    {
        plugins: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
            "react-hooks": fixupPluginRules(reactHooks as FixupPluginDefinition),
        },
    },
]));

console.log(`eslint, @typescript-eslint & eslint-plugin-react recommended active rules: ${recommendedCount}`);
const ourCount = getRuleCount(await getRuleSeverities());
console.log(`@andreashuber/eslint-config active rules: ${ourCount}`);
