import { doubleColonize } from '@codemod-utils/ember';

import type { AllEntities, Entities, Packages } from '../../types/index.js';

export function enterStrictMode(
  packages: Packages,
  entities: AllEntities,
): void {
  const componentsDoubleColonized: Entities = new Map();

  for (const [entityName, entity] of entities.components) {
    componentsDoubleColonized.set(doubleColonize(entityName), entity);
  }

  console.log(componentsDoubleColonized);

  for (const [, packageData] of packages) {
    console.log(packageData);
  }
}
