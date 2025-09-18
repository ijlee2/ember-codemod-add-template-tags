import add from 'docs-app/helpers/add';
import dynamicCssGrid from 'docs-app/modifiers/dynamic-css-grid';
import Component from '@glimmer/component';

import type { Track } from '../../data/album';
import styles from './list.css';

interface TracksListSignature {
  Args: {
    numColumns?: number;
    tracks?: Track[];
  };
}

export default class TracksListComponent extends Component<TracksListSignature> {
  styles = styles;

  get numColumns(): number {
    const { numColumns } = this.args;

    return numColumns ?? 1;
  }

  get numRows(): number {
    const { tracks } = this.args;

    if (!tracks) {
      return 0;
    }

    return Math.ceil(tracks.length / this.numColumns);
  }


  <template>
  <ul
  class={{this.styles.list}}
  data-test-list="Tracks"
  data-css-grid="{{this.numRows}} x {{this.numColumns}}"
  {{dynamicCssGrid
  numColumns=this.numColumns
  numRows=this.numRows
  }}
  >
  {{#each @tracks as |track index|}}
  <li class={{this.styles.item}} data-test-item>
    <div>
      {{add index 1}}.
      <span data-test-field="Title">
        {{track.name}}
      </span>
    </div>

    {{#if track.isExplicit}}
      <span aria-label="Explicit" data-test-field="Explicit">
        {{svg-jar
          "alpha-e-box"
          class=this.styles.icon-explicit
          desc="Letter E, which stands for explicit"
          role="img"
        }}
      </span>
    {{/if}}
  </li>
  {{/each}}
  </ul>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Tracks::List': typeof TracksListComponent;
  }
}
