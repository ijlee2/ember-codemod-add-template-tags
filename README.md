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

Step 1. Quickly migrate.<sup>1,2</sup>

```sh
cd <path/to/your/project>
pnpx ember-codemod-add-template-tags <arguments>
```

Step 2. Review the package.

- [x] Fix format and lint errors.<sup>3</sup>
- [x] Run tests.

You can check [Troubleshoot](TROUBLESHOOT.md) if you encounter an issue.

<sup>1. The codemod assumes that your apps and addons follow the Octane layout (flat or nested). If not, you can run codemods to move away from [classic](https://github.com/ember-codemods/ember-component-template-colocation-migrator) and [pod](https://github.com/ijlee2/ember-codemod-pod-to-octane).</sup>

<sup>2. To analyze external dependencies, the codemod reads your `node_modules`. Install your project's dependencies before running the codemod.</sup>

<sup>3. If you need lint configs that support `*.{gjs,gts}`, you can install packages from [`@ijlee2-frontend-configs`](https://github.com/ijlee2/frontend-configs).</sup>


### Arguments

<details>

<summary>Optional: Limit types of files to consider</summary>

By default, the codemod considers components, routes, and tests. Pass `--convert` to consider a subset of these.

```sh
# Components and tests only
pnpx ember-codemod-add-template-tags --convert components tests

# Routes only
pnpx ember-codemod-add-template-tags --convert routes
```

</details>

<details>

<summary>Optional: Limit folders to consider</summary>

By default, the codemod considers all files and folders for components, routes, and tests. Pass `--folder` to limit the search to 1 folder. (You may use glob patterns to specify multiple folders.)

```sh
# `ui` folder only
pnpx ember-codemod-add-template-tags --folder ui

# `ui/form` folder only
pnpx ember-codemod-add-template-tags --folder ui/form

# `route1` and `route2` folders only
pnpx ember-codemod-add-template-tags --convert routes --folder "{route1,route2}"
```

</details>

<details>

<summary>Optional: Specify the component structure</summary>

By default, an Octane project has the flat component structure. Pass `--component-structure` to indicate otherwise.

```sh
pnpx ember-codemod-add-template-tags --component-structure nested
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
