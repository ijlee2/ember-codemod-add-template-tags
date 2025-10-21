import UiPage from 'docs-app/components/ui/page/index';
import WidgetsWidget1 from 'docs-app/components/widgets/widget-1/index';
import WidgetsWidget2 from 'docs-app/components/widgets/widget-2/index';
import WidgetsWidget3 from 'docs-app/components/widgets/widget-3/index';
import WidgetsWidget4 from 'docs-app/components/widgets/widget-4/index';
import WidgetsWidget5 from 'docs-app/components/widgets/widget-5/index';

<template>
{{page-title "Dashboard"}}

<UiPage @title="Dashboard">
  <div class={{@controller.styles.widgets}}>
    <div class={{@controller.styles.widget-1}} data-test-widget="1">
      <WidgetsWidget1 />
    </div>

    <div class={{@controller.styles.widget-2}} data-test-widget="2">
      <WidgetsWidget2 />
    </div>

    <div class={{@controller.styles.widget-3}} data-test-widget="3">
      <WidgetsWidget3 />
    </div>

    <div class={{@controller.styles.widget-4}} data-test-widget="4">
      <WidgetsWidget4 />
    </div>

    <div class={{@controller.styles.widget-5}} data-test-widget="5">
      <WidgetsWidget5 />
    </div>
  </div>
</UiPage>
</template>
