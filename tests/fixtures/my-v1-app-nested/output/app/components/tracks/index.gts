import { hash } from '@ember/helper';
import TracksList from 'docs-app/components/tracks/list/index';
import TracksTable from 'docs-app/components/tracks/table/index';

import type { TOC } from '@ember/component/template-only';
import type { Track } from 'docs-app/data/album';

interface TracksSignature {
  Args: {
    tracks?: Track[];
  };
}

const Tracks = <template>
<ContainerQuery
  @features={{hash
    small=(width max=480)
    medium=(width min=480 max=640)
    large=(width min=640)
    tall=(height min=320)
  }}
  as |CQ|
>
  {{#if (and CQ.features.large CQ.features.tall)}}
    <TracksTable @tracks={{@tracks}} />
  {{else}}
    <TracksList
      @numColumns={{if
        CQ.features.small
        1
        (if CQ.features.medium 2 3)
      }}
      @tracks={{@tracks}}
    />
  {{/if}}
</ContainerQuery>
</template> satisfies TOC<TracksSignature>;

export default Tracks;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Tracks: typeof Tracks;
    tracks: typeof Tracks;
  }
}
