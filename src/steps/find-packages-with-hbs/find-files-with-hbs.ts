import { join, sep } from 'node:path';

import { findFiles } from '@codemod-utils/files';

import type { FilesToConvert, PackageType } from '../../types/index.js';
import { SOURCE_FOR_INTERNAL_PACKAGES } from '../../utils/ember.js';
import { filterComponents } from '../../utils/find-packages-with-hbs/index.js';

function normalizedJoin(...folders: string[]): string {
  return join(...folders).replaceAll(sep, '/');
}

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

  const components = findFiles(
    normalizedJoin(source, 'components', folder, '**/*.hbs'),
    {
      projectRoot: packageRoot,
    },
  );

  const routes = findFiles(
    normalizedJoin(source, 'templates', folder, '**/*.hbs'),
    {
      projectRoot: packageRoot,
    },
  );

  const tests = findFiles(
    normalizedJoin(
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
