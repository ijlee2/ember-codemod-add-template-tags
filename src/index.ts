import {
  createOptions,
  findEntities,
  findPackagesWithHBS,
} from './steps/index.js';
import type { CodemodOptions } from './types/index.js';

export function runCodemod(codemodOptions: CodemodOptions): void {
  const options = createOptions(codemodOptions);
  const packages = findPackagesWithHBS(options);

  if (packages.size === 0) {
    console.log('✅ Found no packages with hbs');
    console.log();

    return;
  }

  console.log(`✅ Found ${packages.size} package(s) with hbs`);

  const entities = findEntities();
  console.log('✅ Found entities');

  console.log(entities);
}
