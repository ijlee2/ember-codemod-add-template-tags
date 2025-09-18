[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/ember-codemod-add-template-tags/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/ember-codemod-add-template-tags/actions/workflows/ci.yml)

# ember-codemod-add-template-tags

_Codemod to add `<template>` tags_


## Why use it?

Introducing `<template>` tag to large projects can be a tedious, erroneous task. Run this codemod to get started.

The codemod:

- Statically analyzes code (doesn't need to know your build steps)
- Supports v1 apps (classic build, Webpack), v2 apps (Vite), v1 addons, and v2 addons
- Supports monorepos


## Usage

Step 1. Quickly migrate.<sup>1</sup>

```sh
cd <path/to/your/project>
npx ember-codemod-add-template-tags <arguments>
```

Step 2. Review the package.

- [x] Fix format and lint errors.
- [x] Run tests.

<sup>1. To analyze external dependencies, the codemod reads your `node_modules`. Install your project's dependencies before running the codemod.</sup>


### Arguments

<details>

<summary>Optional: Specify the component structure</summary>

By default, an Octane project has the flat component structure. Pass `--component-structure` to indicate otherwise.

```sh
npx ember-codemod-add-template-tags --component-structure nested
```

</details>

<details>

<summary>Optional: Incrementally migrate</summary>

By default, the codemod updates components, routes, and tests. Pass `--convert` to update a subset of these.

```sh
# 1. Components and tests only
npx ember-codemod-add-template-tags --convert components tests

# 2. Routes only (e.g. after installing `ember-route-template` or updating `ember-source` to 6.3 or higher)
npx ember-codemod-add-template-tags --convert routes
```

</details>

<details>

<summary>Optional: Specify the project root</summary>

Pass `--root` to run the codemod somewhere else (i.e. not in the current directory).

```sh
npx ember-codemod-add-template-tags --root <path/to/your/project>
```

</details>


### Limitations

The codemod is designed to cover typical cases. It is not designed to cover one-off cases.

To better meet your needs, consider cloning the repo and running the codemod locally.

```sh
cd <path/to/cloned/repo>

# Compile TypeScript
pnpm build

# Run codemod
./dist/bin/ember-codemod-add-template-tags.js --root <path/to/your/project>
```


## Troubleshoot

<details>

<summary>Running <code>prettier</code> resulted in the <code>Scope.checkBlockScopedCollisions</code> error</summary>

`prettier` throws the error,

```sh
app/components/hello.gts: TypeError: Cannot read properties of undefined (reading 'buildError')
  at Scope.checkBlockScopedCollisions
  at Scope.registerBinding
  ...
```

when a `*.{gjs,gts}` file imports the same-named object from different paths. For example,

```gts
import { get } from '@ember/helper'; // <-- Added by codemod
import { get } from '@ember/object';
```

```gts
import htmlSafe from 'my-app/helpers/html-safe'; // <-- Added by codemod
import type { htmlSafe } from '@ember/template';
```

Rename or remove one of the objects to fix the error.

</details>


## Compatibility

- Node.js v20 or above


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
