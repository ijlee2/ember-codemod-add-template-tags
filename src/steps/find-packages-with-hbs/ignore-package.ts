import type { FilesToConvert, Options } from '../../types/index.js';

export function ignorePackage(
  filesWithHBS: FilesToConvert,
  options: Options,
): boolean {
  const { convert } = options;

  const { components, routes, tests } = filesWithHBS;
  let consider = false;

  if (convert.components && components.length > 0) {
    consider = true;
  }

  if (convert.routes && routes.length > 0) {
    consider = true;
  }

  if (convert.tests && tests.length > 0) {
    consider = true;
  }

  return !consider;
}
