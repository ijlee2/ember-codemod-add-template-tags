import type { CodemodOptions, Options } from '../types/index.js';

export function createOptions(codemodOptions: CodemodOptions): Options {
  const { componentStructure, projectRoot } = codemodOptions;

  return {
    componentStructure,
    projectRoot,
  };
}
