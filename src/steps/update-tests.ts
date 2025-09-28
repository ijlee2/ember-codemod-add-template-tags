import type { AllEntities, Packages } from '../types/index.js';
import { enterStrictMode, moveFiles } from './update-tests/index.js';

export function updateTests(packages: Packages, entities: AllEntities): void {
  moveFiles(packages);
  enterStrictMode(packages, entities);
}
