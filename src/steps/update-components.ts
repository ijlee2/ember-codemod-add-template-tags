import type { AllEntities, Packages } from '../types/index.js';
import { enterStrictMode, moveFiles } from './update-components/index.js';

// eslint-disable-next-line @typescript-eslint/require-await
export async function updateComponents(
  packages: Packages,
  entities: AllEntities,
): Promise<void> {
  moveFiles(packages);
  enterStrictMode(packages, entities);
}
