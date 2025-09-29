# Troubleshoot

<details>

<summary>Codemod didn't convert all files</summary>

For simplicity, the codemod doesn't cover these cases:

- Classic components (`@ember/component`)
- Components that extend another component (class inheritance)
- Rendering tests that don't use the `hbs` tag inside `render()`
- `dummy` app in v1 addons

</details>

<details>

<summary>Running <code>prettier</code> resulted in <code>Scope.checkBlockScopedCollisions</code></summary>

`prettier` throws the error

```sh
TypeError: Cannot read properties of undefined (reading 'buildError')
  at Scope.checkBlockScopedCollisions
  at Scope.registerBinding
  ...
```

when it encounters a name conflict in the `*.{gjs,gts}` file. Examples include:

```gts
import { get } from '@ember/helper'; // <-- Added by codemod
import { get } from '@ember/object';
```

```gts
import htmlSafe from 'my-app/helpers/html-safe'; // <-- Added by codemod
import type { htmlSafe } from '@ember/template';
```

```gts
import MyFolder from 'my-app/components/my-folder'; // <-- Added by codemod

export default class MyFolder extends Component {
  // Recursion
  <template>
    <MyFolder />
  </template>
}
```

To fix the error, rename or remove one of the imported objects.

</details>

<details>

<summary>Running the app resulted in <code>template is not a function</code></summary>

Ember throws the error

```sh
Error while processing route: <route-name> template is not a function
```

when the conditions for using `<template>` in routes aren't met. Namely, the version of your `ember-source` is below `6.3.0`.

You have 3 options:

1. Update `ember-source` to `6.3.0` or higher.
1. Install [`ember-route-template`](https://github.com/discourse/ember-route-template) (supports `3.28` and above).
1. Use `--convert` to convert components and tests only.

</details>

<details>

<summary>Test assertions failed</summary>

If a project depends on `ember-source@<6.4.0`, the codemod renames `this` to `self` to work around a bug that prevents us from using `this` inside a `<template>` tag.

```diff
module('Integration | Component | hello', function (hooks) {
  hooks.beforeEach(function () {
    this.name = 'Zoey';
  });

  test('it renders', async function (assert) {
+     const self = this;
+
    await render(
-      <template><Hello @name={{this.name}} /></template>,
+      <template><Hello @name={{self.name}} /></template>,
    );

    assert.dom().hasText('Hello, Zoey!');
  });
});
```

For `ember-source@>=6.4.0`, the codemod keeps `this` around to minimize change. If you see that assertions fail because of `this`, you can rename it as shown above, or destructure it (see below), to fix the error.

```gts
module('Integration | Component | hello', function (hooks) {
  hooks.beforeEach(function () {
    this.name = 'Zoey';
  });

  test('it renders', async function (assert) {
    const { name } = this;

    await render(
      <template><Hello @name={{name}} /></template>,
    );

    assert.dom().hasText('Hello, Zoey!');
  });
});
```

</details>
