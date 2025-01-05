// https://github.com/andreashuber69/eslint-config/blob/develop/README.md#----andreashuber69eslint-config

import generalConfig from "./src/index.js";

const config = [
    ...generalConfig,
    {
        files: ["**/*.ts"],
    },
    {
        ignores: ["coverage/", "dist/"],
    },
];

// eslint-disable-next-line import/no-default-export
export default config;
