import LinkTo from '@ember/routing';

<template>
<nav aria-label={{@name}} data-test-nav={{@name}}>
  <ul class="navigation-menu-list">
    {{#each @menuItems as |menuItem|}}
      <li>
        <LinkTo
          @route={{menuItem.route}}
          class="navigation-menu-link"
          data-test-link={{menuItem.label}}
        >
          {{menuItem.label}}
        </LinkTo>
      </li>
    {{/each}}
  </ul>
</nav>
</template>
