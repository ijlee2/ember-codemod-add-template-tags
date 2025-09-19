# Troubleshoot

## Lint

### Running `prettier` resulted in a `Scope.checkBlockScopedCollisions` error

`prettier` throws the error,

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

## Test

### Assertions for a rendering test failed

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
