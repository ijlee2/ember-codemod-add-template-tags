import type { AllEntities, Packages } from '../types/index.js';
import { enterStrictMode, moveFiles } from './update-routes/index.js';

export async function updateRoutes(
  packages: Packages,
  entities: AllEntities,
): Promise<void> {
  await moveFiles(packages);
  await enterStrictMode(packages, entities);
}
