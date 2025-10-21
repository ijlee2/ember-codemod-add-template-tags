import templateOnlyComponent from '@ember/component/template-only';

const WidgetsWidget4Memo = templateOnlyComponent();

export default WidgetsWidget4Memo;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4::Memo': typeof WidgetsWidget4Memo;
    'widgets/widget-4/memo': typeof WidgetsWidget4Memo;
  }
}
