import { camelize, pascalize } from '@codemod-utils/ember';

export function getNewName(
  name: string,
  transform: 'camelize' | 'pascalize' | 'remove-double-colons',
): string {
  switch (transform) {
    case 'camelize': {
      return camelize(name);
    }

    case 'pascalize': {
      return pascalize(name);
    }

    case 'remove-double-colons': {
      return name.replaceAll('::', '').replaceAll('-', '');
    }
  }
}
