import type { AllEntities, Packages } from '../types/index.js';
import { enterStrictMode, moveFiles } from './update-components/index.js';

export function updateComponents(
  packages: Packages,
  entities: AllEntities,
): void {
  moveFiles(packages);
  enterStrictMode(packages, entities);
}
