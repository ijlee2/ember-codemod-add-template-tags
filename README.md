[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/ember-codemod-add-template-tags/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/ember-codemod-add-template-tags/actions/workflows/ci.yml)

# ember-codemod-add-template-tags

_Codemod to add `<template>` tags_


## Why use it?

Introducing `<template>` tag to large projects can be tedious and error-prone. Run this codemod to get started.

The codemod:

- Statically analyzes code (no need to build projects)
- Supports v1 apps (classic, Webpack), v2 apps (Vite)
- Supports v1 addons, v2 addons
- Supports monorepos (convert all packages at once)
- Light and fast


## Usage

Step 1. Quickly migrate.<sup>1</sup>

```sh
cd <path/to/your/project>
pnpx ember-codemod-add-template-tags <arguments>
```

Step 2. Review the package.

- [x] Fix format and lint errors.<sup>2</sup>
- [x] Run tests.

You can check [Troubleshoot](TROUBLESHOOT.md) if you encounter an issue.

<sup>1. To analyze external dependencies, the codemod reads your `node_modules`. Install your project's dependencies before running the codemod.</sup>

<sup>2. If you need lint configs that support `*.{gjs,gts}`, you can install packages from [`@ijlee2-frontend-configs`](https://github.com/ijlee2/frontend-configs).</sup>


### Arguments

<details>

<summary>Optional: Specify the component structure</summary>

By default, an Octane project has the flat component structure. Pass `--component-structure` to indicate otherwise.

```sh
pnpx ember-codemod-add-template-tags --component-structure nested
```

</details>

<details>

<summary>Optional: Incrementally migrate</summary>

By default, the codemod updates components, routes, and tests. Pass `--convert` to update a subset of these.

```sh
# 1. Components and tests only
pnpx ember-codemod-add-template-tags --convert components tests

# 2. Routes only (e.g. after installing `ember-route-template` or updating `ember-source` to 6.3 or higher)
pnpx ember-codemod-add-template-tags --convert routes
```

</details>

<details>

<summary>Optional: Specify the project root</summary>

Pass `--root` to run the codemod somewhere else (i.e. not in the current directory).

```sh
pnpx ember-codemod-add-template-tags --root <path/to/your/project>
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


## Compatibility

- Node.js v20 or above


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
