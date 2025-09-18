import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  componentStructure: 'flat',
  convert: new Set(['components', 'routes', 'tests']),
  projectRoot: 'tmp/my-monorepo',
};

const options: Options = {
  componentStructure: 'flat',
  convert: {
    components: true,
    routes: true,
    tests: true,
  },
  projectRoot: 'tmp/my-monorepo',
};

export { codemodOptions, options };
