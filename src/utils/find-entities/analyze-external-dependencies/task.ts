import { getPackageType, readPackageJson } from '@codemod-utils/package-json';

import type { DependencyData, PackageName } from '../../../types/index.js';
import {
  analyzeEmberPackage,
  isEntitiesEmpty,
} from '../analyze-dependencies/index.js';

export function task(
  packageRoot: string,
): [packageName: PackageName, dependencyData: DependencyData] | undefined {
  try {
    const packageJson = readPackageJson({ projectRoot: packageRoot });
    const packageName = packageJson['name'];

    if (!packageName) {
      return undefined;
    }

    const packageType = getPackageType(packageJson);

    if (packageType !== 'v1-addon' && packageType !== 'v2-addon') {
      return undefined;
    }

    const entities = analyzeEmberPackage({
      componentStructure: 'flat' as const,
      isExternal: true,
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
  } catch (error) {
    console.warn(
      `Could not read package.json in ${packageRoot}. (${(error as Error).message})`,
    );

    return undefined;
  }
}
