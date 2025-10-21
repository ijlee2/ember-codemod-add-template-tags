import WidgetsWidget4Memo from 'docs-app/components/widgets/widget-4/memo/index';

const WidgetsWidget4 = <template>
<section class="widgets-widget-4-container">
  <header class="widgets-widget-4-header">
    <h2>Widget 4</h2>
  </header>

  <div class="widgets-widget-4-memo-highlight">
    <WidgetsWidget4Memo />
  </div>

  <div class="widgets-widget-4-actions">
    <a data-test-link="All memos" href="#">
      All memos
    </a>
  </div>
</section>
</template>;

export default WidgetsWidget4;
