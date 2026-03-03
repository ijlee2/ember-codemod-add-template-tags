import type { AllEntities, Packages } from '../types/index.js';
import { enterStrictMode, moveFiles } from './update-components/index.js';

export async function updateComponents(
  packages: Packages,
  entities: AllEntities,
): Promise<void> {
  await moveFiles(packages);
  await enterStrictMode(packages, entities);
}
