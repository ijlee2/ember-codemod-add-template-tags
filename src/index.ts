import {
  createOptions,
  findEntities,
  findPackagesWithHBS,
  updateComponents,
  updateRoutes,
  updateTests,
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

  if (options.convert.components) {
    updateComponents(packages, entities);
    console.log('✅ Updated components');
  }

  if (options.convert.routes) {
    updateRoutes(packages, entities);
    console.log('✅ Updated routes');
  }

  if (options.convert.tests) {
    updateTests(packages, entities);
    console.log('✅ Updated tests');
  }

  updateTests(packages, entities);
  console.log('✅ Updated tests');

  console.log();
}
