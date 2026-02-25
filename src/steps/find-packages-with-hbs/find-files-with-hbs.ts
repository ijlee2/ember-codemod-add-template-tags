import { join, sep } from 'node:path';

import { findFiles } from '@codemod-utils/files';

import type {
  FilesToConvert,
  Options,
  PackageType,
} from '../../types/index.js';
import { SOURCE_FOR_INTERNAL_PACKAGES } from '../../utils/ember.js';
import { filterComponents } from '../../utils/find-packages-with-hbs/index.js';

type Data = {
  packageRoot: string;
  packageType: PackageType;
};

function normalizedJoin(...folders: string[]): string {
  return join(...folders).replaceAll(sep, '/');
}

function getPatternForComponents(
  packageType: PackageType,
  options: Options,
): string[] {
  const source = SOURCE_FOR_INTERNAL_PACKAGES[packageType];
  const { componentStructure, entity } = options;

  if (componentStructure === 'nested') {
    if (entity === undefined) {
      return [`${source}/components/**/index.hbs`];
    }

    return [
      normalizedJoin(source, 'components', entity, 'index.hbs'),
      normalizedJoin(source, 'components', entity, '**/index.hbs'),
    ];
  }

  if (entity === undefined) {
    return [`${source}/components/**/*.hbs`];
  }

  return [
    normalizedJoin(source, 'components', `${entity}.hbs`),
    normalizedJoin(source, 'components', entity, '**/*.hbs'),
  ];
}

function getPatternForRoutes(
  packageType: PackageType,
  options: Options,
): string[] {
  const source = SOURCE_FOR_INTERNAL_PACKAGES[packageType];
  const { entity } = options;

  if (entity === undefined) {
    return [`${source}/templates/**/*.hbs`];
  }

  return [
    normalizedJoin(source, 'templates', `${entity}.hbs`),
    normalizedJoin(source, 'templates', entity, '**/*.hbs'),
  ];
}

function getPatternForTests(options: Options): string[] {
  const { entity } = options;

  if (entity === undefined) {
    return [
      'tests/integration/{components,helpers,modifiers}/**/*-test.{js,ts}',
    ];
  }

  return [
    normalizedJoin(
      'tests/integration/{components,helpers,modifiers}',
      `${entity}-test.{js,ts}`,
    ),
    normalizedJoin(
      'tests/integration/{components,helpers,modifiers}',
      entity,
      '**/*-test.{js,ts}',
    ),
  ];
}

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
