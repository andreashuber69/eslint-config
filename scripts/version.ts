// https://github.com/andreashuber69/eslint-config/blob/develop/README.md#----andreashuber69eslint-config

import packageJson from "../package.json" with { type: "json" };
import { exec } from "./exec.ts";

const { version } = packageJson;

// The command `npm version` modifies package.json & package-lock.json before calling this script. Since
// `git flow release start` does not work with uncommitted changes, we first need to stash the changes and pop them
// afterwards.
await exec("git stash push");
await exec(`git flow release start v${version}`);
await exec("git stash pop");
