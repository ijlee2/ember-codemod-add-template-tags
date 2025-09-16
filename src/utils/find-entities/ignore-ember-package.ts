import type { AllEntities } from '../../types/index.js';
import { ENTITY_TYPES } from '../ember.js';

export function ignoreEmberPackage(entities: AllEntities): boolean {
  return ENTITY_TYPES.every((entityType) => {
    return entities[entityType].size === 0;
  });
}
