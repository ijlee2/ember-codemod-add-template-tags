import type { FilesToConvert } from '../../types/index.js';

export function ignorePackage(filesWithHBS: FilesToConvert): boolean {
  const { components, routes, tests } = filesWithHBS;

  return components.length === 0 && routes.length === 0 && tests.length === 0;
}
