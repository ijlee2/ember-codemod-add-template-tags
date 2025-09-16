import { getPackageRoots } from '@codemod-utils/files';
import { getPackageType, readPackageJson } from '@codemod-utils/package-json';

import type { Dependencies, Options } from '../../types/index.js';
import { analyzeEmberPackage } from './analyze-ember-package.js';
import { ignoreEmberPackage } from './ignore-ember-package.js';

export function analyzeInternalDependencies(options: Options): Dependencies {
  const packageRoots = getPackageRoots(options);
  const dependencies: Dependencies = new Map();

  packageRoots.forEach((packageRoot) => {
    const packageJson = readPackageJson({ projectRoot: packageRoot });
    const packageName = packageJson['name'];

    if (!packageName || dependencies.has(packageName)) {
      return;
    }

    const packageType = getPackageType(packageJson);

    if (packageType !== 'v1-addon' && packageType !== 'v2-addon') {
      return;
    }

    const entities = analyzeEmberPackage({
      componentStructure: options.componentStructure,
      isExternal: false,
      packageName,
      packageRoot,
      packageType,
    });

    if (ignoreEmberPackage(entities)) {
      return;
    }

    dependencies.set(packageName, {
      entities,
      packageRoot,
      packageType,
    });
  });

  return new Map([...dependencies].sort());
}
