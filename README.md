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

This eslint config aims to enforce a strict coding standard for [TypeScript](https://www.typescriptlang.org/), with the
following goals:

- Flag as many problems and as much inconsistent formatting as possible while keeping false positives low. Developers
  should be able to correct most errors and warnings by rewriting the code as opposed to sprinkling it with
  `eslint-disable`.
- Treat developers as responsible human beings and trust that they have a good sense of how much and what documentation
  is necessary. Forcing developers to write docs usually leads to text that is not actually helpful and therefore a
  waste of time.
- Follow established ES and TS naming conventions.

## Prerequisites

This eslint-config and the instructions below are designed to work out of the box for simple **TypeScript** projects,
more specifically, the project root folder must contain the following files:

- [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
- *.eslintrc.cjs*, see [Configuration](#configuration)

This configuration makes various assumptions about your environment and, more importantly, best practices and the look
and feel of your code. It only makes sense to use this configuration if the active rules mostly appeal to you, see
[this project](https://github.com/andreashuber69/async-css-plugin/tree/develop/src) to get an idea how your code will
look like. Of course, you can tweak everything to your liking, see below.

## Getting Started

### Installation

On the command line, install the required packages:

```bash
npm install --save-dev @andreashuber69/eslint-config
```

On npm 7 and newer, eslint and all other peer dependencies
[should be installed automatically](https://github.com/npm/rfcs/blob/main/implemented/0025-install-peer-deps.md). On
older versions of npm, you will see warning messages to install them manually.

### Configuration

If it doesn't exist already, create the new file *.eslintrc.cjs* in the root folder of your project, with the following
contents:

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

## Motivation

At the time of writing, following the
[Quick Start section of the typescript-eslint documentation](https://typescript-eslint.io/getting-started#quickstart)
activates 67 rules while extending from @andreashuber69/eslint-config activates 370 rules. Clearly, not all rules are
a good fit for your project but it should also be obvious that you might be missing useful ones when you apply just
the recommended rules.
