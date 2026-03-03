import type { AllEntities, Options } from '../types/index.js';
import {
  analyzeExternalDependencies,
  analyzeInternalDependencies,
  emberDependencies,
  mergeEntities,
  sortEntities,
} from '../utils/find-entities/index.js';

// eslint-disable-next-line @typescript-eslint/require-await
export async function findEntities(options: Options): Promise<AllEntities> {
  const entities: AllEntities = {
    components: new Map(),
    helpers: new Map(),
    modifiers: new Map(),
  };

  const externalDependencies = analyzeExternalDependencies(options);
  const internalDependencies = analyzeInternalDependencies(options);

  mergeEntities(entities, emberDependencies, true);
  mergeEntities(entities, externalDependencies, true);
  mergeEntities(entities, internalDependencies, false);
  sortEntities(entities);

  return entities;
}
