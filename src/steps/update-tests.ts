import type { AllEntities, FilesCached, Packages } from '../types/index.js';
import { enterStrictMode, moveTestFiles } from './update-tests/index.js';

export function updateTests(packages: Packages, entities: AllEntities): void {
  const filesCached: FilesCached = new Map();

  moveTestFiles(packages, filesCached);
  enterStrictMode(packages, entities, filesCached);
}
