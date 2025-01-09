// https://github.com/andreashuber69/eslint-config/blob/develop/README.md#----andreashuber69eslint-config

import generalConfig from "./src/index.ts";

const config = [
    ...generalConfig,
    {
        ignores: ["coverage/", "dist/"],
    },
];

// eslint-disable-next-line import/no-default-export
export default config;
