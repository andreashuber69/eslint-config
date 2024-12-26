// https://github.com/andreashuber69/eslint-config/blob/develop/README.md#----andreashuber69eslint-config

import packageJson from "../package.json" with { type: "json" };
import { exec } from "./exec.js";

const { version } = packageJson;

await exec(`git commit -a -m "chore: start release v${version}"`);
