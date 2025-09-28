#!/usr/bin/env node
'use strict';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { runCodemod } from '../src/index.js';
import type { CodemodOptions } from '../src/types/index.js';

// Provide a title to the process in `ps`
process.title = 'ember-codemod-add-template-tags';

// Set codemod options
const argv = yargs(hideBin(process.argv))
  .option('component-structure', {
    choices: ['flat', 'nested'] as const,
    describe: 'Component structure (how your components are colocated)',
    type: 'string',
  })
  .option('convert', {
    choices: ['components', 'routes', 'tests'] as const,
    describe: 'Which type of files to consider',
    type: 'array',
  })
  .option('folder', {
    describe: 'Which folder to consider',
    type: 'string',
  })
  .option('root', {
    describe: 'Where to run the codemod',
    type: 'string',
  })
  .parseSync();

const DEFAULT_FOR_CONVERT = ['components', 'routes', 'tests'] as const;

const codemodOptions: CodemodOptions = {
  componentStructure: argv['component-structure'] ?? 'flat',
  convert: new Set(argv['convert'] ?? DEFAULT_FOR_CONVERT),
  folder: argv['folder'] ?? '',
  projectRoot: argv['root'] ?? process.cwd(),
};

runCodemod(codemodOptions);
