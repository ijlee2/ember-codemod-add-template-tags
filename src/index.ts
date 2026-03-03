import {
  createOptions,
  findEntities,
  findPackagesWithHbs,
  updateComponents,
  updateRoutes,
  updateTests,
} from './steps/index.js';
import type { CodemodOptions } from './types/index.js';

export async function runCodemod(
  codemodOptions: CodemodOptions,
): Promise<void> {
  const options = createOptions(codemodOptions);
  const packages = await findPackagesWithHbs(options);

  if (packages.size === 0) {
    console.log('✅ Found no packages with hbs');
    console.log();

    return;
  }

  console.log(`✅ Found ${packages.size} package(s) with hbs`);

  const entities = await findEntities(options);
  console.log('✅ Found entities');

  if (options.convert.components) {
    await updateComponents(packages, entities);
    console.log('✅ Updated components');
  }

  if (options.convert.routes) {
    await updateRoutes(packages, entities);
    console.log('✅ Updated routes');
  }

  if (options.convert.tests) {
    await updateTests(packages, entities);
    console.log('✅ Updated tests');
  }

  console.log();
}
