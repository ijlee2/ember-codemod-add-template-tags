import {
  createOptions,
  findEntities,
  findPackagesWithHBS,
  updateComponents,
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

  const entities = findEntities(options);
  console.log('✅ Found entities');

  updateComponents(packages, entities);
  console.log('✅ Updated components');

  console.log();
}
