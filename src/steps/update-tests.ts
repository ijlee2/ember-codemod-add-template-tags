import type { AllEntities, Packages } from '../types/index.js';
import { enterStrictMode, moveTestFiles } from './update-tests/index.js';

export function updateTests(packages: Packages, entities: AllEntities): void {
  moveTestFiles(packages);
  enterStrictMode(packages, entities);
}
