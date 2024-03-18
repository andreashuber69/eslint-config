// https://github.com/andreashuber69/eslint-config/blob/master/README.md#----andreashuber69eslint-config
/* eslint-disable @typescript-eslint/naming-convention, import/unambiguous, import/no-commonjs */
const allExtensions = [
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
];

module.exports = {
    extends: [
        // While the eslint:all list really does turn on *all* eslint rules (except for the deprecated ones), the
        // @typescript-eslint/all and unicorn/all lists turn off those eslint rules that are replaced with
        // typescript-aware or more functional variants and also turn off the eslint rules that are already flagged
        // by the typescript compiler. In other words, by extending from the lists below, we have all rules turned on,
        // that *might* make sense in a typescript project. We thus "only" need to turn off the rules that we don't like
        // and reconfigure some others.
        "eslint:all",
        "plugin:@typescript-eslint/all",
        "plugin:react/all",
        "plugin:@stylistic/disable-legacy",
        "plugin:@stylistic/all-extends",
        "plugin:unicorn/all",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: true,
    },
    plugins: [
        "@typescript-eslint",
        "@stylistic",
        "unicorn",
        // The plugins below don't seem to offer "all" lists, so we need to turn on the associated rules explicitly.
        // Note that we also list the turned off rules below, so that we can test that we did not miss a newly added
        // rule.
        "import",
        "jsdoc",
        "prefer-arrow",
        "promise",
    ],
    root: true,
    rules: {
        // Turned off in favor of @typescript-eslint/naming-convention.
        camelcase: "off",
        "capitalized-comments": [
            "error",
            "always",
            {
                ignoreConsecutiveComments: true,
                ignoreInlineComments: true,
                ignorePattern: "cSpell",
            },
        ],
        eqeqeq: [
            "error",
            "always",
        ],
        // The rule prefer-arrow/prefer-arrow-functions generally disallows function expressions. However, since arrow
        // functions cannot contain yield keywords, function expressions are still needed. This rule ensures that such
        // expressions are only named as needed (to avoid duplication).
        "func-names": [
            "error",
            "as-needed",
        ],
        "id-length": "off", // Seems too restrictive, sometimes one character is enough (e.g. for inline arrows).
        "line-comment-position": "off", // We want to allow comments above and beside code.
        // Sometimes it makes more sense to use a couple of tiny classes instead of interfaces to describe some data
        // structure. Since this rule only affects classes and cannot be extended to other types, it's best to turn this
        // off and trust the developer to not overdo it.
        "max-classes-per-file": "off",
        "max-lines": [
            "error",
            1000,
        ],
        "max-lines-per-function": "off", // Does not make much sense for describe-style tests.
        "max-statements": "off", // Does not make much sense for describe-style tests.
        "multiline-comment-style": [
            "error",
            "separate-lines",
        ],
        // TypeScript ensures that constructor functions are only called with new, so the convention is not necessary.
        "new-cap": "off",
        // TypeScript already catches many of the bugs that this rule would because bitwise operators are not allowed
        // for booleans.
        "no-bitwise": "off",
        "no-console": "off", // Does not make sense for most projects.
        // Does not make sense for typescript. Importing types *and* other stuff from the same module is best achieved
        // with two import statements (one imports types only and the other everything else), which is enforced with
        // import/no-duplicates and the import/consistent-type-specifier-style rules. The rule
        // @typescript-eslint/no-import-type-side-effects is turned on by default, see there for more information.
        "no-duplicate-imports": "off",
        "no-inline-comments": "off", // We want to allow inline comments.
        // Most of the problems with the ++ and -- operators are avoided because @stylistic/semi is turned on
        "no-plusplus": "off",
        // The following would make promise construction much more verbose for avoiding a bug that is easily detected.
        "no-promise-executor-return": "off",
        "no-restricted-syntax": [
            "error",
            "ForInStatement",
        ],
        "no-ternary": "off",
        // Does not make sense for js code >= ES5 with no-global-assign and no-shadow-restricted-names turned on.
        "no-undefined": "off",
        // We use void to avoid @typescript-eslint/no-confusing-void-expression.
        "no-void": "off",
        "no-warning-comments": "warn",
        "one-var": "off", // Does not seem to work with const and let?
        "sort-imports": [
            "error",
            {
                ignoreCase: true,
                ignoreDeclarationSort: true,
            },
        ],
        "sort-keys": "off",
        "@typescript-eslint/array-type": [
            "error",
            {
                default: "array-simple",
            },
        ],
        // We want to use the most appropriate style for each property.
        "@typescript-eslint/class-literal-property-style": "off",
        // Overrides of abstract methods occasionally don't reference this, for legitimate reasons. The rule would have
        // to be selectively disabled for every instance. Of course, turning this off means that instance methods that
        // could be made static are no longer flagged, but these are relatively minor (and easily detectable &
        // correctable) warts compared to having to litter code with more eslint-disable comments.
        "@typescript-eslint/class-methods-use-this": "off",
        "@typescript-eslint/consistent-type-assertions": [
            "error",
            {
                assertionStyle: "as",
                objectLiteralTypeAssertions: "never",
            },
        ],
        "@typescript-eslint/consistent-type-definitions": "off", // We want to use both interfaces and types.
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
        // Would make sense if var declarations were allowed (to avoid different behavior in and outside of a loop).
        // Since var declarations are not allowed, we can safely turn this off.
        "@typescript-eslint/init-declarations": "off",
        "@typescript-eslint/max-params": [
            "error",
            {
                // This is probably too high for production code, but for tests it is sometimes quite handy...
                max: 5,
            },
        ],
        "@typescript-eslint/member-ordering": [
            "error",
            {
                // The aim of the ordering below is to allow humans reading the source code to get the required
                // information as quickly as possible for the task at hand. Towards that end, the most important
                // information should be near the top of the file. The further down one gets in the file the fewer
                // people will be interested in the information that can be found there.
                // Clearly, for just about any task, the public interface of a type will be most important. After that,
                // some developers would want to understand the protected interface. Finally, only developers
                // maintaining the code will be interested in the implementation details hidden in the private members.
                // This is why all members are strictly stratified from highest to lowest accessibility.
                // In a similar fashion, within a given accessibility block, members required for simple use cases
                // should be listed before members for more complex ones. Members that do not require reasoning about
                // object state (static members and constructors) are listed first followed by instance members.
                // Moreover, a property (not matter whether implemented as a field or get/set methods) tends to be used
                // more often than (possibly state-altering) methods.
                // Finally, the order of members should be relatively stable and typically not change when the
                // implementation changes. For example, whether a property is implemented with a field or get/set
                // methods is an implementation detail, which is why fields and get/set methods can be mixed.
                default: [
                    "signature",

                    ["public-static-field", "public-static-get", "public-static-set"],
                    "public-static-method",
                    "public-constructor",
                    ["public-instance-field", "public-instance-get", "public-instance-set"],
                    "public-instance-method",

                    ["protected-static-field", "protected-static-get", "protected-static-set"],
                    "protected-static-method",
                    "protected-constructor",
                    ["protected-instance-field", "protected-instance-get", "protected-instance-set"],
                    "protected-instance-method",

                    "static-initialization",
                    ["private-static-field", "private-static-get", "private-static-set"],
                    ["#private-static-field", "#private-static-get", "#private-static-set"],
                    "private-static-method",
                    "#private-static-method",
                    "private-constructor",
                    ["private-instance-field", "private-instance-get", "private-instance-set"],
                    ["#private-instance-field", "#private-instance-get", "#private-instance-set"],
                    "private-instance-method",
                    "#private-instance-method",
                ],
            },
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
                selector: ["import"],
                format: [
                    "StrictPascalCase",
                    "strictCamelCase",
                ],
                leadingUnderscore: "forbid",
                trailingUnderscore: "forbid",
            },
            {
                selector: [
                    "parameter",
                    "variable",
                ],
                format: ["strictCamelCase"],
                modifiers: ["unused"],
                leadingUnderscore: "require",
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
            {
                selector: [
                    "interface",
                    "typeAlias",
                ],
                // Types that function as interfaces are now allowed to have the popular I prefix. Unfortunately, this
                // also allows for consecutive capitals in other places, e.g. interface ITargetID. Currently,
                // naming-convention options do not seem to allow for optional prefixes and a prefix must be at least
                // one character in length.
                format: ["PascalCase"],
                leadingUnderscore: "forbid",
                trailingUnderscore: "forbid",
            },
        ],
        // This isn't particularly helpful. For example, the runtime type implementing the Error interface will almost
        // always have a meaningful implementation for toString(), yet calls to toString() on that interface are all
        // flagged with this error.
        "@typescript-eslint/no-base-to-string": "off",
        "@typescript-eslint/no-confusing-void-expression": [
            "error",
            {
                ignoreArrowShorthand: true,
                ignoreVoidOperator: true,
            },
        ],
        "@typescript-eslint/no-empty-function": [
            "error",
            {
                allow: [
                    "private-constructors",
                    "protected-constructors",
                    "overrideMethods",
                ],
            },
        ],
        "@typescript-eslint/no-extraneous-class": [
            "error",
            {
                allowStaticOnly: true,
            },
        ],
        "@typescript-eslint/no-magic-numbers": "off", // Makes sense but appears to be too restrictive.
        "@typescript-eslint/no-restricted-imports": "off", // Requires project-specific configuration.
        "@typescript-eslint/no-shadow": [
            "error",
            {
                hoist: "all",
            },
        ],
        "@typescript-eslint/no-unnecessary-condition": "off", // Flags expressions like `... || "Error"`.
        "@typescript-eslint/no-unused-expressions": [
            "error",
            {
                allowShortCircuit: true,
                allowTernary: true,
            },
        ],
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
                caughtErrorsIgnorePattern: "^_",
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
        "@typescript-eslint/parameter-properties": [
            "error",
            {
                prefer: "parameter-property",
            },
        ],
        "@typescript-eslint/prefer-enum-initializers": "off", // Implicitly defined values should be common knowledge.
        // Unrealistic to enforce this in just about any codebase without lots of exceptions.
        "@typescript-eslint/prefer-readonly-parameter-types": "off",
        "@typescript-eslint/restrict-template-expressions": "off", // The advantages are unclear.
        "@typescript-eslint/return-await": [
            "error",
            "always",
        ],
        "@typescript-eslint/strict-boolean-expressions": "off", // Takes away too much expressive power.
        // Value is questionable, see
        // https://typescript-eslint.io/rules/typedef/.
        "@typescript-eslint/typedef": "off",
        "@stylistic/array-element-newline": [
            "error",
            "consistent",
        ],
        "@stylistic/brace-style": [
            "error",
            "1tbs",
            {
                allowSingleLine: true,
            },
        ],
        "@stylistic/comma-dangle": [
            "error",
            "always-multiline",
        ],
        "@stylistic/function-call-argument-newline": [
            "error",
            "consistent",
        ],
        "@stylistic/function-paren-newline": [
            "error",
            "multiline-arguments",
        ],
        // For short arrows "beside" is best. For longer ones "below" makes more sense.
        "@stylistic/implicit-arrow-linebreak": "off",
        "@stylistic/indent": [
            "error",
            4,
            {
                SwitchCase: 1,
                ignoredNodes: [
                    // The indent rule is broken, see https://github.com/eslint-stylistic/eslint-stylistic/issues/126.
                    // The following ignored nodes aim to disable the indent rule where it is broken most obviously,
                    // thus allowing the developer to format these code parts as (s)he sees fit.
                    "FunctionExpression[params]:has(Identifier[decorators])",
                    "PropertyDefinition[decorators]",
                    "TSIntersectionType",
                    "TSTypeParameterInstantiation",
                    "TSUnionType",
                ],
            },
        ],
        "@stylistic/indent-binary-ops": [
            "error",
            4,
        ],
        "@stylistic/lines-around-comment": [
            "error",
            {
                allowArrayStart: true,
                allowBlockStart: true,
                allowEnumStart: true,
                allowInterfaceStart: true,
                allowModuleStart: true,
                allowObjectStart: true,
                allowTypeStart: true,
            },
        ],
        "@stylistic/lines-between-class-members": [
            "error",
            "always",
            {
                exceptAfterSingleLine: true,
            },
        ],
        "@stylistic/max-len": [
            "error",
            {
                code: 120,
            },
        ],
        // Not in plugin:@stylistic/all-extends, see https://eslint.style/guide/config-presets#enable-all-avaible-rules
        "@stylistic/max-statements-per-line": "error",
        "@stylistic/multiline-ternary": [
            "error",
            "always-multiline",
        ],
        "@stylistic/newline-per-chained-call": "off", // This rule seems too restrictive.
        "@stylistic/no-extra-parens": "off", // Turned off in favor of no-mixed-operators.
        // Not in plugin:@stylistic/all-extends, see https://eslint.style/guide/config-presets#enable-all-avaible-rules
        "@stylistic/no-mixed-operators": "error",
        // Not in plugin:@stylistic/all-extends, see https://eslint.style/guide/config-presets#enable-all-avaible-rules
        "@stylistic/no-mixed-spaces-and-tabs": "error",
        // Not in plugin:@stylistic/all-extends, see https://eslint.style/guide/config-presets#enable-all-avaible-rules
        "@stylistic/no-tabs": "error",
        "@stylistic/object-curly-spacing": [
            "error",
            "always",
        ],
        "@stylistic/object-property-newline": [
            "error",
            {
                allowAllPropertiesOnSameLine: true,
            },
        ],
        "@stylistic/operator-linebreak": [
            "error",
            "after",
        ],
        "@stylistic/padded-blocks": [
            "error",
            "never",
        ],
        "@stylistic/padding-line-between-statements": [
            "error",
            {
                blankLine: "always",
                prev: "*",
                next: [
                    "class",
                    "export",
                    "interface",
                    "multiline-block-like",
                    "multiline-const",
                    "multiline-expression",
                    "multiline-let",
                    "type",
                ],
            },
            {
                blankLine: "always",
                prev: [
                    "class",
                    "export",
                    "interface",
                    "multiline-block-like",
                    "multiline-const",
                    "multiline-expression",
                    "multiline-let",
                    "type",
                ],
                next: "*",
            },
        ],
        "@stylistic/quote-props": [
            "error",
            "as-needed",
        ],
        "@stylistic/space-before-function-paren": [
            "error",
            {
                anonymous: "never",
                named: "never",
                asyncArrow: "always",
            },
        ],
        "@stylistic/space-in-parens": [
            "error",
            "never",
        ],
        "@stylistic/spaced-comment": [
            "error",
            "always",
            {
                exceptions: ["/"],
            },
        ],
        // The filename case should be the same for the code element and the file name. So, if the main export of a file
        // is a class or a type, the filename should be in PascalCase, otherwise it should be camelCase.
        "unicorn/filename-case": [
            "error",
            {
                cases: {
                    camelCase: true,
                    pascalCase: true,
                },
            },
        ],
        "unicorn/no-array-reduce": "off", // Does not make much sense, reduce is unbeatable in some cases.
        "unicorn/no-await-expression-member": "off", // Seems arbitrary.
        // This is not an issue with modern editors, where keywords have a different color.
        "unicorn/no-keyword-prefix": "off",
        // The suggested alternative Array.from does not seem to be available for typed arrays.
        "unicorn/no-new-array": "off",
        // While generally a good idea, this rule creates a conflict with consistent-return for functions with an
        // implicit return type that is a union of undefined and another type.
        "unicorn/no-useless-undefined": "off",
        "unicorn/prefer-module": "off", // Not all projects can afford to use ESM.
        // Only flags a subset of issues of @typescript-eslint/prefer-string-starts-ends-with
        "unicorn/prefer-string-starts-ends-with": "off",
        "unicorn/prevent-abbreviations": "off", // See id-length, sometimes one character is enough for an identifier.
        // The built-in and turned on no-case-declarations renders braces for cases useless.
        "unicorn/switch-case-braces": [
            "error",
            "avoid",
        ],
        // Since the introduction of @typescript-eslint/no-import-type-side-effects, it makes much more sense to import
        // types with a top level type specifier and everything else in a second import.
        "import/consistent-type-specifier-style": [
            "error",
            "prefer-top-level",
        ],
        "import/default": "off", // Already covered by typescript.
        "import/dynamic-import-chunkname": "error",
        "import/export": "off", // Already covered by typescript.
        "import/exports-last": "error",
        "import/extensions": "off", // Already covered by typescript.
        "import/first": "error",
        // There are advantages and disadvantages to turning this on or off. "off" seems the better choice.
        "import/group-exports": "off",
        "import/imports-first": "off", // Deprecated in favor of import/first.
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
        "import/no-empty-named-blocks": "error",
        "import/no-extraneous-dependencies": "error",
        "import/no-import-module-exports": "error",
        "import/no-internal-modules": "off", // Seems too restrictive.
        "import/no-mutable-exports": "error",
        "import/no-named-as-default": "error",
        "import/no-named-as-default-member": "error",
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
        "jsdoc/imports-as-dependencies": "warn",
        "jsdoc/informative-docs": "warn",
        "jsdoc/match-description": "warn",
        // Does not appear to deliver a lot of value and would require project-specific configuration.
        "jsdoc/match-name": "off",
        "jsdoc/multiline-blocks": "warn",
        "jsdoc/no-bad-blocks": "warn",
        "jsdoc/no-blank-blocks": "warn",
        "jsdoc/no-blank-block-descriptions": "warn",
        "jsdoc/no-defaults": "warn",
        // Exactly what syntax a jsdoc block needs to contain must be the decision of the developer.
        "jsdoc/no-missing-syntax": "off",
        "jsdoc/no-multi-asterisks": "warn",
        // Exactly what syntax a jsdoc block needs to contain must be the decision of the developer.
        "jsdoc/no-restricted-syntax": "off",
        "jsdoc/no-types": "warn",
        "jsdoc/no-undefined-types": "warn",
        "jsdoc/require-asterisk-prefix": "warn",
        // This interferes with documentation that uses HTML tags e.g. <ul>, <li>, etc., because the rule does not seem
        // to recognize those tags and thus warns that the last tag of a paragraph should be followed by a period.
        "jsdoc/require-description-complete-sentence": "off",
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
        // In keeping with the general philosophy, it should not be necessary to document obvious parameters.
        "jsdoc/require-param": "off",
        "jsdoc/require-param-description": "warn",
        // This is turned on so that documentation names are checked against code names. Unfortunately, it seems that
        // we cannot just document some parameters. Either we document none or all.
        "jsdoc/require-param-name": "warn",
        // Parameter types in jsdoc would just duplicate the types already visible in the TypeScript code.
        "jsdoc/require-param-type": "off",
        "jsdoc/require-property": "off",
        "jsdoc/require-property-description": "warn",
        "jsdoc/require-property-name": "warn",
        "jsdoc/require-property-type": "off",
        "jsdoc/require-returns": "off",
        "jsdoc/require-returns-check": "warn",
        "jsdoc/require-returns-description": "warn",
        // Return types in jsdoc would just duplicate the types already visible in the TypeScript code.
        "jsdoc/require-returns-type": "off",
        "jsdoc/require-throws": "off",
        "jsdoc/require-yields": "off",
        "jsdoc/require-yields-check": "warn",
        "jsdoc/sort-tags": "warn",
        "jsdoc/tag-lines": "warn",
        "jsdoc/text-escaping": "off", // Requires project-specific configuration.
        "jsdoc/valid-types": "warn",
        "prefer-arrow/prefer-arrow-functions": [
            "error",
            {
                disallowPrototype: true,
                singleReturnOnly: false,
                classPropertiesAllowed: false,
            },
        ],
        "promise/always-return": "error",
        // Promises aren't that hard to create manually, so it seems dubious to require promisify or pify.
        "promise/avoid-new": "off",
        "promise/catch-or-return": "error",
        "promise/no-callback-in-promise": "error",
        "promise/no-multiple-resolved": "error",
        "promise/no-native": "off", // Does not make sense in modern ES environments.
        "promise/no-new-statics": "error",
        "promise/no-nesting": "error",
        "promise/no-promise-in-callback": "error",
        "promise/no-return-in-finally": "error",
        "promise/no-return-wrap": "error",
        "promise/param-names": "error",
        // Seems too restrictive, a callback is perfectly acceptable if there's no need to wait for completion (e.g. in
        // describe-style tests).
        "promise/prefer-await-to-callbacks": "off",
        "promise/prefer-await-to-then": "error",
        "promise/valid-params": "error",
    },
    settings: {
        // The following settings are taken from https://github.com/import-js/eslint-plugin-import#typescript and
        // https://github.com/import-js/eslint-plugin-import/blob/main/config/typescript.js.
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
        react: {
            version: "18",
        },
    },
};
