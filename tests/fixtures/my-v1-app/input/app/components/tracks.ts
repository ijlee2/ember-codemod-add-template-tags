import templateOnlyComponent from '@ember/component/template-only';

import type { Track } from '../data/album';

interface TracksSignature {
  Args: {
    tracks?: Track[];
  };
}

const Tracks = templateOnlyComponent<TracksSignature>();

export default Tracks;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Tracks: typeof Tracks;
  }
}
