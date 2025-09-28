import { join } from 'node:path';

import { findFiles } from '@codemod-utils/files';

import type { FilesToConvert, PackageType } from '../../types/index.js';
import { SOURCE_FOR_INTERNAL_PACKAGES } from '../../utils/ember.js';
import { filterComponents } from '../../utils/find-packages-with-hbs/index.js';

export function findFilesWithHBS({
  folder,
  packageRoot,
  packageType,
}: {
  folder: string;
  packageRoot: string;
  packageType: PackageType;
}): FilesToConvert {
  const source = SOURCE_FOR_INTERNAL_PACKAGES[packageType];

  const components = findFiles(join(source, 'components', folder, '**/*.hbs'), {
    projectRoot: packageRoot,
  });

  const routes = findFiles(join(source, 'templates', folder, '**/*.hbs'), {
    projectRoot: packageRoot,
  });

  const tests = findFiles(
    join(
      'tests/integration/{components,helpers,modifiers}',
      folder,
      '**/*-test.{js,ts}',
    ),
    {
      ignoreList: ['**/*.d.ts'],
      projectRoot: packageRoot,
    },
  );

  return {
    components: filterComponents(components, {
      packageRoot,
      packageType,
    }),
    routes,
    tests,
  };
}
