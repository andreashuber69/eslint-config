import { rules } from "eslint-plugin-no-null";
import { getSeverities } from "./getSeverities";

// No type definitions are available for eslint-plugin-jsdoc
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export const allNonullRules = getSeverities(rules, "no-null");
