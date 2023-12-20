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
  <a href="https://travis-ci.com/github/andreashuber69/eslint-config">
    <img src="https://travis-ci.com/andreashuber69/eslint-config.svg?branch=master" alt="Build">
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

## Rationale

A search for **eslint-config** and **typescript** on [npm](https://npmjs.com) lists well over 2500 packages. Despite
this abundance, I've failed to find a package that satisfies what I was looking for, namely:

- Leverage the best eslint-plugins to thoroughly inspect code. To get an idea of what this config tries to achieve, it's
  probably best to compare the number of active rules recommended for **TypeScript** projects
  ([see TS eslint quick start](https://typescript-eslint.io/getting-started#quickstart)) to the number of active rules
  in this configuration. At the time of writing the count is 76 for the recommended set compared to 505 in this package.
  More specifically, we try to ...
  - flag as many problems and as much inconsistent formatting as possible while keeping false positives low. Developers
    should be able to correct most errors and warnings by rewriting the code as opposed to sprinkling it with
    `eslint-disable`.
  - treat developers as responsible human beings and trust that they have a good sense of how much and what
    documentation is necessary. Forcing developers to write docs usually leads to text that is not actually helpful and
    therefore a waste of time.
  - enforce established ES and TS naming conventions.
- Make installation, configuration and maintenance as easy as possible. With npm >= 7.0 you only need to install and
  update this package. All dependencies are kept up to date automatically, see [Getting Started](#getting-started) for
  more information.
- Closely track the versions of all dependencies and release new config versions as necessary.
- Last but not least: Automatically test the configuration, such that changes (e.g. added or removed rules) are detected
  and the rules listed in the configuration are always in sync with the rules provided by **eslint** and the plugins.

To see how the linted code will look like, you can look at
[async-css-plugin](https://github.com/andreashuber69/async-css-plugin/tree/develop/src) and
[verify-coldcard-dice-seed](https://github.com/andreashuber69/verify-coldcard-dice-seed/tree/develop/src). If the code
looks sensible to you, you might want to give this package a try in your project. Of course, you can tweak everything to
your liking, see below.

## Prerequisites

The configuration and the instructions below are designed to work out of the box for already setup simple **TypeScript**
projects. More specifically, the project root folder must contain a
[tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) file. While not required, it is
recommended to have your _tsconfig.json_ extend from a strict configuration. Here's an example for node:

```jsonc
{
  "extends": [
    "@tsconfig/strictest/tsconfig",
    "@tsconfig/node-lts/tsconfig"
  ],
  "compilerOptions": {
    // Additional compiler options to the ones set by @tsconfig
  },
  "include": [
    "src/**/*"
  ]
}
```

## Getting Started

### Installation

1. If you've followed the recommendation in the [Prerequisites](#prerequisites) and now use an array to extend from
   `@tsconfig` bases, you first need to add the following to your _package.json_:

   ```json
   "overrides": {
     "tsconfig-paths": "^4.2.0"
   },
   ```

   This is due to an [incompatibility with the `eslint-plugin-import` package](
   https://github.com/import-js/eslint-plugin-import/issues/2751#issuecomment-1499270368).
2. On the command line, first enter `npm -v` to see what version of `npm` you have installed. If you have a version
   &gt;=7.0.0, please use this command:

   ```bash
   npm install --save-dev @andreashuber69/eslint-config
   ```

   Otherwise, please use this command:

   ```bash
   npx install-peerdeps @andreashuber69/eslint-config --dev
   ```

   On npm 7 and newer, peer dependencies
   [are installed automatically](https://github.com/npm/rfcs/blob/main/implemented/0025-install-peer-deps.md). On
   older versions of npm, you can use the tool `install-peerdeps` as shown above or install the peer dependencies
   manually.

### Configuration

1. Create the new file _.eslintrc.cjs_ in the root folder of your project, with the following contents:

   ```js
   module.exports = {
       env: {
           // You need to set your execution environment (node, browser, etc.), for more information please see
           // https://eslint.org/docs/latest/user-guide/configuring/language-options#specifying-environments
           node: true,
       },
       extends: ["@andreashuber69"],
       rules: {
           // Customize rules as you see fit
       },
   };
   ```

   This is typically enough, as **eslint** will merge the above with `parserOptions: { ecmaVersion: "latest" }`,
   `env: { es2024: true }` and other defaults. To see the complete configuration you might want to run ...

   ```bash
   npx eslint --print-config .eslintrc.cjs >eslint-config.json
   ```

   ... and inspect _eslint-config.json_. Note that for a typical TS project you want to parse according to the latest
   standard because the **TypeScript** compiler will downlevel language features depending on the `target` setting in
   _tsconfig.json_.

2. Add the following line to the `scripts` section of your _package.json_ (assuming your code resides in the _src_
   folder):

   ```json
   "lint": "eslint --ext .js,.ts --report-unused-disable-directives './src'",
   ```

### Lint

```bash
npm run lint
```
