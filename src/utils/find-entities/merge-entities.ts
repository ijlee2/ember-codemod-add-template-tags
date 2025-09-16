import type {
  AllEntities,
  Dependencies,
  EntityType,
} from '../../types/index.js';

export function mergeEntities(
  allEntities: AllEntities,
  dependencies: Dependencies,
): void {
  for (const [, packageData] of dependencies) {
    for (const [entityType, entities] of Object.entries(packageData.entities)) {
      for (const [entityName, entity] of entities) {
        allEntities[entityType as EntityType].set(entityName, entity);
      }
    }
  }
}
