import type { AllEntities, FilesCached, Packages } from '../types/index.js';
import { enterStrictMode, moveTestFiles } from './update-tests/index.js';

export function updateTests(packages: Packages, entities: AllEntities): void {
  const filesCached: FilesCached = new Map();

  console.time('moveTestFiles');
  moveTestFiles(packages, filesCached);
  console.timeEnd('moveTestFiles');

  console.time('enterStrictMode');
  enterStrictMode(packages, entities, filesCached);
  console.timeEnd('enterStrictMode');
}
