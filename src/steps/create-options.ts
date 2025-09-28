import type { CodemodOptions, Options } from '../types/index.js';

export function createOptions(codemodOptions: CodemodOptions): Options {
  const { componentStructure, convert, folder, projectRoot } = codemodOptions;

  return {
    componentStructure,
    convert: {
      components: convert.has('components'),
      routes: convert.has('routes'),
      tests: convert.has('tests'),
    },
    folder,
    projectRoot,
  };
}
