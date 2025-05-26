<h1 align="center">
  <img
    width="128" alt="logo"
    src="https://raw.githubusercontent.com/andreashuber69/eslint-config/master/doc/icon.svg?sanitize=true"><br>
  @andreashuber69/eslint-config
</h1>
<p align="center">
  <a href="https://www.npmjs.com/package/@andreashuber69/eslint-config">
    <img src="https://img.shields.io/npm/v/@andreashuber69/eslint-config" alt="NPM Version">
  </a>
  <a href="https://github.com/andreashuber69/eslint-config/releases">
    <img src="https://img.shields.io/github/release-date/andreashuber69/eslint-config.svg" alt="Release Date">
  </a>
  <a href="https://github.com/andreashuber69/eslint-config/actions/workflows/ci.yml">
    <img src="https://github.com/andreashuber69/eslint-config/actions/workflows/ci.yml/badge.svg" alt="CI">
  </a>
  <a href="https://github.com/andreashuber69/eslint-config/issues">
    <img src="https://img.shields.io/github/issues-raw/andreashuber69/eslint-config.svg" alt="Issues">
  </a>
  <a href="https://coveralls.io/github/andreashuber69/eslint-config?branch=master">
    <img src="https://coveralls.io/repos/github/andreashuber69/eslint-config/badge.svg?branch=master" alt="Coverage">
  </a>
  <a href="https://github.com/andreashuber69/eslint-config/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/andreashuber69/eslint-config.svg" alt="License">
  </a>
</p>

## Introduction

