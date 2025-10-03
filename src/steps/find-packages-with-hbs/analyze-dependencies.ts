import type { PackageJson } from '@codemod-utils/package-json';

export function analyzeDependencies(packageJson: PackageJson): {
  hasEmberRouteTemplate: boolean;
} {
  const dependencies = Object.assign(
    {},
    packageJson['dependencies'],
    packageJson['devDependencies'],
  );

  return {
    hasEmberRouteTemplate: Boolean(dependencies['ember-route-template']),
  };
}
