// https://github.com/andreashuber69/eslint-config/blob/master/README.md#----andreashuber69eslint-config
import assert from "node:assert";
import { describe, it } from "node:test";
import { isDeepStrictEqual } from "node:util";

import { rules as ourChanges } from "../index";

import { allImportRules } from "./allImportRules";
import { allJsdocRules } from "./allJsdocRules";
import { allPreferArrowRules } from "./allPreferArrowRules";
import { allPromiseRules } from "./allPromiseRules";
import { allUnicornRules } from "./allUnicornRules";
import { allEslintRules, getRecommendedEslintRules } from "./eslintRules";
import { allTypescriptEslintRules, recommendedTypescriptEslintRules } from "./typescriptEslintRules";

const allRulesInConfig = { ...allEslintRules, ...allTypescriptEslintRules, ...allUnicornRules };
const allOtherRules = { ...allImportRules, ...allJsdocRules, ...allPreferArrowRules, ...allPromiseRules };
const allRules = { ...allRulesInConfig, ...allOtherRules };

const shouldRuleBeInConfig = ([id]: [string, ...unknown[]]) =>
    id.includes("@typescript-eslint/") || id.includes("unicorn/") || !id.includes("/");

const hasAllKeys = async (original: Record<string, unknown>, tester: Record<string, unknown>, message: string) => {
    for (const id of Object.keys(original)) {
        // eslint-disable-next-line no-await-in-loop
        await it(id, () => assert(Boolean(tester[id]), `${id} ${message}`));
    }
};

describe("all", async () => {
    await describe("index.js", async () => {
        await describe("should change the defaults of rules listed in 'all' configs", async () => {
            const ourRuleInConfigChanges = Object.entries(ourChanges).filter((e) => shouldRuleBeInConfig(e));

            // Since ../index.js extends from the "eslint:all", "plugin:@typescript-eslint/all" and "plugin:unicorn/all"
            // configs, we need to test that the rule ids in ourChanges are listed in allRulesInConfig and that we apply
            // severity/options that are different.
            for (const [id, ourEntry] of ourRuleInConfigChanges) {
                // eslint-disable-next-line no-await-in-loop
                await it(id, () => {
                    const entry = allRulesInConfig[id];
                    assert(Boolean(entry), `${id} is not in the list of extended from rules.`);
                    assert(!isDeepStrictEqual(ourEntry, entry), `${id} does not change the default.`);
                });
            }
        });

        const ourOtherChanges = Object.fromEntries(Object.entries(ourChanges).filter((e) => !shouldRuleBeInConfig(e)));

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

    await describe(`${Object.keys(allRules).length} rules`, async () => {
        await it("Default severity should be 'off' or 'error', without options", () => {
            assert(Object.values(allRules).filter((v) => v !== "off" && v !== "error").length === 0);
        });
    });
// This is a CommonJS module, where top-level await is not available. Compiling tests differently is possible but not
// worth the effort.
// eslint-disable-next-line unicorn/prefer-top-level-await
}).catch((error) => console.error(error));


const getActiveCount = (rules: Record<string, unknown>) => Object.values(rules).filter((v) => v !== "off").length;

const showStats = async () => {
    const recommendedCount = getActiveCount({
        ...await getRecommendedEslintRules(),
        ...recommendedTypescriptEslintRules,
    });

    console.log(`eslint & @typescript-eslint recommended active rules: ${recommendedCount}`);
    const ourCount = getActiveCount({ ...allRules, ...ourChanges });
    console.log(`@andreashuber/eslint-config active rules: ${ourCount}`);
};

// This is a CommonJS module, where top-level await is not available. Compiling tests differently is possible but not
// worth the effort.
// eslint-disable-next-line unicorn/prefer-top-level-await
showStats().catch((error) => console.error(error));
