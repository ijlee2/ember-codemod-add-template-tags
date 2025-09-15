import type { Packages } from '../../types/index.js';

export function moveTestFiles(packages: Packages): void {
  for (const [, packageData] of packages) {
    console.log(packageData);
  }
}
