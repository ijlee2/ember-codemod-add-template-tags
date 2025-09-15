import { convertToMap, type PackageJson } from '@codemod-utils/package-json';

import type { PackageName } from '../../types/index.js';
import {
  isEmberSourceRecent,
  type PackageVersion,
} from '../../utils/find-packages-with-hbs/index.js';

export function analyzeDependencies(packageJson: PackageJson): {
  hasEmberRouteTemplate: boolean;
  isEmberSourceRecent: boolean;
} {
  const dependencies = convertToMap(
    Object.assign(
      {},
      packageJson['dependencies'],
      packageJson['devDependencies'],
    ),
  ) as Map<PackageName, PackageVersion>;

  return {
    hasEmberRouteTemplate: dependencies.has('ember-route-template'),
    isEmberSourceRecent: isEmberSourceRecent(dependencies.get('ember-source')),
  };
}
