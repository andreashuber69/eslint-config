// https://github.com/andreashuber69/eslint-config/blob/master/README.md#----andreashuber69eslint-config
// eslint-disable-next-line import/no-deprecated
import { builtinRules } from "eslint/use-at-your-own-risk";
import fetch from "node-fetch";

const getAllEslintRules = () => {
    const result: Record<string, unknown> = {};

    // See https://github.com/eslint/eslint/blob/main/conf/eslint-all.js
    // eslint-disable-next-line import/no-deprecated
    for (const ruleId of builtinRules.keys()) {
        result[ruleId] = "error";
    }

    return result;
};

export const allEslintRules = getAllEslintRules();

export const getRecommendedEslintRules = async () => {
    // HACK: It appears that eslint does not currently export the list of recommended rules...
    const recommendedUrl =
        "https://raw.githubusercontent.com/eslint/eslint/main/packages/js/src/configs/eslint-recommended.js";

    // eslint-disable-next-line no-eval
    return ((await eval(await (await fetch(recommendedUrl)).text())) as { rules: Record<string, unknown> }).rules;
};
