import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('my-monorepo/input');
const outputProject = convertFixtureToJson('my-monorepo/output');

export { inputProject, outputProject };
