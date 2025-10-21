import { hash } from '@ember/helper';
import WidgetsWidget4MemoActions from 'docs-app/components/widgets/widget-4/memo/actions/index';
import WidgetsWidget4MemoBody from 'docs-app/components/widgets/widget-4/memo/body/index';
import WidgetsWidget4MemoHeader from 'docs-app/components/widgets/widget-4/memo/header/index';

import type { TOC } from '@ember/component/template-only';

const WidgetsWidget4Memo = <template>
<ContainerQuery
  @features={{hash
    small=(width max=200)
    large=(width min=200)
    short=(height max=200)
  }}
  @tagName="article"
  class="widgets-widget-4-memo-container"
  as |CQ|
>
  <div class="widgets-widget-4-memo-header-container">
    <WidgetsWidget4MemoHeader
      @cqFeatures={{CQ.features}}
    />
  </div>

  <div class="widgets-widget-4-memo-body-container">
    <WidgetsWidget4MemoBody
      @cqFeatures={{CQ.features}}
    />
  </div>

  <div class="widgets-widget-4-memo-actions-container">
    <WidgetsWidget4MemoActions
      @cqFeatures={{CQ.features}}
    />
  </div>
</ContainerQuery>
</template>;

export default WidgetsWidget4Memo;
