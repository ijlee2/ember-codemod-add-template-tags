import { createOptions, findPackagesWithHBS } from './steps/index.js';
import type { CodemodOptions } from './types/index.js';

export function runCodemod(codemodOptions: CodemodOptions): void {
  const options = createOptions(codemodOptions);
  const packages = findPackagesWithHBS(options);

  console.log(`✅ Found ${packages.size} package(s) with hbs`);
  console.log();
}
