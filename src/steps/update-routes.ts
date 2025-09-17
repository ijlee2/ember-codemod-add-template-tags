import type { AllEntities, FilesCached, Packages } from '../types/index.js';
import { enterStrictMode, moveTemplateFiles } from './update-routes/index.js';

export function updateRoutes(packages: Packages, entities: AllEntities): void {
  const filesCached: FilesCached = new Map();

  console.time('moveTestFiles');
  moveTemplateFiles(packages, filesCached);
  console.timeEnd('moveTestFiles');

  console.time('enterStrictMode');
  enterStrictMode(packages, entities, filesCached);
  console.timeEnd('enterStrictMode');
}
