import { getPackageRoots } from '@codemod-utils/files';
import { parallelize } from '@codemod-utils/threads';

import type { Options, Packages } from '../types/index.js';
import { task } from './find-packages-with-hbs/task.js';

export async function findPackagesWithHbs(options: Options): Promise<Packages> {
  const packageRoots = getPackageRoots(options);

  const datasets: Parameters<typeof task>[] = [];

  packageRoots.forEach((packageRoot) => {
    datasets.push([packageRoot, options]);
  });

  const entries = await parallelize(task, datasets, {
    importMetaUrl: import.meta.url,
    workerFilePath: './find-packages-with-hbs/worker.js',
  });

  return new Map(
    entries.filter((entry) => entry !== undefined).sort(),
  ) as Packages;
}
