import { doubleColonize } from '@codemod-utils/ember';

import type { Entities } from '../../../src/types/index.js';
import { entities } from './entities.js';

/**
 * We may use this constant to test code that runs after `find-entities`.
 * The code should not mutate the constant.
 */
const componentsDoubleColonized: Entities = new Map();

for (const [entityName, entity] of entities.components) {
  componentsDoubleColonized.set(doubleColonize(entityName), entity);
}

export { componentsDoubleColonized };
