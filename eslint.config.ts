// https://github.com/andreashuber69/eslint-config/blob/develop/README.md#----andreashuber69eslint-config

import config from "./src/index.ts";

// eslint-disable-next-line import/no-default-export, import/no-anonymous-default-export
export default [
    ...config,
    {
        ignores: ["coverage/", "dist/"],
    },
];
