// https://github.com/andreashuber69/eslint-config/blob/master/README.md#----andreashuber69eslint-config
import { rules } from "eslint-plugin-jsdoc";
import { getSeverities } from "./getSeverities";

export const allJsdocRules = getSeverities(rules, "jsdoc");
