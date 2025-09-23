import type { AllEntities, Packages } from '../types/index.js';
import { enterStrictMode, moveTemplateFiles } from './update-routes/index.js';

export function updateRoutes(packages: Packages, entities: AllEntities): void {
  moveTemplateFiles(packages);
  enterStrictMode(packages, entities);
}
