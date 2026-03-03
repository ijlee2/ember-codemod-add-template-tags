import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { analyzeComponent } from '../analyze-component.js';

export function task(
  templateFilePath: string,
  classFilePath: string | undefined,
  packageRoot: string,
): string | undefined {
  // Allow template-only components without a backing class
  if (classFilePath === undefined) {
    return templateFilePath;
  }

  const classFile = readFileSync(join(packageRoot, classFilePath), 'utf8');
  const { componentType } = analyzeComponent(classFile);

  if (
    componentType === 'glimmer' ||
    componentType === 'inherited' ||
    componentType === 'template-only'
  ) {
    return templateFilePath;
  }

  return undefined;
}
