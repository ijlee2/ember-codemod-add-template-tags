import { getPackageType, readPackageJson } from '@codemod-utils/package-json';

import type { Options, PackageData, PackageName } from '../../types/index.js';
import { findFilesWithHbs } from './find-files-with-hbs.js';
import { ignorePackage } from './ignore-package.js';

export async function task(
  packageRoot: string,
  options: Options,
): Promise<[packageName: PackageName, packageData: PackageData] | undefined> {
  const packageJson = readPackageJson({ projectRoot: packageRoot });
  const packageName = packageJson['name'];

  if (!packageName) {
    return undefined;
  }

  const packageType = getPackageType(packageJson);

  if (packageType === 'node') {
    return undefined;
  }

  const filesWithHbs = await findFilesWithHbs(
    { packageRoot, packageType },
    options,
  );

  if (ignorePackage(filesWithHbs, options)) {
    return undefined;
  }

  const dependencies = Object.assign(
    {},
    packageJson['dependencies'],
    packageJson['devDependencies'],
  );

  const hasEmberRouteTemplate = Boolean(dependencies['ember-route-template']);

  const packageData = {
    filesWithHbs,
    filesWithTemplateTag: {
      components: [],
      routes: [],
      tests: [],
    },
    hasEmberRouteTemplate,
    packageRoot,
    packageType,
  };

  return [packageName, packageData];
}
