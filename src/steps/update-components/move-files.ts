import { findFiles } from '@codemod-utils/files';
import { parallelize } from '@codemod-utils/threads';

import type { Packages } from '../../types/index.js';
import { SOURCE_FOR_INTERNAL_PACKAGES } from '../../utils/ember.js';
import { task } from './move-files/task.js';

export async function moveFiles(packages: Packages): Promise<void> {
  const datasets: Parameters<typeof task>[] = [];

  for (const [, packageData] of packages) {
    const { filesWithHbs, packageRoot, packageType } = packageData;

    const source = SOURCE_FOR_INTERNAL_PACKAGES[packageType];

    const classFilePaths = findFiles(`${source}/components/**/*.{js,ts}`, {
      ignoreList: ['**/*.d.ts'],
      projectRoot: packageRoot,
    });

    const classFilePathsSet = new Set(classFilePaths);

    filesWithHbs.components.forEach((templateFilePath) => {
      const classFilePathJs = templateFilePath.replace(/\.hbs$/, '.js');
      const classFilePathTs = templateFilePath.replace(/\.hbs$/, '.ts');
      let classFilePath: string | undefined;

      if (classFilePathsSet.has(classFilePathJs)) {
        classFilePath = classFilePathJs;
      } else if (classFilePathsSet.has(classFilePathTs)) {
        classFilePath = classFilePathTs;
      }

      datasets.push([templateFilePath, classFilePath, packageData]);
    });
  }

  await parallelize(task, datasets, {
    importMetaUrl: import.meta.url,
    workerFilePath: './move-files/worker.js',
  });
}
