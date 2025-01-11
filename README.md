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

This is a comprehensive and carefully curated
[shareable eslint config](https://eslint.org/docs/latest/developer-guide/shareable-configs) for
[TypeScript](https://www.typescriptlang.org/) projects.

## Prerequisites

The configuration provided by this package and the instructions below are designed to quickly add linting to
**TypeScript** projects. Towards that end, the new
[project service feature](https://typescript-eslint.io/blog/announcing-typescript-eslint-v8/#project-service) of
[typescript-eslint](https://typescript-eslint.io/) is employed. For this to work correctly, ...

1. the node version **must** be >=18.18 (imposed by eslint).
1. all code in a direct or indirect subfolder of the project root that is not explicitly excluded from linting
   **must** be included by a *tsconfig.json* file located in the same folder as an included file or a direct or indirect
   parent folder.
1. the handful of code files in the root folder of the project (like *eslint.config.mjs*, see below)
   **should not** be included by a *tsconfig.json* file.
1. the root directory of the project **should** contain a *tsconfig.json* file.
1. it is recommended to have your *tsconfig.json* file(s) extend from a strict configuration. Here's an example for
   node:

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

If your project already satisfies to the requirements above, then you can get up and running simply by following the
steps under [Getting Started](#getting-started).

Note that only the first and second points above are hard requirements. For 3 & 4, there are ways to make linting work
even if your project does not follow these rules, see [Advanced Configuration](#advanced-configuration)

## Getting Started

### Installation

```bash
npm install --save-dev @andreashuber69/eslint-config
```

### Configuration

1. Create the new file *eslint.config.mjs* in the root folder of your project, with the following contents:

   ```js
   import config from "@andreashuber69/eslint-config";

   // eslint-disable-next-line import/no-anonymous-default-export, import/no-default-export
   export default [
       ...config,
       {
           // List the folders of your project that are excluded from linting.
           // This is typically a superset of the folders listed in .gitignore
           ignores: ["coverage/", "dist/", "doc/"],
       },
       {
           // Only necessary if you'd like to change or turn off rules
           rules: {
               // Change to your liking, e.g.
               "@typescript-eslint/return-await": "off",
               "unicorn/switch-case-braces": "off",
           },
       },
   ];
   ```

1. Add the following line to the `scripts` section of your *package.json*:

   ```json
   "lint": "eslint",
   ```

### Lint

```bash
npm run lint
```

## Advanced Configuration

A more flexible template for *eslint.config.mjs* looks as follows:

```js
import config from "@andreashuber69/eslint-config";

// eslint-disable-next-line import/no-anonymous-default-export, import/no-default-export
export default [
    ...config,
    {
        // List the folders of your project that are excluded from linting.
        // This is typically a superset of the folders listed in .gitignore
        ignores: ["coverage/", "dist/", "doc/"],
    },
    {
        languageOptions: {
            parserOptions: {
                projectService: {
                    // Globs relative to the root folder matching at most 8 code files not included by a tsconfig.json
                    // (can be empty).
                    allowDefaultProject: ["*.js", "*.cjs", "*.mjs", "*.ts", "*.cts", "*.mts"],
                    // The relative path to a tsconfig.json that will be used to lint the files matched with
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
[`defaultProject`](https://typescript-eslint.io/packages/parser/#defaultproject) show what is assumed with the
simpler template under [Configuration](#configuration). Therefore, if your project does not satisfy the
requirements 3 and/or 4 (see [Prerequisites](#prerequisites)), you can modify these to suit your needs.

## Rationale

A search for **eslint-config** and **typescript** on [npm](https://npmjs.com) lists well over 2500 packages. Despite
this abundance, I've failed to find a package that satisfies what I was looking for, namely:

- Leverage the best eslint-plugins to thoroughly inspect code. To get an idea of what this config tries to achieve, it's
  probably best to compare the number of active rules recommended for **TypeScript** projects
  ([see TS eslint quick start](https://typescript-eslint.io/getting-started#quickstart)) with
  [React](https://react.dev/) support (see [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)) to
  the number of active rules in this configuration. At the time of writing the count is **only 101** for the recommended
  set compared to **621 rules in this package**.
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
