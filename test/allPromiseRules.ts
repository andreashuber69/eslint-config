// https://github.com/andreashuber69/eslint-config/blob/master/README.md#----andreashuber69eslint-config
import { rules } from "eslint-plugin-promise";
import { getSeverities } from "./getSeverities";

// No type definitions are available for eslint-plugin-promise
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export const allPromiseRules = getSeverities(rules, "promise");
