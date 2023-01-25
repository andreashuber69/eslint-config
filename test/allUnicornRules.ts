// https://github.com/andreashuber69/eslint-config/blob/master/README.md#----andreashuber69eslint-config
import { configs } from "eslint-plugin-unicorn";
import { getSeverities } from "./getSeverities";

// No type definitions are available for eslint-plugin-unicorn
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
export const allUnicornRules = getSeverities(configs.all.rules);
