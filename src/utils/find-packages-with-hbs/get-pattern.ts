import { join, sep } from 'node:path';

import type { Options, PackageType } from '../../types/index.js';
import { SOURCE_FOR_INTERNAL_PACKAGES } from '../ember.js';

function normalizedJoin(...folders: string[]): string {
  return join(...folders).replaceAll(sep, '/');
}

export function getPatternForComponents(
  packageType: PackageType,
  options: Pick<Options, 'componentStructure' | 'entity'>,
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

export function getPatternForRoutes(
  packageType: PackageType,
  options: Pick<Options, 'entity'>,
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

export function getPatternForTests(options: Pick<Options, 'entity'>): string[] {
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
