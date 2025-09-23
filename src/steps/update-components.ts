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
  moveClassFiles(packages);
  moveTemplateFiles(packages);
  enterStrictMode(packages, entities);
}
