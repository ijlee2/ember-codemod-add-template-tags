import { parallelize } from '@codemod-utils/threads';

import type { AllEntities, Packages } from '../../types/index.js';
import { task } from './enter-strict-mode/task.js';

export async function enterStrictMode(
  packages: Packages,
  entities: AllEntities,
): Promise<void> {
  const datasets: Parameters<typeof task>[] = [];

  for (const [, packageData] of packages) {
    const { filesWithTemplateTag, packageRoot } = packageData;

    filesWithTemplateTag.routes.forEach((filePath) => {
      datasets.push([filePath, packageRoot, entities]);
    });
  }

  await parallelize(task, datasets, {
    importMetaUrl: import.meta.url,
    workerFilePath: './enter-strict-mode/worker.js',
  });
}
