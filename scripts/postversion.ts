// https://github.com/andreashuber69/eslint-config/blob/develop/README.md#----andreashuber69eslint-config

import packageJson from "../package.json" with { type: "json" };
import { exec } from "./exec.js";

const { version } = packageJson;

// NOTE: For this script to work, either the option --no-git-tag-version needs to be added to the npm version command or
// the npm configuration needs to be modified as follows: npm config set git-tag-version=false
await exec(`git commit -a -m "chore: start release v${version}"`);
