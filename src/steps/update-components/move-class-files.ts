import type { Packages } from '../../types/index.js';

export function moveClassFiles(packages: Packages): void {
  for (const [, packageData] of packages) {
    console.log(packageData);
  }
}
