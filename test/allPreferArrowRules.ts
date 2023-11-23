// https://github.com/andreashuber69/eslint-config/blob/master/README.md#----andreashuber69eslint-config
import { rules } from "eslint-plugin-prefer-arrow";
import { getSeverities } from "./getSeverities";

export const allPreferArrowRules = getSeverities(rules, "prefer-arrow");
