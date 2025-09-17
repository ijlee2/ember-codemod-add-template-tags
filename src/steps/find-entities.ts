import type { AllEntities, Options } from '../types/index.js';
import {
  analyzeExternalDependencies,
  analyzeInternalDependencies,
  emberDependencies,
  mergeEntities,
  sortEntities,
} from '../utils/find-entities/index.js';

export function findEntities(options: Options): AllEntities {
  const entities: AllEntities = {
    components: new Map(),
    helpers: new Map(),
    modifiers: new Map(),
  };

  console.time('analyzeExternalDependencies');
  const externalDependencies = analyzeExternalDependencies(options);
  console.timeEnd('analyzeExternalDependencies');

  console.time('analyzeInternalDependencies');
  const internalDependencies = analyzeInternalDependencies(options);
  console.timeEnd('analyzeInternalDependencies');

  mergeEntities(entities, emberDependencies);
  mergeEntities(entities, externalDependencies);
  mergeEntities(entities, internalDependencies);
  sortEntities(entities);

  return entities;
}
