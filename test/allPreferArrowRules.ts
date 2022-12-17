import { rules } from "eslint-plugin-prefer-arrow";
import { getSeverities } from "./getSeverities";

// No type definitions are available for eslint-plugin-jsdoc
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export const allPreferArrowRules = getSeverities(rules, "prefer-arrow");
