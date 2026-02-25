import { findFiles } from '@codemod-utils/files';

import type {
  FilesToConvert,
  Options,
  PackageType,
} from '../../types/index.js';
import {
  filterComponents,
  getPatternForComponents,
  getPatternForRoutes,
  getPatternForTests,
} from '../../utils/find-packages-with-hbs/index.js';

type Data = {
  packageRoot: string;
  packageType: PackageType;
};

export function findFilesWithHBS(data: Data, options: Options): FilesToConvert {
  const { packageRoot, packageType } = data;

  const components = findFiles(getPatternForComponents(packageType, options), {
    projectRoot: packageRoot,
  });

  const routes = findFiles(getPatternForRoutes(packageType, options), {
    projectRoot: packageRoot,
  });

  const tests = findFiles(getPatternForTests(options), {
    ignoreList: ['**/*.d.ts'],
    projectRoot: packageRoot,
  });

  return {
    components: filterComponents(components, {
      packageRoot,
      packageType,
    }),
    routes,
    tests,
  };
}
