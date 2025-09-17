import type { AllEntities, Packages } from '../types/index.js';
import { enterStrictMode, moveTemplateFiles } from './update-routes/index.js';

export function updateRoutes(packages: Packages, entities: AllEntities): void {
  console.time('moveTestFiles');
  moveTemplateFiles(packages);
  console.timeEnd('moveTestFiles');

  console.time('enterStrictMode');
  enterStrictMode(packages, entities);
  console.timeEnd('enterStrictMode');
}
