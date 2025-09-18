import { t } from 'ember-intl';
import { UiPage } from 'my-addon';

<template>
  <UiPage @title={{t "routes.index.title"}}>
    <p>
      {{t "routes.index.description" htmlSafe=true}}
    </p>
  </UiPage>
</template>;
