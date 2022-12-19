<p align="center">
  <a href="https://www.npmjs.com/package/@andreashuber69/eslint-config">
    <img src="https://img.shields.io/npm/v/@andreashuber69/eslint-config" alt="NPM Version">
  </a>
  <a href="https://github.com/andreashuber69/eslint-config/releases/latest">
    <img src="https://img.shields.io/github/release-date/andreashuber69/eslint-config.svg" alt="Release Date">
  </a>
  <a href="https://travis-ci.com/github/andreashuber69/eslint-config">
    <img src="https://travis-ci.com/andreashuber69/eslint-config.svg?branch=master" alt="Build">
  </a>
  <a href="https://github.com/andreashuber69/eslint-config/issues">
    <img src="https://img.shields.io/github/issues-raw/andreashuber69/eslint-config.svg" alt="Issues">
  </a>
  <a href="https://github.com/andreashuber69/eslint-config/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/andreashuber69/eslint-config.svg" alt="License">
  </a>
</p>

<h1 align="center">@andreashuber69/eslint-config</h1>

This is a comprehensive, carefully curated and tested
[shareable eslint config](https://eslint.org/docs/latest/developer-guide/shareable-configs) for
[TypeScript](https://www.typescriptlang.org/) projects.

## Assumptions

To get an idea of what this config tries to achieve, it's probably best to compare the number of active rules
recommended for **TypeScript** projects
([see TS eslint quick start](https://typescript-eslint.io/getting-started#quickstart)) to the number of active
rules in this configuration. At the time of writing there are exactly 67 recommended rules compared 370 rules here. In
other words, your code gets a much more thorough treatment. More specifically, we try to ...

- flag as many problems and as much inconsistent formatting as possible while keeping false positives low. Developers
  should be able to correct most errors and warnings by rewriting the code as opposed to sprinkling it with
  `eslint-disable`.
- treat developers as responsible human beings and trust that they have a good sense of how much and what documentation
  is necessary. Forcing developers to write docs usually leads to text that is not actually helpful and therefore a
  waste of time.
- enforce established ES and TS naming conventions.

To get an idea how the linted code will look like, you might want to have a look at
[async-css-plugin](https://github.com/andreashuber69/async-css-plugin/tree/develop/src) and
[verify-coldcard-dice-seed](https://github.com/andreashuber69/verify-coldcard-dice-seed/tree/develop/src). If the code
looks sensible to you, you might want to give it a try in your project. Of course, you can tweak everything to your
liking, see below.

## Prerequisites

The configuration and the instructions below are designed to work out of the box for simple **TypeScript** projects,
more specifically, the project root folder must contain the following files:

- [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
- It's best to have your *tsconfig.json* extend from a strict configuration, e.g.
  [@tsconfig/node-lts-strictest](https://www.npmjs.com/package/@tsconfig/node-lts-strictest)
- *.eslintrc.cjs*, see [Configuration](#configuration)

## Getting Started

### Installation

On the command line, install the required package:

```bash
npm install --save-dev @andreashuber69/eslint-config
```

On npm 7 and newer, eslint and all other peer dependencies
[should be installed automatically](https://github.com/npm/rfcs/blob/main/implemented/0025-install-peer-deps.md). On
older versions of npm, you will see warning messages to install them manually.

### Configuration

Create the new file *.eslintrc.cjs* in the root folder of your project, with the following contents:

```js
module.exports = {
    extends: [
        "@andreashuber69",
    ],
    rules: {
        // Customize rules as you see fit
    }
};
```
