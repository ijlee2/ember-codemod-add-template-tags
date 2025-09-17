import type { AllEntities, Dependencies } from '../../types/index.js';
import { ENTITY_TYPES } from '../ember.js';

export function mergeEntities(
  allEntities: AllEntities,
  dependencies: Dependencies,
): void {
  ENTITY_TYPES.forEach((entityType) => {
    for (const [, packageData] of dependencies) {
      const entities = allEntities[entityType];

      for (const [entityName, entity] of packageData.entities[entityType]) {
        entities.set(entityName, entity);
      }
    }
  });
}
