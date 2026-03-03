import { getPackageType, readPackageJson } from '@codemod-utils/package-json';

import type {
  DependencyData,
  Options,
  PackageName,
} from '../../../types/index.js';
import {
  analyzeEmberPackage,
  isEntitiesEmpty,
} from '../analyze-dependencies/index.js';

export function task(
  packageRoot: string,
  options: Options,
): [packageName: PackageName, dependencyData: DependencyData] | undefined {
  const packageJson = readPackageJson({ projectRoot: packageRoot });
  const packageName = packageJson['name'];

  if (!packageName) {
    return undefined;
  }

  const packageType = getPackageType(packageJson);

  if (packageType === 'node') {
    return undefined;
  }

  const entities = analyzeEmberPackage({
    componentStructure: options.componentStructure,
    isExternal: false,
    packageName,
    packageRoot,
    packageType,
  });

  if (isEntitiesEmpty(entities)) {
    return undefined;
  }

  const dependencyData = {
    entities,
    packageRoot,
    packageType,
  };

  return [packageName, dependencyData];
}
