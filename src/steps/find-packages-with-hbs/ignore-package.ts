import type { FilesToConvert, Options } from '../../types/index.js';

export function ignorePackage(
  filesWithHBS: FilesToConvert,
  options: Options,
): boolean {
  const { components, routes, tests } = filesWithHBS;

  if (options.convert.components && components.length > 0) {
    return false;
  }

  if (options.convert.routes && routes.length > 0) {
    return false;
  }

  if (options.convert.tests && tests.length > 0) {
    return false;
  }

  return true;
}
