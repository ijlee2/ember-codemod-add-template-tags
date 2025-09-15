import type { Packages } from '../../types/index.js';

export function moveTemplateFiles(packages: Packages): void {
  for (const [, packageData] of packages) {
    console.log(packageData);
  }
}
