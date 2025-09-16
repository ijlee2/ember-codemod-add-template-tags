import type { AllEntities } from '../../types/index.js';
import { ENTITY_TYPES } from '../ember.js';

export function sortEntities(allEntities: AllEntities): void {
  ENTITY_TYPES.forEach((entityType) => {
    const entities = allEntities[entityType];

    allEntities[entityType] = new Map(Array.from(entities).sort());
  });
}
