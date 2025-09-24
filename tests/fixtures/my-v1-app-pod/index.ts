import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('my-v1-app-pod/input');
const outputProject = convertFixtureToJson('my-v1-app-pod/output');

export { inputProject, outputProject };
