import type { PackageJson } from '@codemod-utils/package-json';

import { isEmberSourceRecent } from '../../utils/find-packages-with-hbs/index.js';

export function analyzeDependencies(packageJson: PackageJson): {
  hasEmberRouteTemplate: boolean;
  isEmberSourceRecent: boolean;
} {
  const dependencies = Object.assign(
    {},
    packageJson['dependencies'],
    packageJson['devDependencies'],
  );

  return {
    hasEmberRouteTemplate: Boolean(dependencies['ember-route-template']),
    isEmberSourceRecent: isEmberSourceRecent(dependencies['ember-source']),
  };
}
