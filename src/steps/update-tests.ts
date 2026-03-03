import type { AllEntities, Packages } from '../types/index.js';
import { enterStrictMode, moveFiles } from './update-tests/index.js';

export async function updateTests(
  packages: Packages,
  entities: AllEntities,
): Promise<void> {
  await moveFiles(packages);
  await enterStrictMode(packages, entities);
}
