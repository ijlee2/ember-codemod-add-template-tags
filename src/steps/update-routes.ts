import type { AllEntities, Packages } from '../types/index.js';
import { enterStrictMode, moveFiles } from './update-routes/index.js';

// eslint-disable-next-line @typescript-eslint/require-await
export async function updateRoutes(
  packages: Packages,
  entities: AllEntities,
): Promise<void> {
  moveFiles(packages);
  enterStrictMode(packages, entities);
}
