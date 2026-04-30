import { join } from 'node:path';

import { findFiles, parseFilePath } from '@codemod-utils/files';
import { parallelize } from '@codemod-utils/threads';

import type { Dependencies, Options } from '../../types/index.js';
import { task } from './analyze-external-dependencies/task.js';

function getExternalPackageRoots(options: Options): string[] {
  const { projectRoot } = options;

  const filePaths = findFiles('**/node_modules/**/package.json', {
    projectRoot,
  });

  const packageRoots = filePaths.map((filePath) => {
    const { dir } = parseFilePath(filePath);

    return join(projectRoot, dir);
  });

  return packageRoots;
}

export async function analyzeExternalDependencies(
  options: Options,
): Promise<Dependencies> {
  const packageRoots = getExternalPackageRoots(options);

  const datasets: Parameters<typeof task>[] = [];

  packageRoots.forEach((packageRoot) => {
    datasets.push([packageRoot]);
  });

  const entries = await parallelize(task, datasets, {
    importMetaUrl: import.meta.url,
    workerFilePath: './analyze-external-dependencies/worker.js',
  });

  return new Map(entries.filter((entry) => entry !== undefined).sort());
}
