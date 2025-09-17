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

  moveClassFiles(packages, filesCached);
  moveTemplateFiles(packages, filesCached);
  enterStrictMode(packages, entities, filesCached);
}
