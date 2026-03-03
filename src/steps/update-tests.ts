import type { AllEntities, Packages } from '../types/index.js';
import { enterStrictMode, moveFiles } from './update-tests/index.js';

// eslint-disable-next-line @typescript-eslint/require-await
export async function updateTests(
  packages: Packages,
  entities: AllEntities,
): Promise<void> {
  moveFiles(packages);
  enterStrictMode(packages, entities);
}
