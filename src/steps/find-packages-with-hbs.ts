import { getPackageRoots } from '@codemod-utils/files';
import { getPackageType, readPackageJson } from '@codemod-utils/package-json';

import type { Options, Packages, PackageType } from '../types/index.js';
import {
  findFilesWithHBS,
  ignorePackage,
} from './find-packages-with-hbs/index.js';

const supportedPackageTypes = new Set<PackageType>([
  'v1-addon',
  'v1-app',
  'v2-addon',
  'v2-app',
]);

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

    if (!supportedPackageTypes.has(packageType)) {
      return;
    }

    const filesWithHBS = findFilesWithHBS({ packageRoot, packageType });

    if (ignorePackage(filesWithHBS)) {
      return;
    }

    packages.set(packageName, {
      filesWithHBS,
      filesWithTemplateTag: {
        components: [],
        routes: [],
        tests: [],
      },
      packageRoot,
      packageType: packageType as Exclude<PackageType, 'node'>,
    });
  });

  return new Map([...packages].sort());
}
