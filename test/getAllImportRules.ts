import { rules } from "eslint-plugin-import";
import { getSeverities } from "./getSeverities";

// No type definitions are available for eslint-plugin-import
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export const getAllImportRules = () => getSeverities(rules, "import");
