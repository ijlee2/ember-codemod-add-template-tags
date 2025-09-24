import type { TOC } from '@ember/component/template-only';
import templateOnlyComponent from '@ember/component/template-only';

import type { Track } from '../../data/album';

interface TracksSignature {
  Args: {
    tracks?: Track[];
  };
}

const TracksComponent = <template></template> satisfies TOC<TracksSignature>;

export default TracksComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Tracks: typeof TracksComponent;
  }
}
