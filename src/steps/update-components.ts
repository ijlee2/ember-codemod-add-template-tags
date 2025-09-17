import type { AllEntities, Packages } from '../types/index.js';
import {
  enterStrictMode,
  moveClassFiles,
  moveTemplateFiles,
} from './update-components/index.js';

export function updateComponents(
  packages: Packages,
  entities: AllEntities,
): void {
  console.time('moveClassFiles');
  moveClassFiles(packages);
  console.timeEnd('moveClassFiles');

  console.time('moveTemplateFiles');
  moveTemplateFiles(packages);
  console.timeEnd('moveTemplateFiles');

  console.time('enterStrictMode');
  enterStrictMode(packages, entities);
  console.timeEnd('enterStrictMode');
}
