import type { AllEntities, Dependencies } from '../../types/index.js';
import { ENTITY_TYPES } from '../ember.js';

export function mergeEntities(
  allEntities: AllEntities,
  dependencies: Dependencies,
  isExternal: boolean,
): void {
  ENTITY_TYPES.forEach((entityType) => {
    for (const [packageName, packageData] of dependencies) {
      const entities = allEntities[entityType];

      for (const [entityName, entity] of packageData.entities[entityType]) {
        if (!isExternal && entities.get(entityName)) {
          console.warn(
            `WARNING: Multiple ${entityType} named ${entityName} exist. Import statements in ${packageName} may be incorrect.`,
          );
        }

        entities.set(entityName, entity);
      }
    }
  });
}
