// https://github.com/andreashuber69/eslint-config/blob/develop/README.md#----andreashuber69eslint-config

import { exec } from "./exec.js";

await exec("git checkout develop");
await exec("git push");
await exec("git pull");
