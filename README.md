<h1 align="center">
  <img width="128" src="https://raw.githubusercontent.com/andreashuber69/eslint-config/master/doc/icon.svg?sanitize=true"><br>
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

This is a comprehensive, carefully curated and tested
[shareable eslint config](https://eslint.org/docs/latest/developer-guide/shareable-configs) for
[TypeScript](https://www.typescriptlang.org/) projects.

To get an idea of what this config tries to achieve, it's probably best to compare the number of active rules
recommended for **TypeScript** projects
([see TS eslint quick start](https://typescript-eslint.io/getting-started#quickstart)) to the number of active rules in
this configuration. At the time of writing the count is 67 for the recommended set compared to 486 in this package. In
other words, your code gets a much more thorough treatment. More specifically, we try to ...

- flag as many problems and as much inconsistent formatting as possible while keeping false positives low. Developers
  should be able to correct most errors and warnings by rewriting the code as opposed to sprinkling it with
  `eslint-disable`.
- treat developers as responsible human beings and trust that they have a good sense of how much and what documentation
  is necessary. Forcing developers to write docs usually leads to text that is not actually helpful and therefore a
  waste of time.
- enforce established ES and TS naming conventions.

To see how the linted code will look like, you can look at
[async-css-plugin](https://github.com/andreashuber69/async-css-plugin/tree/develop/src) and
[verify-coldcard-dice-seed](https://github.com/andreashuber69/verify-coldcard-dice-seed/tree/develop/src). If the code
looks sensible to you, you might want to give this package a try in your project. Of course, you can tweak everything to
your liking, see below.

## Prerequisites

The configuration and the instructions below are designed to work out of the box for already setup simple **TypeScript**
projects. More specifically, the project root folder must contain a
[tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) file. While not required, it is highly
recommended to have your *tsconfig.json* extend from a strict configuration, e.g.
[@tsconfig/node-lts-strictest](https://www.npmjs.com/package/@tsconfig/node-lts-strictest).

## Getting Started

### Installation

On the command line, first enter `npm -v` to see what version of `npm` you have installed. If you have a version >=7.0.0,
please use this command:

```bash
npm install --save-dev @andreashuber69/eslint-config
```

Otherwise, please use this command:

```bash
npx install-peerdeps @andreashuber69/eslint-config --dev
```

On npm 7 and newer, peer dependencies
[are installed automatically](https://github.com/npm/rfcs/blob/main/implemented/0025-install-peer-deps.md). On
older versions of npm, you can use the tool `install-peerdeps` as shown above or install the peer dependencies manually.

### Configuration

1. Create the new file *.eslintrc.cjs* in the root folder of your project, with the following contents:

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
       }
   };
   ```

   This is typically enough, as **eslint** will merge the above with `parserOptions: { ecmaVersion: "latest" }`,
   `env: { es2022: true }` and other defaults. To see the complete configuration you might want to run ...

   ```bash
   npx eslint --print-config .eslintrc.cjs >eslint-config.json
   ```

   ... and inspect *eslint-config.json*. Note that for a typical TS project you want to parse according to the latest
   standard because the **TypeScript** compiler will downlevel language features depending on the `target` setting in
   *tsconfig.json*.

2. Add the following line to the `scripts` section of your *package.json* (assuming your code resides in the *src*
   folder):

   ```json
       "lint": "eslint --ext .js,.ts --report-unused-disable-directives './src'",
   ```

### Lint

```bash
npm run lint
```
