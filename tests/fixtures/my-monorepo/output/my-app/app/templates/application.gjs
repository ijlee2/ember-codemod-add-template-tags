import { array, hash } from '@ember/helper';
import NavigationMenu from 'my-addon/components/navigation-menu';

<template>
{{page-title (t "routes.application.app-name")}}

<div class={{@controller.styles.application}}>
  <header class={{@controller.styles.header}}>
    <NavigationNarrator
      @navigationText={{t "routes.application.navigation-text"}}
      @skipText={{t "routes.application.skip-text"}}
      @skipTo="#main-content"
    />

    <NavigationMenu
      @menuItems={{array
        (hash
          label=(t
            "routes.application.navigation-menu.routes.index"
          )
          route="index"
        )
        (hash
          label=(t
            "routes.application.navigation-menu.routes.form"
          )
          route="form"
        )
        (hash
          label=(t
            "routes.application.navigation-menu.routes.products"
          )
          route="products"
        )
      }}
      @name={{t "routes.application.navigation-menu.name"}}
    />
  </header>

  <main class={{@controller.styles.main}}>
    <div class={{@controller.styles.center}}>
      {{outlet}}
    </div>
  </main>

  <footer class={{@controller.styles.footer}}>
    <span class={{@controller.styles.copyright}}>
      {{t "routes.application.copyright" htmlSafe=true}}
    </span>
  </footer>
</div>
</template>
