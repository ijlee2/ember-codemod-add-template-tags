import { parallelize } from '@codemod-utils/threads';

import type { Packages } from '../../types/index.js';
import { task } from './move-files/task.js';

export async function moveFiles(packages: Packages): Promise<void> {
  const datasets: Parameters<typeof task>[] = [];

  for (const [, packageData] of packages) {
    const { filesWithHbs } = packageData;

    filesWithHbs.routes.forEach((templateFilePath) => {
      const classFilePath = templateFilePath.replace(/\.hbs$/, '.gjs');

      datasets.push([templateFilePath, classFilePath, packageData]);
    });
  }

  await parallelize(task, datasets, {
    importMetaUrl: import.meta.url,
    workerFilePath: './move-files/worker.js',
  });
}
