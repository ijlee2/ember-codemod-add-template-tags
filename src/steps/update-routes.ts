import type { AllEntities, Packages } from '../types/index.js';
import { enterStrictMode, moveFiles } from './update-routes/index.js';

export function updateRoutes(packages: Packages, entities: AllEntities): void {
  moveFiles(packages);
  enterStrictMode(packages, entities);
}
