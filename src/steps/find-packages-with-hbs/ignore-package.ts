import type { FilesToConvert, Options } from '../../types/index.js';

export function ignorePackage(
  filesWithHBS: FilesToConvert,
  options: Options,
): boolean {
  const { components, routes, tests } = filesWithHBS;
  let consider = false;

  if (options.convert.components && components.length > 0) {
    consider = true;
  }

  if (options.convert.routes && routes.length > 0) {
    consider = true;
  }

  if (options.convert.tests && tests.length > 0) {
    consider = true;
  }

  return !consider;
}
