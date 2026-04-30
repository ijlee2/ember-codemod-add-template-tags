import { getPackageRoots } from '@codemod-utils/files';
import { parallelize } from '@codemod-utils/threads';

import type { Dependencies, Options } from '../../types/index.js';
import { task } from './analyze-internal-dependencies/task.js';

export async function analyzeInternalDependencies(
  options: Options,
): Promise<Dependencies> {
  const packageRoots = getPackageRoots(options);

  const datasets: Parameters<typeof task>[] = [];

  packageRoots.forEach((packageRoot) => {
    datasets.push([packageRoot, options]);
  });

  const entries = await parallelize(task, datasets, {
    importMetaUrl: import.meta.url,
    workerFilePath: './analyze-internal-dependencies/worker.js',
  });

  return new Map(entries.filter((entry) => entry !== undefined).sort());
}
