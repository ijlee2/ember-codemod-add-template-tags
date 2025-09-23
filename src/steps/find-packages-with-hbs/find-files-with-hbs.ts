import { findFiles } from '@codemod-utils/files';

import type { FilesToConvert, PackageType } from '../../types/index.js';
import { SOURCE_FOR_INTERNAL_PACKAGES } from '../../utils/ember.js';
import { filterComponents } from '../../utils/find-packages-with-hbs/index.js';

export function findFilesWithHBS({
  packageRoot,
  packageType,
}: {
  packageRoot: string;
  packageType: PackageType;
}): FilesToConvert {
  const source = SOURCE_FOR_INTERNAL_PACKAGES[packageType];

  const components = findFiles(`${source}/components/**/*.hbs`, {
    projectRoot: packageRoot,
  });

  const routes = findFiles(`${source}/**/*.hbs`, {
    ignoreList: [`${source}/components/**`],
    projectRoot: packageRoot,
  });

  const tests = findFiles(`tests/integration/**/*-test.{js,ts}`, {
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
