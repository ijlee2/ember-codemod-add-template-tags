import toc from '@ember/component/template-only';
import type { Track } from 'docs-app/data/album';

interface TracksSignature {
  Args: {
    tracks?: Track[];
  };
}

const Tracks = toc<TracksSignature>();

export default Tracks;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Tracks: typeof Tracks;
    tracks: typeof Tracks;
  }
}
