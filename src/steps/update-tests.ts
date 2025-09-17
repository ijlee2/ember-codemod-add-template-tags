import type { AllEntities, Packages } from '../types/index.js';
import { enterStrictMode, moveTestFiles } from './update-tests/index.js';

export function updateTests(packages: Packages, entities: AllEntities): void {
  console.time('moveTestFiles');
  moveTestFiles(packages);
  console.timeEnd('moveTestFiles');

  console.time('enterStrictMode');
  enterStrictMode(packages, entities);
  console.timeEnd('enterStrictMode');
}
