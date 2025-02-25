// https://github.com/andreashuber69/eslint-config/blob/master/README.md#----andreashuber69eslint-config

import { rules } from "eslint-plugin-import";
import { getSeverities } from "./getSeverities.ts";

export const allImportRules = getSeverities(rules, "import");