This is a comprehensive and carefully curated
[shareable eslint config](https://eslint.org/docs/latest/developer-guide/shareable-configs), designed to quickly add
linting to [TypeScript](https://www.typescriptlang.org/) projects.

## Assumptions

This configuration uses the
[project service feature](https://typescript-eslint.io/blog/announcing-typescript-eslint-v8/#project-service) of
[typescript-eslint](https://typescript-eslint.io/). With this feature even a large code base can be linted with minimal
configuration, contingent on the following central assumptions:

1. With very few exceptions, **all** linted code must be included by at least one *tsconfig.json* file.
1. A *tsconfig.json* can only include code files located in the same folder or a direct or indirect subfolder.

While both are probably correct for the majority of projects out there (especially the small ones), it is easy to
break the first assumption. For example, instead of shell scripts some projects use *.ts* files run with something like
[tsx](https://tsx.is/). **tsx** does not require a *tsconfig.json* for execution. If you want to lint such files, you'd
have to create a *tsconfig.json* file that includes them.

## Installation

1. In the root folder of your project, execute the following on the command line:

   ```bash
   npm install @andreashuber69/eslint-config --save-dev
   ```

1. While not required, it is recommended to have your *tsconfig.json* file(s) extend from a strict configuration. Here's
   an example for node:

   ```jsonc
   {
     "extends": [
       "@tsconfig/strictest/tsconfig",
       "@tsconfig/node-lts/tsconfig"
     ],
     "compilerOptions": {
       // Additional compiler options to the ones set by @tsconfig
     },
     "include": ["src/**/*"]
   }
   ```

   For the above to work you have to install the required packages, as follows:

   ```bash
   npm install @tsconfig/strictest @tsconfig/node-lts --save-dev
   ```

1. Add the following line to the `scripts` section of your *package.json*:

   ```json
   "lint": "eslint",
   ```

## Configuration

The whole linting process is configured by the file *eslint.config.ts* located in the root folder of your project. The
sections below show examples that you can adapt. For a list of rules provided by this package as well as a rationale for
their default configuration, please see
[index.ts](https://github.com/andreashuber69/eslint-config/blob/master/src/index.ts). If you want to see the effect of
your configuration on a given file in your project you can use the following command and then inspect the contents of
*eslint-config.json*.

```bash
npx eslint --print-config src/index.ts >eslint-config.json
```

### Simple Configuration Example

This configuration example can be used in the following circumstances:

- A handful of code files in the root folder of the project (like *eslint.config.ts*, see below) are **not** included
  by a *tsconfig.json* file.
- The root folder of the project contains a *tsconfig.json* file.

If one or both of these do not apply to your project, please see
[Advanced Configuration Example](#advanced-configuration-example).

```ts
import config from "@andreashuber69/eslint-config";

// eslint-disable-next-line import/no-anonymous-default-export, import/no-default-export
export default [
    ...config,
    {
        // List the files/folders of your project that are excluded
        // from linting. This is typically a superset of the folders
        // listed in .gitignore (except for node_modules).
        ignores: ["coverage/", "dist/", "doc/"],
    },
    {
        // Only necessary if you'd like to change or turn off rules.
        rules: {
            // Change to your liking, e.g.
            "@typescript-eslint/return-await": "off",
            "unicorn/switch-case-braces": "off",
        },
    },
];
```

### Advanced Configuration Example

This configuration example can be used if the [Simple Configuration Example](#simple-configuration-example) is not
applicable to your project.

```ts
import config from "@andreashuber69/eslint-config";

// eslint-disable-next-line import/no-anonymous-default-export, import/no-default-export
export default [
    ...config,
    {
        // List the files/folders of your project that are excluded
        // from linting. This is typically a superset of the folders
        // listed in .gitignore (except for node_modules).
        ignores: ["coverage/", "dist/", "doc/"],
    },
    {
        languageOptions: {
            parserOptions: {
                projectService: {
                    // Globs relative to the root folder matching at most
                    // 8 code files not included by a tsconfig.json (can
                    // be empty).
                    allowDefaultProject: [
                        "*.js", "*.cjs", "*.mjs", "*.ts", "*.cts", "*.mts"
                    ],
                    // The relative path to a tsconfig.json that will be
                    // used to lint the files matched with
                    // allowDefaultProject.
                    defaultProject: "tsconfig.json",
                },
            },
        },
        // Only necessary if you'd like to change or turn off rules
        rules: {
            // Change to your liking, e.g.
            "@typescript-eslint/return-await": "off",
            "unicorn/switch-case-braces": "off",
        },
    },
];
```

Above, the values for [`allowDefaultProject`](https://typescript-eslint.io/packages/parser/#allowdefaultproject) and
[`defaultProject`](https://typescript-eslint.io/packages/parser/#defaultproject) show what is assumed under
[Simple Configuration Example](#simple-configuration-example). Modify their values to suit your needs.

### JavaScript

By default `@andreashuber69/eslint-config` will lint JavaScript files (*.js*, *.cjs*, *.mjs*, *.jsx*) with a reduced set
of rules, please see [`disable-type-checked`](https://typescript-eslint.io/users/configs#disable-type-checked)
documentation. **If you have JavaScript files in your project, you need to do one of the following**:

- Lint all JS: Check that [`"checkJs": true`](https://www.typescriptlang.org/tsconfig/#checkJs) is in your
  *tsconfig.json*. If it extends from `@tsconfig/strictest/tsconfig`, this is already the case.
- Ignore all JS: Add to the `ignores` list: `"**/*.js", "**/*.cjs", "**/*.mjs", "**/*.jsx"`.

## Rationale

A search for **eslint-config** and **typescript** on [npm](https://npmjs.com) lists well over 2500 packages. Despite
this abundance, I've failed to find a package that satisfies what I was looking for, namely:

- Leverage the best eslint-plugins to thoroughly inspect code. To get an idea of what this config tries to achieve, it's
  probably best to compare the number of active rules recommended for **TypeScript** projects
  ([see TS eslint quick start](https://typescript-eslint.io/getting-started#quickstart)) with
  [React](https://react.dev/) support (see [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)) to
  the number of active rules in this configuration. At the time of writing the count is **only 87** for the recommended
  set compared to **613 rules in this package**.
  More specifically, ...
  - flag as many problems and as much inconsistent formatting as possible while keeping false positives low. Developers
    should be able to correct most errors and warnings by rewriting the code as opposed to sprinkling it with
    `eslint-disable`.
  - treat developers as responsible human beings and trust that they have a good sense of how much and what
    documentation is necessary. Forcing developers to write docs usually leads to text that is not actually helpful and
    therefore a waste of time.
  - enforce established ES and TS naming conventions.
- Make installation, configuration and maintenance as easy as possible. You only need to install and update this
  package. All dependencies are kept up to date automatically.
- Closely track the versions of all dependencies and release new config versions as necessary.
- Last but not least: **Automatically test the configuration**, such that changes in **eslint** and the plugins (e.g.
  added or removed rules) are detected and the rules listed in the configuration are always in sync with the rules
  provided. With 7 plugins adding rules to this package, it's hard to overstate the importance of testing for
  completeness and consistency. No other eslint configuration out there seems to do that, which is probably why some of
  them still needlessly turn off **eslint** base rules in favor of their **@typescript-eslint** counterparts, even
  though they extend from the **tseslint.configs.recommended** list (which already does that).

To see how the linted code will look like, you can look at
[async-css-plugin](https://github.com/andreashuber69/async-css-plugin/tree/develop/src) and
[verify-coldcard-dice-seed](https://github.com/andreashuber69/verify-coldcard-dice-seed/tree/develop/src). If the code
looks sensible to you, you might want to give this package a try in your project. Of course, you can tweak everything to
your liking, see above.
