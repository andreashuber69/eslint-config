// https://github.com/andreashuber69/eslint-config/blob/master/README.md#----andreashuber69eslint-config
// eslint-disable-next-line import/no-commonjs, import/unambiguous
module.exports = {
    env: {
        node: true,
    },
    extends: ["./index.js"],
    ignorePatterns: ["/coverage/"],
};
