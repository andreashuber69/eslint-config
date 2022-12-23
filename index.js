// https://github.com/andreashuber69/eslint-config
/* eslint-disable @typescript-eslint/naming-convention, import/unambiguous, import/no-commonjs, max-len */
const allExtensions = [
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
];

module.exports = {
    env: {
        node: true,
        es2022: true,
    },
    extends: [
        // While the eslint:all list really does turn on *all* eslint rules (except for the deprecated ones), the
        // @typescript-eslint/all list turns off those eslint rules that are replaced with typescript-aware variants
        // and also turns off the eslint rules that are already flagged by the typescript compiler. In other words,
        // by extending from the lists below, we have all rules turned on, that *might* make sense in a typescript
        // project. We thus "only" need to turn off the rules that we don't like and reconfigure some others.
        "eslint:all",
        "plugin:@typescript-eslint/all",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: ["./tsconfig.json"],
    },
    plugins: [
        "@typescript-eslint",
        // The plugins below don't seem to offer "all" lists, so we need to turn on the associated rules explicitly.
        "import",
        "jsdoc",
        "no-null",
        "prefer-arrow",
        "promise",
    ],
    root: true,
    rules: {
        "array-element-newline": [
            "error",
            "consistent",
        ],
        "@typescript-eslint/array-type": [
            "error",
            {
                default: "array-simple",
            },
        ],
        "@typescript-eslint/brace-style": [
            "error",
            "1tbs",
            {
                allowSingleLine: true,
            },
        ],
        // Turned off in favor of @typescript-eslint/naming-convention
        "camelcase": "off",
        "capitalized-comments": [
            "error",
            "always",
            {
                ignoreConsecutiveComments: true,
                ignoreInlineComments: true,
                ignorePattern: "cSpell|codebeat",
            },
        ],
        // We want to use the most appropriate style for each property.
        "@typescript-eslint/class-literal-property-style": "off",
        "@typescript-eslint/comma-dangle": [
            "error",
            "always-multiline",
        ],
        "@typescript-eslint/consistent-type-assertions": [
            "error",
            {
                assertionStyle: "as",
                objectLiteralTypeAssertions: "never",
            },
        ],
        "@typescript-eslint/consistent-type-definitions": "off", // We want to use both interfaces and types.
        "eqeqeq": [
            "error",
            "always",
        ],
        "@typescript-eslint/dot-notation": [
            "error",
            {
                allowIndexSignaturePropertyAccess: true,
            },
        ],
        // Leads to a lot of duplication without clear advantages. If types are necessary for documentation purposes,
        // @typescript-eslint/explicit-module-boundary-types would be preferable.
        "@typescript-eslint/explicit-function-return-type": "off",
        // Could make sense for larger projects with multiple developers, seems overkill for small projects.
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "function-call-argument-newline": [
            "error",
            "consistent",
        ],
        "function-paren-newline": [
            "error",
            "multiline-arguments",
        ],
        "id-length": "off", // Seems too restrictive, sometimes one character is enough (e.g. for inline arrows).
        // For short arrows "beside" is best. For longer ones "below" makes more sense.
        "implicit-arrow-linebreak": "off",
        "import/default": "off", // Already covered by typescript.
        "import/dynamic-import-chunkname": "error",
        "import/export": "off", // Already covered by typescript.
        "import/exports-last": "error",
        "import/extensions": "off", // Already covered by typescript.
        "import/first": "error",
        // There are advantages and disadvantages to turning this on or off. "off" seems the better choice.
        "import/group-exports": "off",
        "import/imports-first": "off", // Deprecated in favor of import/first
        "import/max-dependencies": [
            "error",
            {
                max: 30,
            },
        ],
        "import/named": "off", // Already covered by typescript.
        "import/namespace": "off", // Already covered by typescript.
        "import/newline-after-import": "error",
        "import/no-absolute-path": "error",
        "import/no-amd": "error",
        "import/no-anonymous-default-export": [
            "error",
            {
                allowArray: false,
                allowArrowFunction: false,
                allowAnonymousClass: false,
                allowAnonymousFunction: false,
                allowCallExpression: false,
                allowLiteral: false,
                allowObject: false,
            },
        ],
        "import/no-commonjs": "error",
        "import/no-cycle": "error",
        "import/no-default-export": "error",
        "import/no-deprecated": "error",
        "import/no-duplicates": "error",
        "import/no-dynamic-require": "error",
        "import/no-extraneous-dependencies": "error",
        "import/no-import-module-exports": "error",
        "import/no-internal-modules": "off", // Seems too restrictive.
        "import/no-mutable-exports": "error",
        "import/no-named-as-default-member": "error",
        "import/no-named-as-default": "error",
        "import/no-named-default": "error",
        "import/no-named-export": "off", // Does not make sense.
        "import/no-namespace": "error",
        "import/no-nodejs-modules": "off",
        "import/no-relative-packages": "error",
        "import/no-relative-parent-imports": "off", // Seems too restrictive.
        "import/no-restricted-paths": "off", // Seems too restrictive.
        "import/no-self-import": "error",
        "import/no-unassigned-import": "error",
        "import/no-unresolved": "off", // Already covered by typescript.
        "import/no-unused-modules": "error",
        "import/no-useless-path-segments": "error",
        "import/no-webpack-loader-syntax": "error",
        "import/order": [
            "error",
            {
                alphabetize: {
                    order: "asc",
                    caseInsensitive: true,
                },
            },
        ],
        "import/prefer-default-export": "off", // Does not make much sense.
        "import/unambiguous": "error",
        // Would make sense if var declarations were allowed (to avoid different behavior in and outside of a loop).
        // Since var declarations are not allowed, we can safely turn this off.
        "@typescript-eslint/init-declarations": "off",
        "@typescript-eslint/indent": [
            "error",
            4,
            {
                SwitchCase: 1,
            },
        ],
        "jsdoc/check-access": "warn",
        "jsdoc/check-alignment": "warn",
        "jsdoc/check-examples": "off", // Currently turned off due to https://github.com/eslint/eslint/issues/14745.
        "jsdoc/check-indentation": "warn",
        "jsdoc/check-line-alignment": "warn",
        "jsdoc/check-param-names": "warn",
        "jsdoc/check-property-names": "warn",
        "jsdoc/check-syntax": "warn",
        "jsdoc/check-tag-names": [
            "warn",
            {
                definedTags: [
                    "internal",
                    "maximum",
                    "minimum",
                    "multipleOf",
                ],
            },
        ],
        "jsdoc/check-types": "warn",
        "jsdoc/check-values": "warn",
        "jsdoc/empty-tags": "warn",
        "jsdoc/implements-on-classes": "warn",
        "jsdoc/match-description": "warn",
        // Does not appear to deliver a lot of value and would require project-specific configuration.
        "jsdoc/match-name": "off",
        "jsdoc/multiline-blocks": "warn",
        // In modern editors the newline just wastes space without adding anything to readability.
        "jsdoc/newline-after-description": [
            "warn",
            "never",
        ],
        "jsdoc/no-bad-blocks": "warn",
        "jsdoc/no-defaults": "warn",
        // Exactly what syntax a jsdoc block needs to contain must be the decision of the developer.
        "jsdoc/no-missing-syntax": "off",
        "jsdoc/no-multi-asterisks": "warn",
        // Exactly what syntax a jsdoc block needs to contain must be the decision of the developer.
        "jsdoc/no-restricted-syntax": "off",
        "jsdoc/no-types": "warn",
        "jsdoc/no-undefined-types": "warn",
        "jsdoc/require-asterisk-prefix": "warn",
        "jsdoc/require-description-complete-sentence": "warn",
        "jsdoc/require-description": "warn",
        "jsdoc/require-example": "off",
        "jsdoc/require-file-overview": "off",
        // Hyphens make some sense to separate the type/name combo of a parameter from the description. In TS however,
        // duplicating in jsdoc the type already mentioned in the code does not make sense, which is why it's best to
        // never use hyphens.
        "jsdoc/require-hyphen-before-param-description": [
            "warn",
            "never",
            {
                tags: {
                    "*": "never",
                },
            },
        ],
        // For what code elements docs are necessary must be the decision of the developer. Forcing docs leads to lots
        // of "standard" phrases without any real value.
        "jsdoc/require-jsdoc": "off",
        "jsdoc/require-param-description": "warn",
        "jsdoc/require-param-name": "warn",
        "jsdoc/require-param-type": "off",
        "jsdoc/require-param": "warn",
        "jsdoc/require-property": "off",
        "jsdoc/require-property-description": "warn",
        "jsdoc/require-property-name": "warn",
        "jsdoc/require-property-type": "off",
        "jsdoc/require-returns-check": "warn",
        "jsdoc/require-returns-description": "warn",
        "jsdoc/require-returns-type": "warn",
        "jsdoc/require-returns": "off",
        "jsdoc/require-throws": "off",
        "jsdoc/require-yields": "off",
        "jsdoc/require-yields-check": "warn",
        "jsdoc/sort-tags": "warn",
        "jsdoc/tag-lines": "warn",
        "jsdoc/text-escaping": "off", // Requires project-specific configuration
        "jsdoc/valid-types": "warn",
        "line-comment-position": "off", // We want to allow comments above and beside code.
        // Does not work with interfaces, see https://github.com/typescript-eslint/typescript-eslint/issues/1150
        "lines-around-comment": "off",
        "@typescript-eslint/lines-between-class-members": [
            "error",
            "always",
            {
                exceptAfterSingleLine: true,
            },
        ],
        "max-len": [
            "error",
            {
                code: 120,
            },
        ],
        "max-lines": [
            "error",
            1000,
        ],
        "max-lines-per-function": "off", // Does not make much sense for describe-style tests.
        "max-params": "off",
        "max-statements": "off", // Does not make much sense for describe-style tests.
        "@typescript-eslint/member-ordering": [
            "error",
            {
                default: [
                    "signature",

                    "public-static-field",
                    "public-static-method",
                    "public-field",
                    "public-constructor",
                    "public-method",

                    "protected-static-field",
                    "protected-static-method",
                    "protected-field",
                    "protected-constructor",
                    "protected-method",

                    "private-static-field",
                    "private-static-method",
                    "private-field",
                    "private-constructor",
                    "private-method",
                ],
            },
        ],
        "multiline-comment-style": [
            "error",
            "separate-lines",
        ],
        "multiline-ternary": [
            "error",
            "always-multiline",
        ],
        "@typescript-eslint/naming-convention": [
            "error",
            {
                selector: "default",
                format: ["strictCamelCase"],
                leadingUnderscore: "forbid",
                trailingUnderscore: "forbid",
            },
            {
                selector: [
                    "typeLike",
                    "enumMember",
                ],
                format: ["StrictPascalCase"],
                leadingUnderscore: "forbid",
                trailingUnderscore: "forbid",
            },
        ],
        // Typescript ensures that constructor functions are only called with new, so the convention is not necessary.
        "new-cap": "off",
        "newline-per-chained-call": "off", // This rule seems too restrictive.
        // This isn't particularly helpful. For example, the runtime type implementing the Error interface will almost
        // always have a meaningful implementation for toString(), yet calls to toString() on that interface are all
        // flagged with this error.
        "@typescript-eslint/no-base-to-string": "off",
        // Typescript already catches many of the bugs that this rule would because bitwise operators are not allowed
        // for booleans.
        "no-bitwise": "off",
        "@typescript-eslint/no-confusing-void-expression": [
            "error",
            {
                ignoreArrowShorthand: true,
                ignoreVoidOperator: true,
            },
        ],
        "no-console": "off", // Does not make sense for my projects
        "@typescript-eslint/no-empty-function": [
            "error",
            {
                allow: [
                    "private-constructors",
                    "protected-constructors",
                    "decoratedFunctions",
                    "overrideMethods",
                ],
            },
        ],
        "@typescript-eslint/no-extra-parens": "off", // Turned off in favor of no-mixed-operators.
        "@typescript-eslint/no-extraneous-class": [
            "error",
            {
                allowStaticOnly: true,
            },
        ],
        "no-inline-comments": "off", // We want to allow inline comments.
        "@typescript-eslint/no-magic-numbers": "off", // Makes sense but appears to be too restrictive.
        "no-null/no-null": "error",
        // Most of the problems with the ++ and -- operators are avoided because we've turned on
        // @typescript-eslint/semi.
        "no-plusplus": "off",
        // The following would make promise construction much more verbose for avoiding a bug that is easily detected.
        "no-promise-executor-return": "off",
        "@typescript-eslint/no-restricted-imports": "off", // Requires project-specific configuration
        "no-restricted-syntax": [
            "error",
            "ForInStatement",
        ],
        "@typescript-eslint/no-shadow": [
            "error",
            {
                hoist: "all",
            },
        ],
        "no-ternary": "off",
        "@typescript-eslint/no-type-alias": "off", // Does not make much sense.
        // Does not make sense for js code >= ES5 with no-global-assign and no-shadow-restricted-names turned on.
        "no-undefined": "off",
        "@typescript-eslint/no-unnecessary-condition": "off", // Flags expressions like `... || "Error"`.
        "@typescript-eslint/no-unused-expressions": [
            "error",
            {
                allowShortCircuit: true,
                allowTernary: true,
            },
        ],
        "@typescript-eslint/no-use-before-define": [
            "error",
            {
                functions: false,
                typedefs: false,
                enums: false,
            },
        ],
        // We use void to avoid @typescript-eslint/no-confusing-void-expression
        "no-void": "off",
        "no-warning-comments": "warn",
        "@typescript-eslint/object-curly-spacing": [
            "error",
            "always",
        ],
        "object-property-newline": [
            "error",
            {
                allowAllPropertiesOnSameLine: true,
            },
        ],
        "one-var": "off", // Does not seem to work with const and let?
        "operator-linebreak": [
            "error",
            "after",
        ],
        "padded-blocks": [
            "error",
            "never",
        ],
        "@typescript-eslint/padding-line-between-statements": [
            "error",
            {
                blankLine: "always",
                prev: "*",
                next: [
                    "class",
                    "interface",
                    "multiline-block-like",
                    "return",
                    "type",
                ],
            },
            {
                blankLine: "always",
                prev: [
                    "class",
                    "interface",
                    "multiline-block-like",
                    "return",
                    "type",
                ],
                next: "*",
            },
        ],
        "@typescript-eslint/parameter-properties": [
            "error",
            {
                prefer: "parameter-property",
            },
        ],
        "@typescript-eslint/prefer-enum-initializers": "off", // Implicitly defined values should be common knowledge
        "prefer-arrow/prefer-arrow-functions": [
            "error",
            {
                disallowPrototype: true,
                singleReturnOnly: false,
                classPropertiesAllowed: false,
            },
        ],
        // Unrealistic to enforce this in just about any codebase without lots of exceptions
        "@typescript-eslint/prefer-readonly-parameter-types": "off",
        "promise/always-return": "error",
        // Promises aren't that hard to create manually, so it seems dubious to require promisify or pify
        "promise/avoid-new": "off",
        "promise/catch-or-return": "error",
        "promise/no-callback-in-promise": "error",
        "promise/no-multiple-resolved": "error",
        "promise/no-native": "off", // Does not make sense in modern ES environments
        "promise/no-new-statics": "error",
        "promise/no-nesting": "error",
        "promise/no-promise-in-callback": "error",
        "promise/no-return-in-finally": "error",
        "promise/no-return-wrap": "error",
        "promise/param-names": "error",
        // Seems too restrictive, a callback is perfectly acceptable if there's no need to wait for completion (e.g. in
        // describe-style tests)
        "promise/prefer-await-to-callbacks": "off",
        "promise/prefer-await-to-then": "error",
        "promise/valid-params": "error",
        "quote-props": [
            "error",
            "consistent-as-needed",
        ],
        "@typescript-eslint/restrict-template-expressions": "off", // The advantages are unclear.
        "@typescript-eslint/return-await": [
            "error",
            "always",
        ],
        "sort-imports": [
            "error",
            {
                ignoreCase: true,
                ignoreDeclarationSort: true,
            },
        ],
        "sort-keys": "off",
        "@typescript-eslint/space-before-function-paren": [
            "error",
            {
                anonymous: "never",
                named: "never",
                asyncArrow: "always",
            },
        ],
        "space-in-parens": [
            "error",
            "never",
        ],
        "spaced-comment": [
            "error",
            "always",
            {
                exceptions: ["/"],
            },
        ],
        "@typescript-eslint/strict-boolean-expressions": "off", // Takes away too much expressive power.
        // Value is questionable, see
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/typedef.md
        "@typescript-eslint/typedef": "off",
    },
    settings: {
        // The following settings are taken from https://github.com/import-js/eslint-plugin-import#typescript and
        // https://github.com/import-js/eslint-plugin-import/blob/main/config/typescript.js
        "import/extensions": allExtensions,
        "import/external-module-folders": [
            "node_modules",
            "node_modules/@types",
        ],
        "import/parsers": {
            "@typescript-eslint/parser": [
                ".ts",
                ".tsx",
            ],
        },
        "import/resolver": {
            node: {
                extensions: allExtensions,
            },
            typescript: {
                alwaysTryTypes: true,
                // The default "project" config should work just fine in most cases. If not, the project using this
                // config must override accordingly.
            },
        },
    },
};
