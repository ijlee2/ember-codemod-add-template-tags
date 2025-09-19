import { hash } from '@ember/helper';
import UiPage from 'docs-app/components/ui/page';

<template>
{{page-title "Page Not Found"}}

<UiPage @title="404">
  <p>Feeling lost? Un<em>contained</em>?</p>
  <p>Don't worry. We all have our off days.</p>

  <div class={{@controller.styles.animation}}>
    <ContainerQuery
      @features={{hash small=(width max=350)}}
      as |CQ|
    >
      <div
        class={{local
          @controller.styles
          "metaphor"
          (if CQ.features.small "small-layout")
        }}
      >
        <div class={{@controller.styles.mental-block}}>
        </div>

        <div
          aria-hidden="true"
          class={{@controller.styles.the-next-idea}}
        >
          ember-<br />container-<br />query
        </div>
      </div>
    </ContainerQuery>
  </div>
</UiPage>
</template>
