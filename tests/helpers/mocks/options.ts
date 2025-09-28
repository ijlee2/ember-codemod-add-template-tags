import type { CodemodOptions, Options } from '../../../src/types/index.js';

export const codemodOptions: CodemodOptions = {
  componentStructure: 'flat',
  convert: new Set(['components', 'routes', 'tests']),
  projectRoot: 'tmp/my-monorepo',
};

export const options: Options = {
  componentStructure: 'flat',
  convert: {
    components: true,
    routes: true,
    tests: true,
  },
  projectRoot: 'tmp/my-monorepo',
};
