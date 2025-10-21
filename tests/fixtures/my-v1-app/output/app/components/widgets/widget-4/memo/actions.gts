import Component from '@glimmer/component';
import type { QueryResults } from 'ember-container-query';

import styles from './actions.css';

interface WidgetsWidget4MemoActionsSignature {
  Args: {
    cqFeatures?: QueryResults<'small' | 'large' | 'short'>;
  };
}

export default class WidgetsWidget4MemoActions extends Component<WidgetsWidget4MemoActionsSignature> {
  styles = styles;


  <template>
  <div
  class={{local
  this.styles
  "actions"
  (if
    (or @cqFeatures.small @cqFeatures.short)
    "minimal-layout"
  )
  }}
  data-test-memo-actions
  >
  <button
  aria-label="Comment"
  class={{this.styles.button}}
  type="button"
  >
  {{svg-jar
    "message-processing-outline"
    class=(local this.styles "icon" "icon-comment")
    desc="A speech bubble"
    role="img"
  }}
  </button>

  <button
  aria-label="Repost"
  class={{this.styles.button}}
  type="button"
  >
  {{svg-jar
    "sync"
    class=(local this.styles "icon" "icon-repost")
    desc="Two circular arrows pointing to each other"
    role="img"
  }}
  </button>

  <button
  aria-label="Like"
  class={{this.styles.button}}
  type="button"
  >
  {{svg-jar
    "heart-outline"
    class=this.styles.icon
    desc="A heart"
    role="img"
  }}
  </button>

  <button
  aria-label="Share"
  class={{this.styles.button}}
  type="button"
  >
  {{svg-jar
    "share-variant-outline"
    class=this.styles.icon
    desc="A circular node that branches out to two circular nodes"
    role="img"
  }}
  </button>
  </div>
  </template>
}
