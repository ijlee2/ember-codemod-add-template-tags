# Troubleshoot

<details>

<summary>Do I need <code>ember-template-imports</code>?</summary>

In general, you need [`ember-template-imports`](https://github.com/ember-cli/ember-template-imports) to use `<template>` tag in components and tests. Otherwise, Ember will not render your app.

You can uninstall the addon in these cases:

- Your app runs on `@embroider/core@4.x` or above. Currently, `v4` only supports v2 apps (Vite).
- Your addon is a v2 addon.

</details>

<details>

<summary>Do I need <code>ember-route-template</code>?</summary>

In general, you need [`ember-route-template`](https://github.com/discourse/ember-route-template) to use `<template>` tag in routes. Otherwise, Ember will throw the error `template is not a function`.

You can uninstall the addon in these cases:

- Your app runs on `ember-source@6.3` or above.

</details>

<details>

<summary>Codemod didn't convert all files</summary>

For simplicity, the codemod doesn't cover these cases:

- Classic components (`@ember/component`)
- Components that extend another component (class inheritance)
- Rendering tests that don't use the `hbs` tag inside `render()`
- `dummy` app in v1 addons
- In-repo addons

</details>

<details>

<summary>Codemod missed some imports</summary>

If the thing to be imported comes from Ember, then the codemod has a bug. Please report the issue.

If it comes from an addon, here are some possible reasons. The codemod won't handle these cases.

- The addon didn't appear in `node_modules` because it hadn't been listed as a dependency in `package.json`.
- The addon published files in a way that doesn't follow Ember conventions.

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

<summary>Test assertions failed</summary>

The codemod adds an alias of `this` (called `self`) due to a bug that prevents us from using `this` inside the `<template>` tag.

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

The bug isn't fully fixed as of `ember-source@6.6.0`. If you see that assertions are failing, you can rename `this` as shown above, destructure it, or remove it altogether.

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

```gts
module('Integration | Component | hello', function (hooks) {
  test('it renders', async function (assert) {
    const name = 'Zoey';

    await render(
      <template><Hello @name={{name}} /></template>,
    );

    assert.dom().hasText('Hello, Zoey!');
  });
});
```

</details>
