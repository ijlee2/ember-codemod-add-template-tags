import { getPackageRoots } from '@codemod-utils/files';
import { getPackageType, readPackageJson } from '@codemod-utils/package-json';

import type { Options, Packages } from '../types/index.js';
import {
  analyzeDependencies,
  findFilesWithHBS,
  ignorePackage,
} from './find-packages-with-hbs/index.js';

export function findPackagesWithHBS(options: Options): Packages {
  const packageRoots = getPackageRoots(options);
  const packages: Packages = new Map();

  packageRoots.forEach((packageRoot) => {
    const packageJson = readPackageJson({ projectRoot: packageRoot });
    const packageName = packageJson['name'];

    if (!packageName) {
      return;
    }

    const packageType = getPackageType(packageJson);

    if (packageType === 'node') {
      return;
    }

    const filesWithHBS = findFilesWithHBS({ packageRoot, packageType });

    if (ignorePackage(filesWithHBS, options)) {
      return;
    }

    const { hasEmberRouteTemplate, isEmberSourceRecent } =
      analyzeDependencies(packageJson);

    packages.set(packageName, {
      filesWithHBS,
      filesWithTemplateTag: {
        components: [],
        routes: [],
        tests: [],
      },
      hasEmberRouteTemplate,
      isEmberSourceRecent,
      packageRoot,
      packageType,
    });
  });

  return new Map([...packages].sort());
}
