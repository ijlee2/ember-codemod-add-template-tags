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
