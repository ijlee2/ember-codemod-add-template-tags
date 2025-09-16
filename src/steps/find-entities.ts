import type {
  AllEntities,
  Dependencies,
  EntityType,
  Options,
} from '../types/index.js';
import { ENTITY_TYPES } from '../utils/ember.js';
import {
  analyzeExternalDependencies,
  analyzeInternalDependencies,
  emberDependencies,
} from '../utils/find-entities/index.js';

function merge(dependencies: Dependencies, allEntities: AllEntities): void {
  for (const [, packageData] of dependencies) {
    for (const [entityType, entities] of Object.entries(packageData.entities)) {
      for (const [entityName, entity] of entities) {
        allEntities[entityType as EntityType].set(entityName, entity);
      }
    }
  }
}

export function findEntities(options: Options): AllEntities {
  const entities: AllEntities = {
    components: new Map(),
    helpers: new Map(),
    modifiers: new Map(),
    services: new Map(),
    utilities: new Map(),
  };

  const externalDependencies = analyzeExternalDependencies(options);
  const internalDependencies = analyzeInternalDependencies(options);

  merge(emberDependencies, entities);
  merge(externalDependencies, entities);
  merge(internalDependencies, entities);

  ENTITY_TYPES.forEach((entityType) => {
    entities[entityType] = new Map(Array.from(entities[entityType]).sort());
  });

  return entities;
}
