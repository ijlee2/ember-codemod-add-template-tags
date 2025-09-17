import type { AllEntities, FilesCached, Packages } from '../types/index.js';
import {
  enterStrictMode,
  moveClassFiles,
  moveTemplateFiles,
} from './update-components/index.js';

export function updateComponents(
  packages: Packages,
  entities: AllEntities,
): void {
  const filesCached: FilesCached = new Map();

  console.time('moveClassFiles');
  moveClassFiles(packages, filesCached);
  console.timeEnd('moveClassFiles');

  console.time('moveTemplateFiles');
  moveTemplateFiles(packages, filesCached);
  console.timeEnd('moveTemplateFiles');

  console.time('enterStrictMode');
  enterStrictMode(packages, entities, filesCached);
  console.timeEnd('enterStrictMode');
}
