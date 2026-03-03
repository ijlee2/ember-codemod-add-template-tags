import { findFiles } from '@codemod-utils/files';
import { parallelize } from '@codemod-utils/threads';

import type { PackageType } from '../../types/index.js';
import { SOURCE_FOR_INTERNAL_PACKAGES } from '../ember.js';
import { task } from './filter-components/task.js';

export async function filterComponents(
  templateFilePaths: string[],
  {
    packageRoot,
    packageType,
  }: {
    packageRoot: string;
    packageType: PackageType;
  },
): Promise<string[]> {
  const source = SOURCE_FOR_INTERNAL_PACKAGES[packageType];

  const classFilePaths = findFiles(`${source}/components/**/*.{js,ts}`, {
    ignoreList: ['**/*.d.ts'],
    projectRoot: packageRoot,
  });

  const classFilePathsSet = new Set(classFilePaths);

  const datasets: Parameters<typeof task>[] = templateFilePaths.map(
    (templateFilePath) => {
      const classFilePathJs = templateFilePath.replace(/\.hbs$/, '.js');
      const classFilePathTs = templateFilePath.replace(/\.hbs$/, '.ts');
      let classFilePath: string | undefined;

      if (classFilePathsSet.has(classFilePathJs)) {
        classFilePath = classFilePathJs;
      } else if (classFilePathsSet.has(classFilePathTs)) {
        classFilePath = classFilePathTs;
      }

      return [templateFilePath, classFilePath, packageRoot];
    },
  );

  const newTemplateFilePaths = await parallelize(task, datasets, {
    importMetaUrl: import.meta.url,
    workerFilePath: './filter-components/worker.js',
  });

  return newTemplateFilePaths.filter(
    (templateFilePath) => templateFilePath !== undefined,
  );
}
