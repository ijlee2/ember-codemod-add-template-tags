import type { TOC } from '@ember/component/template-only';
import { hash } from '@ember/helper';
import { ContainerQuery, height, width } from 'ember-container-query';

import styles from './index.css';
import WidgetsWidget4MemoActions from './actions';
import WidgetsWidget4MemoBody from './body';
import WidgetsWidget4MemoHeader from './header';

interface WidgetsWidget4MemoSignature {}

const WidgetsWidget4MemoComponent: TOC<WidgetsWidget4MemoSignature> =
  <template>
    <ContainerQuery
      @features={{hash
        small=(width max=200)
        large=(width min=200)
        short=(height max=200)
      }}
      @tagName="article"
      class={{styles.container}}
      as |CQ|
    >
      <div class={{styles.header-container}}>
        <WidgetsWidget4MemoHeader
          @cqFeatures={{CQ.features}}
        />
      </div>

      <div class={{styles.body-container}}>
        <WidgetsWidget4MemoBody
          @cqFeatures={{CQ.features}}
        />
      </div>

      <div class={{styles.actions-container}}>
        <WidgetsWidget4MemoActions
          @cqFeatures={{CQ.features}}
        />
      </div>
    </ContainerQuery>
  </template>

export default WidgetsWidget4MemoComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4::Memo': typeof WidgetsWidget4MemoComponent;
  }
}
