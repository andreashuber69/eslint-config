// https://github.com/andreashuber69/eslint-config/blob/master/README.md#----andreashuber69eslint-config

import { getRules } from "./getRules.ts";
import { getSeverities } from "./getSeverities.ts";

export const getRuleSeverities = async (config?: unknown[]) => getSeverities(await getRules(config));
