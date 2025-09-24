import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  componentStructure: 'nested',
  convert: new Set(['components', 'routes', 'tests']),
  projectRoot: 'tmp/my-v1-app-nested',
};

const options: Options = {
  componentStructure: 'nested',
  convert: {
    components: true,
    routes: true,
    tests: true,
  },
  projectRoot: 'tmp/my-v1-app-nested',
};

export { codemodOptions, options };
