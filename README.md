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

## Goals

This eslint config aims to enforce a strict coding standard for TypeScript, with the following goals:

- Flag as many problems and as much inconsistent formatting as possible while keeping false positives low. Developers
  should be able to correct most errors and warnings by rewriting the code as opposed to sprinkling it with
  `eslint-disable`.
- Treat developers as responsible human beings and trust that they have a good sense of how much and what documentation
  is necessary. Forcing developers to write docs usually leads to text that is not actually helpful and therefore a
  waste of time.
- Follow established ES and TS naming conventions.

## Implementation

If you follow the
[Quick Start section of the typescript-eslint documentation](https://typescript-eslint.io/getting-started#quickstart)
you get good results with very little effort. While this works well for many projects, I prefer a bit more stringent
approach, for the following reasons:

- At the time of writing, the combination of
  [eslint:recommended](https://github.com/eslint/eslint/blob/9a4ae3b68a1afd9483d331997635727fb19a1a99/conf/eslint-recommended.js)
  with
  [plugin:@typescript-eslint/recommended](https://github.com/typescript-eslint/typescript-eslint/blob/deeb7bb9334d301c6af56aefd37d318231af11ef/packages/eslint-plugin/src/configs/recommended.ts)
  turns on less than 70 rules while the combination of
  [eslint:all](https://github.com/eslint/eslint/blob/219aecb78bc646d44bad27dc775a9b3d3dc58232/conf/eslint-all.js)
  [plugin:@typescript-eslint/all](https://github.com/typescript-eslint/typescript-eslint/blob/a0c828559187d1e167f2e095b503c887db4d4352/packages/eslint-plugin/src/configs/all.ts)
  would turn on over 300 rules.
  Clearly, not all rules are a good fit for your project but it should also be obvious that you might be missing useful
  ones when you apply just the recommended rules.
- The `recommended` sets are designed to deliver stable results. New rules are only ever added with the release of a new
  major version. Given how infrequent major versions are released, newly added rules could take years until they are
  applied to your code. The `all` sets on the other hand can change with every minor version bump, new rules can thus be
  applied to your code more quickly.
