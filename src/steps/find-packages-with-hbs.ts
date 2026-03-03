import { getPackageRoots } from '@codemod-utils/files';
import { getPackageType, readPackageJson } from '@codemod-utils/package-json';

import type { Options, Packages } from '../types/index.js';
import {
  findFilesWithHbs,
  ignorePackage,
} from './find-packages-with-hbs/index.js';

export function findPackagesWithHbs(options: Options): Packages {
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

    const filesWithHbs = findFilesWithHbs(
      { packageRoot, packageType },
      options,
    );

    if (ignorePackage(filesWithHbs, options)) {
      return;
    }

    const dependencies = Object.assign(
      {},
      packageJson['dependencies'],
      packageJson['devDependencies'],
    );

    const hasEmberRouteTemplate = Boolean(dependencies['ember-route-template']);

    packages.set(packageName, {
      filesWithHbs,
      filesWithTemplateTag: {
        components: [],
        routes: [],
        tests: [],
      },
      hasEmberRouteTemplate,
      packageRoot,
      packageType,
    });
  });

  return new Map([...packages].sort());
}
